import { getCollection } from "astro:content";
import { prefixedLocales } from "./i18n";

function splitContentId(id) {
  const [collection, ...slugParts] = id.split("/");
  return { collection, slug: slugParts.join("/") };
}

function contentPath(entry) {
  const { collection, slug } = splitContentId(entry.id);
  if (!collection || !slug || collection === "blog") return null;
  return { collection, slug };
}

export async function getContentPaths() {
  const entries = await getCollection(
    "siteContent",
    ({ data }) => data.draft !== true,
  );
  return entries.flatMap((entry) => {
    const path = contentPath(entry);
    return path
      ? [{ params: path, props: { entry, collection: path.collection } }]
      : [];
  });
}

export async function getLocalizedContentPaths() {
  const paths = await getContentPaths();
  return prefixedLocales().flatMap((locale) =>
    paths.map((path) => ({
      params: { locale, ...path.params },
      props: { ...path.props, locale },
    })),
  );
}

export async function getContentCollectionPaths() {
  const entries = await getCollection(
    "siteContent",
    ({ data }) => data.draft !== true,
  );
  const collections = new Map();
  for (const entry of entries) {
    const path = contentPath(entry);
    if (!path) continue;
    const current = collections.get(path.collection) ?? [];
    current.push(entry);
    collections.set(path.collection, current);
  }
  return [...collections.entries()].map(([collection, entries]) => ({
    params: { collection },
    props: { collection, entries },
  }));
}

export async function getLocalizedContentCollectionPaths() {
  const paths = await getContentCollectionPaths();
  return prefixedLocales().flatMap((locale) =>
    paths.map((path) => ({
      params: { locale, ...path.params },
      props: { ...path.props, locale },
    })),
  );
}
