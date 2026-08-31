import { getCollection } from 'astro:content';
import { prefixedLocales } from './i18n';

function splitContentId(id: string) {
  const [collection, ...slugParts] = id.split('/');
  return { collection, slug: slugParts.join('/') };
}

export async function getContentPaths() {
  const entries = await getCollection('siteContent', ({ data }) => data.draft !== true);
  return entries.flatMap((entry) => {
    const { collection, slug } = splitContentId(entry.id);
    if (!collection || !slug || collection === 'blog') return [];
    return [{ params: { collection, slug }, props: { entry, collection } }];
  });
}

export async function getLocalizedContentPaths() {
  const paths = await getContentPaths();
  return prefixedLocales().flatMap((locale) => paths.map((path) => ({
    params: { locale, ...path.params },
    props: { ...path.props, locale },
  })));
}

export async function getContentCollectionPaths() {
  const entries = await getCollection('siteContent', ({ data }) => data.draft !== true);
  const collections = new Map<string, typeof entries>();
  for (const entry of entries) {
    const { collection, slug } = splitContentId(entry.id);
    if (!collection || !slug || collection === 'blog') continue;
    collections.set(collection, [...(collections.get(collection) ?? []), entry]);
  }
  return [...collections.entries()].map(([collection, collectionEntries]) => ({
    params: { collection },
    props: { collection, entries: collectionEntries },
  }));
}

export async function getLocalizedContentCollectionPaths() {
  const paths = await getContentCollectionPaths();
  return prefixedLocales().flatMap((locale) => paths.map((path) => ({
    params: { locale, ...path.params },
    props: { ...path.props, locale },
  })));
}
