'use client';

import { useState, useEffect } from 'react';
import { cormorant } from '@/app/fonts';
import ThreeLines from '../three-lines';

const translations = [
	{ greeting: "Hello, I&apos;m", first: 'Rajesh', last: 'Nagarajan', lang: 'en' },
	{ greeting: 'नमस्ते, मैं हूँ', first: 'राजेश', last: 'नागराजन', lang: 'hi' },
	{ greeting: 'Bonjour, je suis', first: 'Rajesh', last: 'Nagarajan', lang: 'fr' },
	{ greeting: 'こんにちは、私は', first: 'ラジェシュ', last: 'ナガラジャン', lang: 'ja' },
	{ greeting: 'Hola, soy', first: 'Rajesh', last: 'Nagarajan', lang: 'es' },
	{ greeting: '안녕하세요, 저는', first: '라제슈', last: '나가라잔', lang: 'ko' },
	{ greeting: 'Salve, sono', first: 'Rajesh', last: 'Nagarajan', lang: 'it' },
	{ greeting: '你好，我是', first: '拉杰什', last: '纳加拉扬', lang: 'zh' },
	{ greeting: 'Hallo, ich bin', first: 'Rajesh', last: 'Nagarajan', lang: 'de' },
	{ greeting: 'Olá, sou', first: 'Rajesh', last: 'Nagarajan', lang: 'pt' },
	{ greeting: 'Hallo, ik ben', first: 'Rajesh', last: 'Nagarajan', lang: 'nl' },
	{ greeting: 'Hej, jag är', first: 'Rajesh', last: 'Nagarajan', lang: 'sv' },
	{ greeting: 'Merhaba, ben', first: 'Rajesh', last: 'Nagarajan', lang: 'tr' },
	{ greeting: 'مرحباً، أنا', first: 'راجيش', last: 'ناجاراجان', lang: 'ar' },
	{ greeting: 'Xin chào, tôi là', first: 'Rajesh', last: 'Nagarajan', lang: 'vi' },
	{ greeting: 'Cześć, jestem', first: 'Rajesh', last: 'Nagarajan', lang: 'pl' },
	{ greeting: 'Γεια σας, είμαι ο', first: 'Rajesh', last: 'Nagarajan', lang: 'el' },
	{ greeting: 'Ahoj, já jsem', first: 'Rajesh', last: 'Nagarajan', lang: 'cs' },
	{ greeting: 'Halo, saya', first: 'Rajesh', last: 'Nagarajan', lang: 'id' },
	{ greeting: 'Bună, eu sunt', first: 'Rajesh', last: 'Nagarajan', lang: 'ro' },
	{ greeting: 'Привіт, я', first: 'Rajesh', last: 'Nagarajan', lang: 'uk' },
	{ greeting: 'สวัสดี ฉันคือ', first: 'Rajesh', last: 'Nagarajan', lang: 'th' },
];

export default function Hero() {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % translations.length);
		}, 2000);
		return () => clearInterval(interval);
	}, []);

	const currentTranslation = translations[currentIndex];
	const isLatin = ['en', 'fr', 'es', 'it', 'de', 'pt', 'nl', 'sv', 'tr', 'vi', 'pl', 'cs', 'id', 'ro'].includes(currentTranslation.lang);
	const fontClass = isLatin ? cormorant.className : 'font-sans';

	return (
		<main className='relative min-h-svh w-full overflow-x-hidden bg-black text-white'>
			<div className='relative z-10 flex min-h-svh flex-col lg:hidden'>
				<div data-skip-splash-cursor className='flex w-full items-center justify-center px-4 pt-16 sm:pt-20'>
					<div className='h-[min(90vw,490px)] w-[min(90vw,490px)] max-h-[96vh] max-w-[98vw] sm:h-[min(92vw,635px)] sm:w-[min(92vw,635px)]'>
						<ThreeLines />
					</div>
				</div>

				<div className='flex w-full flex-col items-center justify-center px-6 pb-16 pt-10 text-center'>
					<div className='flex h-[320px] items-center justify-center sm:h-[360px]'>
						<div key={currentIndex} className={`animate-apple-reveal max-w-[92vw] select-none ${fontClass}`}>
							<p
								className='mb-3 text-xl font-light uppercase text-white/50 sm:text-2xl'
								style={{
									fontStyle: isLatin ? 'italic' : 'normal',
									letterSpacing: '0.24em',
								}}
								dangerouslySetInnerHTML={{ __html: currentTranslation.greeting }}
							/>
							<h1
								className='text-[clamp(3.25rem,12vw,9rem)] font-semibold leading-none text-white'
								style={{
									letterSpacing: '-0.03em',
									paddingBottom: '0.18em',
								}}
							>
								{currentTranslation.first}
							</h1>
							<h1
								className='text-[clamp(3.25rem,12vw,9rem)] font-light leading-none text-white/75'
								style={{
									letterSpacing: '0.05em',
									paddingBottom: '0.18em',
								}}
							>
								{currentTranslation.last}
							</h1>
						</div>
					</div>

					<div className='mx-auto mt-6 h-px w-24 bg-white/25' style={{ animation: 'lineGrow 1s cubic-bezier(0.22,1,0.36,1) 0.8s both' }} />

					<div className='mt-4' style={{ overflow: 'hidden' }}>
						<p
							className='text-sm font-light uppercase tracking-[0.28em] text-white/50 sm:text-base'
							style={{ animation: 'slideUp 1s cubic-bezier(0.22,1,0.36,1) 1s both' }}
						>
							Software Engineer
						</p>
					</div>
				</div>
			</div>

			<div className='relative z-10 hidden min-h-svh lg:flex'>
				<div data-skip-splash-cursor className='absolute left-0 top-0 flex h-full w-1/2 items-center justify-center'>
					<div className='h-[84vh] w-[84vh] max-h-[96vh] max-w-[98vw]'>
						<ThreeLines />
					</div>
				</div>

				<div className='absolute right-0 top-0 flex h-full w-1/2 flex-col items-center justify-center pr-12'>
					<div className='flex h-[420px] items-center justify-center'>
						<div key={currentIndex} className={`animate-apple-reveal select-none text-center ${fontClass}`}>
							<p
								className='mb-3 text-3xl font-light uppercase text-white/50'
								style={{
									fontStyle: isLatin ? 'italic' : 'normal',
									letterSpacing: '0.38em',
								}}
								dangerouslySetInnerHTML={{ __html: currentTranslation.greeting }}
							/>
							<h1
								className='text-[6rem] font-semibold leading-none text-white lg:text-[7.5rem] xl:text-[9rem]'
								style={{
									letterSpacing: '-0.03em',
									paddingBottom: '0.18em',
								}}
							>
								{currentTranslation.first}
							</h1>
							<h1
								className='text-[6rem] font-light leading-none text-white/75 lg:text-[7.5rem] xl:text-[9rem]'
								style={{
									letterSpacing: '0.05em',
									paddingBottom: '0.18em',
								}}
							>
								{currentTranslation.last}
							</h1>
						</div>
					</div>

					<div className='mx-auto mt-6 h-px bg-white/25' style={{ animation: 'lineGrow 1s cubic-bezier(0.22,1,0.36,1) 0.8s both' }} />

					<div className='mt-4' style={{ overflow: 'hidden' }}>
						<p
							className='text-base font-light uppercase tracking-[0.4em] text-white/50 sm:text-lg'
							style={{ animation: 'slideUp 1s cubic-bezier(0.22,1,0.36,1) 1s both' }}
						>
							Software Engineer
						</p>
					</div>
				</div>
			</div>

			<style>{`
				@keyframes slideUp {
					from { opacity: 0; transform: translateY(60px); }
					to { opacity: 1; transform: translateY(0); }
				}

				@keyframes appleRevealOnce {
					0% { opacity: 0; filter: blur(12px); transform: translateY(20px); }
					12% { opacity: 1; filter: blur(0); transform: translateY(0); }
					88% { opacity: 1; filter: blur(0); transform: translateY(0); }
					100% { opacity: 0; filter: blur(12px); transform: translateY(-20px); }
				}

				.animate-apple-reveal {
					animation: appleRevealOnce 2.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
				}

				@keyframes lineGrow {
					from { width: 0px; opacity: 0; }
					to { width: 96px; opacity: 1; }
				}
			`}</style>
		</main>
	);
}
