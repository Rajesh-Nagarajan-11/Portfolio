'use client';

import SplashCursor from '../splash-cursor';
import ThreeLines from '../three-lines';

export default function Hero() {
	return (
		<main className='relative min-h-svh w-screen overflow-hidden bg-black text-white'>
			<SplashCursor
				containerClassName='min-h-svh w-screen'
				className='w-full h-screen'
				usePrimaryColors={true}
			>
				<div className='absolute left-0 top-0 w-full lg:w-1/2 h-full z-10 flex items-center justify-center lg:justify-start lg:pl-16'>
					<div className='w-[380px] h-[380px] sm:w-[520px] sm:h-[520px] lg:w-[600px] lg:h-[600px] max-w-[95vw] max-h-[95vh]'>
						<ThreeLines />
					</div>
				</div>
			</SplashCursor>
		</main>
	);
}
