import type { NextConfig } from 'next';


const nextConfig: NextConfig = {
	reactStrictMode: true,
	pageExtensions: ['ts', 'tsx'],
	transpilePackages: ['next-mdx-remote'],
	reactCompiler: true,
	// Required for GitHub Pages static export
	output: 'export',
	trailingSlash: true,
	// Set basePath to repo name when deploying to GH Pages
	// e.g. https://rajesh-nagarajan-11.github.io/Portfolio
	basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
};

export default nextConfig;
