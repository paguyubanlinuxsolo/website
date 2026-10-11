import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE, url } from '../consts';

export async function GET(context) {
  const posts = (await getCollection('posts', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: new URL(url('/'), context.site).toString(),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: url(`/${post.data.slug}/`),
      categories: [...post.data.categories, ...post.data.tags],
      author: post.data.author,
    })),
  });
}
