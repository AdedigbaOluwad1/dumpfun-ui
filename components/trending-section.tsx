'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function TrendingSection() {
	const trendingTokens = [
		{
			name: 'Vine Coin',
			symbol: 'VINE',
			marketCap: '$69.6M',
			replies: 2664,
			image: '/placeholder.svg?height=60&width=60&text=VINE',
			description: 'Elon Announces Vine Revival With AI Twist',
		},
		{
			name: 'Trencher Broadcasting Company',
			symbol: 'TBC',
			marketCap: '$1M',
			replies: 172,
			image: '/placeholder.svg?height=60&width=60&text=TBC',
			description: 'TBC Surges in Popularity After Major Mentions on X',
		},
		{
			name: 'Gorbagana',
			symbol: 'GOB',
			marketCap: '$22.7M',
			replies: 2282,
			image: '/placeholder.svg?height=60&width=60&text=GOB',
			description:
				'Gorbagana Rallies As CTO Fees Pledged to Public-Benefit Corporation',
		},
		{
			name: 'Bog',
			symbol: 'Bog',
			marketCap: '$842.9K',
			replies: 293,
			image: '/placeholder.svg?height=60&width=60&text=BOG',
			description: "Classic Crypto Meme 'Bogdanoff' Makes Waves",
		},
	];

	return (
		<div className='mb-8'>
			<div className='flex items-center justify-between mb-6'>
				<h2 className='text-2xl font-bold text-white'>Now trending</h2>
				<div className='flex space-x-2'>
					<Button
						size='sm'
						variant='outline'
						className='border-gray-600 text-gray-400 hover:bg-gray-800 bg-transparent'
					>
						<ChevronLeft className='w-4 h-4' />
					</Button>
					<Button
						size='sm'
						variant='outline'
						className='border-gray-600 text-gray-400 hover:bg-gray-800 bg-transparent'
					>
						<ChevronRight className='w-4 h-4' />
					</Button>
				</div>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
				{trendingTokens.map((token, index) => (
					<Card
						key={index}
						className='bg-gray-800/50 py-0 border-gray-700 hover:bg-gray-800/70 transition-all cursor-pointer group'
					>
						<CardContent className='p-4 px-5'>
							<div className='flex items-start space-x-3 mb-3'>
								<Image
									src={'/tipzy.png'}
									alt={token.name}
									width={48}
									height={48}
									className='rounded-lg'
								/>
								<div className='flex-1 min-w-0'>
									<h3 className='font-semibold text-white truncate'>
										{token.name}
									</h3>
									<p className='text-sm text-gray-400'>
										({token.symbol})
									</p>
									<div className='flex items-center space-x-2 mt-1'>
										<Badge
											variant='secondary'
											className='bg-green-500/20 text-green-400 text-xs'
										>
											{token.marketCap}
										</Badge>
										<span className='text-xs text-gray-500'>
											{token.replies} replies
										</span>
									</div>
								</div>
							</div>
							<p className='text-sm text-gray-300 line-clamp-2'>
								{token.description}
							</p>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
