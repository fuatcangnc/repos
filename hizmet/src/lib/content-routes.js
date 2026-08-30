import { getCollection } from 'astro:content';
import { prefixedLocales } from './i18n';

function splitContentId(id) {
	const [collection, ...slugParts] = id.split('/');
	return { collection, slug: slugParts.join('/') };
}

/**
 * Builds routes for every non-blog Markdown entry under src/content.
 * The first directory is the public collection segment and the rest is the
 * entry slug, so projelerimiz/detay-sayfasi.md becomes
 * /projelerimiz/detay-sayfasi.
 */
export async function getContentPaths() {
	const entries = await getCollection('siteContent', ({ data }) => data.draft !== true);

	return entries.flatMap((entry) => {
		const { collection, slug } = splitContentId(entry.id);
		if (!collection || !slug || collection === 'blog') return [];

		return [{
			params: { collection, slug },
			props: { entry, collection },
		}];
	});
}

export async function getLocalizedContentPaths() {
	const paths = await getContentPaths();
	return prefixedLocales().flatMap((locale) => paths.map((path) => ({
		params: { locale, ...path.params },
		props: { ...path.props, locale },
	})));
}
