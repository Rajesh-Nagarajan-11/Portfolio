'use client';

import { useState, useEffect } from 'react';
import { cormorant } from 'app/fonts';
import SplashCursor from '../splash-cursor';
import ThreeLines from '../three-lines';

const translations = [
	{ greeting: "Hello, I&apos;m", first: "Rajesh", last: "Nagarajan", lang: "en" },
	{ greeting: "नमस्ते, मैं हूँ", first: "राजेश", last: "नागराजन", lang: "hi" }, // Hindi
	{ greeting: "Bonjour, je suis", first: "Rajesh", last: "Nagarajan", lang: "fr" }, // French
	{ greeting: "こんにちは、私は", first: "ラジェシュ", last: "ナガラジャン", lang: "ja" }, // Japanese
	{ greeting: "Hola, soy", first: "Rajesh", last: "Nagarajan", lang: "es" }, // Spanish
	{ greeting: "안녕하세요, 저는", first: "라제슈", last: "나가라잔", lang: "ko" }, // Korean
	{ greeting: "Salve, sono", first: "Rajesh", last: "Nagarajan", lang: "it" }, // Italian
	{ greeting: "你好，我是", first: "拉杰什", last: "纳加拉扬", lang: "zh" }, // Chinese
	{ greeting: "Hallo, ich bin", first: "Rajesh", last: "Nagarajan", lang: "de" }, // German
	{ greeting: "Olá, sou", first: "Rajesh", last: "Nagarajan", lang: "pt" }, // Portuguese
	{ greeting: "Hallo, ik ben", first: "Rajesh", last: "Nagarajan", lang: "nl" }, // Dutch
	{ greeting: "Hej, jag är", first: "Rajesh", last: "Nagarajan", lang: "sv" }, // Swedish
	{ greeting: "Merhaba, ben", first: "Rajesh", last: "Nagarajan", lang: "tr" }, // Turkish
	{ greeting: "مرحباً، أنا", first: "راجيش", last: "ناجاراجان", lang: "ar" }, // Arabic
	{ greeting: "Xin chào, tôi là", first: "Rajesh", last: "Nagarajan", lang: "vi" }, // Vietnamese
	{ greeting: "Привет, я", first: "Раджеш", last: "Нагараджан", lang: "ru" }, // Russian
	{ greeting: "Cześć, jestem", first: "Rajesh", last: "Nagarajan", lang: "pl" }, // Polish
	{ greeting: "Γεια σας, είμαι ο", first: "Rajesh", last: "Nagarajan", lang: "el" }, // Greek
	{ greeting: "Ahoj, já jsem", first: "Rajesh", last: "Nagarajan", lang: "cs" }, // Czech
	{ greeting: "Halo, saya", first: "Rajesh", last: "Nagarajan", lang: "id" }, // Indonesian
	{ greeting: "Bună, eu sunt", first: "Rajesh", last: "Nagarajan", lang: "ro" }, // Romanian
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
		<main className='relative min-h-svh w-screen overflow-hidden bg-black text-white'>
			<SplashCursor
				containerClassName='min-h-svh w-screen'
				className='w-full h-screen'
				usePrimaryColors={true}
			>
				{/* Cube animation — left half */}
				<div className='absolute left-0 top-0 w-full lg:w-1/2 h-full z-10 flex items-center justify-center'>
					<div className='w-[420px] h-[420px] sm:w-[560px] sm:h-[560px] lg:w-[72vh] lg:h-[72vh] max-w-[92vw] max-h-[80vh]'>
						<ThreeLines />
					</div>
				</div>

				{/* Name text — right half */}
				<div className='absolute right-0 top-0 hidden lg:flex w-1/2 h-full z-10 flex-col items-center justify-center pr-12'>
					{/* Fixed height container to prevent layout shifting during language cycling */}
					<div className='h-[420px] flex items-center justify-center'>
						<div
							key={currentIndex}
							className={`animate-apple-reveal text-center select-none ${fontClass}`}
						>
							<p
								className='text-3xl font-light text-white/50 mb-3 uppercase'
								style={{
									fontStyle: isLatin ? 'italic' : 'normal',
									letterSpacing: '0.38em',
								}}
								dangerouslySetInnerHTML={{ __html: currentTranslation.greeting }}
							/>
							<h1
								className='text-[6rem] lg:text-[7.5rem] xl:text-[9rem] font-semibold leading-none text-white'
								style={{
									letterSpacing: '-0.03em',
									paddingBottom: '0.18em',
								}}
							>
								{currentTranslation.first}
							</h1>
							<h1
								className='text-[6rem] lg:text-[7.5rem] xl:text-[9rem] font-light leading-none text-white/75'
								style={{
									letterSpacing: '0.05em',
									paddingBottom: '0.18em',
								}}
							>
								{currentTranslation.last}
							</h1>
						</div>
					</div>

					{/* Decorative line — grows in width, delay 0.8s */}
					<div
						className='mt-6 h-px bg-white/25 mx-auto'
						style={{
							animation: 'lineGrow 1s cubic-bezier(0.22,1,0.36,1) 0.8s both',
						}}
					/>

					{/* "Software Engineer" — slide up, delay 1.0s */}
					<div style={{ overflow: 'hidden' }} className='mt-4'>
						<p
							className='text-base sm:text-lg font-light tracking-[0.4em] text-white/50 uppercase font-sans'
							style={{
								animation: 'slideUp 1s cubic-bezier(0.22,1,0.36,1) 1s both',
							}}
						>
							Software Engineer
						</p>
					</div>
				</div>
			</SplashCursor>

			<style>{`
				@keyframes slideUp {
					from {
						opacity: 0;
						transform: translateY(60px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes appleRevealOnce {
					0% {
						opacity: 0;
						filter: blur(12px);
						transform: translateY(20px);
					}
					12% {
						opacity: 1;
						filter: blur(0);
						transform: translateY(0);
					}
					88% {
						opacity: 1;
						filter: blur(0);
						transform: translateY(0);
					}
					100% {
						opacity: 0;
						filter: blur(12px);
						transform: translateY(-20px);
					}
				}

				.animate-apple-reveal {
					animation: appleRevealOnce 2.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
				}

				@keyframes lineGrow {
					from {
						width: 0px;
						opacity: 0;
					}
					to {
						width: 96px;
						opacity: 1;
					}
				}
			`}</style>
		</main>
	);
}
