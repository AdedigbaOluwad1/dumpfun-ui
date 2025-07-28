'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	TrendingUp,
	TrendingDown,
	FlameIcon as Fire,
	ChevronLeft,
	ChevronRight,
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { useRef } from 'react';
import 'swiper/css';

export function TrendingTokens() {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const swiperRef = useRef<any | null>(null);

	const trendingTokens = [
		{
			name: 'DOGE2.0',
			symbol: 'DOGE2',
			price: '$0.0045',
			change: '+156.7%',
			positive: true,
			marketCap: '$2.4M',
			image: '/placeholder.svg?height=40&width=40&text=DOGE2',
		},
		{
			name: 'PepeCoin',
			symbol: 'PEPE',
			price: '$0.0012',
			change: '+89.3%',
			positive: true,
			marketCap: '$1.8M',
			image: '/placeholder.svg?height=40&width=40&text=PEPE',
		},
		{
			name: 'MoonShiba',
			symbol: 'MSHIB',
			price: '$0.0089',
			change: '+67.2%',
			positive: true,
			marketCap: '$3.1M',
			image: '/placeholder.svg?height=40&width=40&text=MSHIB',
		},
		{
			name: 'MoonShiba',
			symbol: 'MSHIB',
			price: '$0.0089',
			change: '+67.2%',
			positive: true,
			marketCap: '$3.1M',
			image: '/placeholder.svg?height=40&width=40&text=MSHIB',
		},
		{
			name: 'MoonShiba',
			symbol: 'MSHIB',
			price: '$0.0089',
			change: '+67.2%',
			positive: true,
			marketCap: '$3.1M',
			image: '/placeholder.svg?height=40&width=40&text=MSHIB',
		},
		{
			name: 'MoonShiba',
			symbol: 'MSHIB',
			price: '$0.0089',
			change: '+67.2%',
			positive: true,
			marketCap: '$3.1M',
			image: '/placeholder.svg?height=40&width=40&text=MSHIB',
		},
	];

	return (
		<section className='pb-12'>
			<div className='w-full mx-auto'>
				<div className='flex items-center justify-between mb-4 md:mb-8'>
					<h2 className='text-xl md:text-2xl lg:text-3xl font-bold text-white flex items-center'>
						<Fire className='size-6 md:size-8 text-orange-500 mr-2 md:mr-3' />
						Trending Now
					</h2>

					<div className='flex space-x-2'>
						<Button
							size='sm'
							variant='outline'
							onClick={() => swiperRef.current?.slidePrev()}
							className='border-gray-600 text-gray-400 hover:bg-gray-800 bg-transparent'
						>
							<ChevronLeft className='w-4 h-4' />
						</Button>
						<Button
							size='sm'
							variant='outline'
							onClick={() => swiperRef.current?.slideNext()}
							className='border-gray-600 text-gray-400 hover:bg-gray-800 bg-transparent'
						>
							<ChevronRight className='w-4 h-4' />
						</Button>
					</div>
				</div>

				<Swiper
					onSwiper={(swiper) => (swiperRef.current = swiper)}
					slidesPerView={'auto'}
					modules={[Navigation, Autoplay]}
					freeMode={true}
					slidesPerGroup={1}
					allowTouchMove={true}
					simulateTouch={true}
					touchRatio={1}
					threshold={5}
					speed={500}
					autoplay={{
						delay: 5000,
						disableOnInteraction: false,
					}}
					className='flex gap-4 swiper-wrapper md:gap-6'
				>
					{trendingTokens.map((token, index) => (
						<SwiperSlide
							key={index}
							className='!w-auto mr-4! md:mr-6!'
						>
							<Card className='bg-gray-800/50 swiper-slide min-w-[80vw] sm:min-w-[320px] xl:min-w-[340px] gap-0 max-md:py-4 rounded-xl md:rounded-2xl border-gray-700 backdrop-blur hover:bg-gray-800/70 transition-all cursor-pointer group'>
								<CardHeader className='pb-3'>
									<div className='flex items-center justify-between'>
										<div className='flex items-center space-x-3'>
											<Image
												src={'/tipzy.png'}
												alt={token.name}
												width={40}
												height={40}
												className='rounded-full'
											/>
											<div>
												<CardTitle className='text-white text-sm md:text-lg'>
													{token.name}
												</CardTitle>
												<p className='text-gray-400 text-xs md:text-sm'>
													{token.symbol}
												</p>
											</div>
										</div>
										{token.positive ? (
											<TrendingUp className='h-5 w-5 text-green-400' />
										) : (
											<TrendingDown className='h-5 w-5 text-red-400' />
										)}
									</div>
								</CardHeader>
								<CardContent>
									<div className='flex items-center justify-between mb-2'>
										<span className='text-xl md:text-2xl font-bold text-white'>
											{token.price}
										</span>
										<span
											className={`font-medium text-sm md:text-base ${
												token.positive ? 'text-green-400' : 'text-red-400'
											}`}
										>
											{token.change}
										</span>
									</div>
									<div className='text-xs md:text-sm text-gray-400'>
										Market Cap: {token.marketCap}
									</div>
								</CardContent>
							</Card>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
}
