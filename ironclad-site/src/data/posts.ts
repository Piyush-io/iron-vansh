// Blog posts live in src/content/blog/. Astro warns on every request that reads an empty collection,
// so check for files first and only ask for the collection once there is something in it.
import { getCollection } from 'astro:content';

const files = import.meta.glob('../content/blog/**/*.{md,mdx}');
export const hasPosts = Object.keys(files).length > 0;
export const getPosts = async () => (hasPosts ? getCollection('blog') : []);
