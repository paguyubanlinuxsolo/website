// OAuth proxy Decap CMS <-> GitHub, berjalan di Cloudflare Workers.
// Decap membuka popup ke /auth, GitHub balik ke /callback, token dikirim
// ke jendela admin lewat postMessage (handshake standar Decap).
export default {
  async fetch(req, env) {
    const url = new URL(req.url);

    if (url.pathname === '/auth') {
      const redirect = new URL('https://github.com/login/oauth/authorize');
      redirect.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
      redirect.searchParams.set('redirect_uri', `${url.origin}/callback`);
      redirect.searchParams.set('scope', 'repo,user');
      redirect.searchParams.set('state', crypto.randomUUID());
      return Response.redirect(redirect.toString(), 302);
    }

    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      const r = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          'user-agent': 'linuxsolo-decap-oauth',
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });
      const data = await r.json();
      const payload = data.error
        ? `authorization:github:error:${JSON.stringify(data)}`
        : `authorization:github:success:${JSON.stringify({ token: data.access_token, provider: 'github' })}`;

      const html = `<!doctype html><html><body><p>Menyelesaikan login…</p><script>
  (function () {
    // balas HANYA ack handshake dari Decap; abaikan pesan lain (mis. dari ekstensi browser)
    window.addEventListener('message', function (e) {
      if (e.data !== 'authorizing:github') return;
      window.opener.postMessage(${JSON.stringify(payload)}, e.origin);
      window.close();
    });
    window.opener.postMessage('authorizing:github', '*');
  })();
</script></body></html>`;
      return new Response(html, { headers: { 'content-type': 'text/html;charset=utf-8' } });
    }

    return new Response('Decap OAuth proxy Paguyuban Linux Solo. Endpoint: /auth, /callback');
  },
};
