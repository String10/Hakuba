import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import addClasses from 'rehype-add-classes';
import remarkMath from 'remark-math';
import remarkGithub from 'remark-github';
import remarkFootnotes from 'remark-footnotes';
import rehypeKatexSvelte from 'rehype-katex-svelte';

import dotenv from 'dotenv';
dotenv.config();

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors

	preprocess: [
		preprocess({
			preserve: ['ld+json'],
			postcss: true
		}),
		mdsvex({
			extensions: ['.md'],
			highlight: {
				alias: { vue: 'html' }
			},
			remarkPlugins: [
				remarkMath,
				[remarkGithub, { repository: `${process.env.GITHUB_USER}/${process.env.REPOSITORY}` }],
				remarkFootnotes
			],
			rehypePlugins: [
				rehypeKatexSvelte,
				rehypeSlug,
				rehypeAutolinkHeadings,
				[rehypeExternalLinks, { target: '_blank' }],
				[addClasses, { 'h1,h2,h3,h4,h5,h6': 'group' }]
			],
			layout: 'src/routes/__layout-md.svelte'
		})
	],

	kit: {
		adapter: adapter({ fallback: '404.html' }),
		prerender: {
			default: true
		},
		trailingSlash: 'always',
		inlineStyleThreshold: 1024 * 32
	}
};

export default config;
