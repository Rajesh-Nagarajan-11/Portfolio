import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	pageExtensions: ['ts', 'tsx'],
	output: 'export',
	trailingSlash: true,
	basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
};

export default nextConfig;
