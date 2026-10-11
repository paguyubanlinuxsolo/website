#!/usr/bin/env python3
"""Scrape linuxsolo.or.id via WP REST API. Resumable: skips files that exist.

Usage: python3 scrape/scripts/scrape.py
Output: scrape/raw/*.json, scrape/raw/media/, scrape/manifest.json
"""
import json
import time
import urllib.request
import urllib.parse
from pathlib import Path

BASE = "https://linuxsolo.or.id"
API = f"{BASE}/wp-json/wp/v2"
UA = "LinuxSoloMigrationBot/1.0 (andreasabipermana@paynesia.id; site owner migration)"
RAW = Path(__file__).resolve().parents[1] / "raw"
MEDIA = RAW / "media"
DELAY = 1.0

failures = []


def get(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def fetch_all(endpoint: str, params: str = "") -> list:
    """Paginate through a WP collection endpoint."""
    out, page = [], 1
    while True:
        url = f"{API}/{endpoint}?per_page=100&page={page}&{params}"
        time.sleep(DELAY)
        try:
            batch = json.loads(get(url))
        except urllib.error.HTTPError as e:
            if e.code == 400:  # past last page
                break
            failures.append(url)
            print(f"  FAIL {url}: {e}")
            break
        if not batch:
            break
        out.extend(batch)
        if len(batch) < 100:
            break
        page += 1
    return out


def save_json(name: str, data) -> None:
    p = RAW / name
    p.write_text(json.dumps(data, ensure_ascii=False, indent=1))
    print(f"  wrote {p.name} ({len(data) if isinstance(data, list) else '-'} items)")


def local_media_path(source_url: str) -> Path:
    # keep wp-content/uploads/YYYY/MM/file.ext structure under media/
    rel = urllib.parse.urlparse(source_url).path.split("/wp-content/uploads/", 1)[-1]
    return MEDIA / rel


def main() -> None:
    RAW.mkdir(parents=True, exist_ok=True)
    MEDIA.mkdir(parents=True, exist_ok=True)

    collections = {
        "posts.json": ("posts", "_embed=1"),
        "pages.json": ("pages", "_embed=1"),
        "categories.json": ("categories", ""),
        "tags.json": ("tags", ""),
        "users.json": ("users", ""),
        "media.json": ("media", ""),
    }
    data = {}
    for fname, (ep, params) in collections.items():
        p = RAW / fname
        if p.exists():
            data[fname] = json.loads(p.read_text())
            print(f"skip {fname} (exists, {len(data[fname])} items)")
            continue
        print(f"fetching {ep} ...")
        data[fname] = fetch_all(ep, params)
        save_json(fname, data[fname])

    # site metadata
    site_p = RAW / "site.json"
    if not site_p.exists():
        time.sleep(DELAY)
        root = json.loads(get(f"{BASE}/wp-json/"))
        site = {
            "name": root.get("name"),
            "description": root.get("description"),
            "url": root.get("url"),
            "timezone": root.get("timezone_string"),
        }
        site_p.write_text(json.dumps(site, ensure_ascii=False, indent=1))
        print("  wrote site.json")

    # download all original media files
    manifest = {}
    manifest_p = RAW.parent / "manifest.json"
    if manifest_p.exists():
        manifest = json.loads(manifest_p.read_text())
    ok = fail = skipped = 0
    for m in data["media.json"]:
        src = m["source_url"]
        dest = local_media_path(src)
        manifest[src] = str(dest.relative_to(RAW.parent.parent))
        if dest.exists() and dest.stat().st_size > 0:
            skipped += 1
            continue
        dest.parent.mkdir(parents=True, exist_ok=True)
        time.sleep(DELAY)
        try:
            dest.write_bytes(get(src))
            ok += 1
            print(f"  media {dest.name}")
        except Exception as e:
            failures.append(src)
            fail += 1
            print(f"  FAIL {src}: {e}")
    manifest_p.write_text(json.dumps(manifest, ensure_ascii=False, indent=1))

    print("\n=== SUMMARY ===")
    for fname in collections:
        print(f"{fname}: {len(data[fname])}")
    print(f"media downloaded: {ok}, skipped(existing): {skipped}, failed: {fail}")
    if failures:
        print("FAILED URLS:")
        for u in failures:
            print(" ", u)


if __name__ == "__main__":
    main()
