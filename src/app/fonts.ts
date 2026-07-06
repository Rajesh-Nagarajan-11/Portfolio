import { Cormorant_Garamond, Merriweather, Mukta, Libre_Baskerville, JetBrains_Mono } from 'next/font/google';

export const mukta = Mukta({
	weight: ['200', '300', '400', '500', '600', '700'],
	variable: '--font-mukta',
	subsets: ['latin'],
	display: 'swap',
	preload: true,
});

export const merryWeather = Merriweather({
	weight: ['300', '400', '700', '900'],
	variable: '--font-merriweather',
	subsets: ['latin'],
	display: 'swap',
	preload: true,
});

export const cormorant = Cormorant_Garamond({
	weight: ['300', '400', '500', '600', '700'],
	style: ['normal', 'italic'],
	variable: '--font-cormorant',
	subsets: ['latin'],
	display: 'swap',
	preload: true,
});

export const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  variable: '--font-libre-baskerville',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const jetbrains = JetBrains_Mono({
	weight: ['400', '700'],
	variable: '--font-jetbrains',
	subsets: ['latin'],
	display: 'swap',
	preload: true,
});
