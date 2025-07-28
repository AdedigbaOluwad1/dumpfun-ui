'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageCircle, Heart, ExternalLink, Clock, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function TokenFeed() {
	const tokens = [
		{
			id: '1',
			name: 'Keir Sucks',
			symbol: 'KeirSass',
			creator: 'Mediocre',
			createdAt: '28s ago',
			marketCap: '$5.5K',
			replies: 0,
			image: '/placeholder.svg?height=80&width=80&text=KS',
			description:
				'Fuck Keir Starmer. Bring awareness to his destructiveness in UK and kick him out.',
		},
		{
			id: '2',
			name: 'Pump Vibes Coin',
			symbol: 'SPVC',
			creator: '7xYWk8',
			createdAt: '1m ago',
			marketCap: '$5.8K',
			replies: 0,
			image: '/placeholder.svg?height=80&width=80&text=PV',
			description:
				'Signal $PUMP Vibes coin, The party vibes and PUMPFEST token on the Solana blockchain. All in want green candle to do is pump memes and spread good vibes.',
		},
		{
			id: '3',
			name: 'URPENIS',
			symbol: 'URPENIS',
			creator: 'EwTHM3',
			createdAt: '3m ago',
			marketCap: '$5.4K',
			replies: 0,
			image: '/placeholder.svg?height=80&width=80&text=UP',
			description: 'URANUS FOR URPENIS',
		},
		{
			id: '4',
			name: 'aspirin',
			symbol: 'aspirin',
			creator: 'F4QgvC',
			createdAt: '5m ago',
			marketCap: '$5.3K',
			replies: 0,
			image: '/placeholder.svg?height=80&width=80&text=ASP',
			description: 'get the right treatment! $aspirin',
		},
		{
			id: '5',
			name: 'Escobar Coin',
			symbol: 'SPLATA',
			creator: '4ndrgE',
			createdAt: '5m ago',
			marketCap: '$5.4K',
			replies: 0,
			image: '/placeholder.svg?height=80&width=80&text=ESC',
			description:
				"Once a 'Kingpin' in the banana republic of Memelandia, SPLATA founder 'El Patrón' lost his entire fortune betting on Dogecoin shorts in 2021. Now he's back — legally this time (we swear) — to conquer DeFi with a new motto: 'Plata o Hodl!' TOKENOMICS (100% LEGIT & RIDICULOUS): Supply: 1 Escobillion tokens (69% burned in a 'pool party incident') Tax: 0% rug pulls, 10% funds Narwhal Conservation (to atone for past sins 🐋) Utility: Stake to earn 'Snow Globe' NFTs (it's just glitter, folks 😂) WHY APE? 🔥 'This coin's so hot, even the DEA can't track it!' — CryptoInsider 🔥 'Better ROI than burying cash in walls!' — WallStreetApes 🔥 Actual roadmap: Buy an island → Turn it into a memecoin resort 🏝️ BUT NOW: Raydiium | Orca | BananaSwap #PlataOPlomo #EscobarCoin #NarcoNoMore",
		},
		{
			id: '6',
			name: 'Place your bets',
			symbol: 'Beta',
			creator: 'BbxPS5',
			createdAt: '6m ago',
			marketCap: '$5.2K',
			replies: 0,
			image: '/placeholder.svg?height=80&width=80&text=BET',
			description: 'Place your bets (Beta):',
		},
	];

	return (
		<div className='grid sm:grid-cols-[repeat(auto-fill,minmax(350px,1fr))] xl:grid-cols-3 overflow-hidden gap-6'>
			{tokens.map((token) => (
				<Card
					key={token.id}
					className='bg-gray-800/30 w-full py-0! rounded-2xl md:rounded-3xl border-gray-700 hover:bg-gray-800/50 transition-all group'
				>
					<CardContent className='p-4 md:p-5'>
						<div className='flex items-start justify-between mb-4'>
							<div className='flex items-center space-x-3'>
								<Image
									src={'/tipzy.png'}
									alt={token.name}
									width={60}
									height={60}
									className='rounded-xl max-sm:size-13'
								/>
								<div>
									<h3 className='font-semibold text-white text-base md:text-lg'>
										{token.name}
									</h3>
									<p className='text-gray-400 text-xs md:text-sm'>
										({token.symbol})
									</p>
								</div>
							</div>
							<Link href={`/coin/${token.id}`}>
								<Button
									size='sm'
									variant='ghost'
									className='opacity-0 group-hover:opacity-100 transition-opacity'
								>
									<ExternalLink className='w-4 h-4' />
								</Button>
							</Link>
						</div>

						<div className='flex items-center space-x-2 mb-3'>
							<span className='text-xs md:text-sm text-gray-400'>
								created by
							</span>
							<Avatar className='w-5 h-5'>
								<AvatarFallback className='text-xs bg-gray-700'>
									{token.creator[0]}
								</AvatarFallback>
							</Avatar>
							<span className='text-xs md:text-sm text-green-400 font-medium'>
								{token.creator}
							</span>
							<div className='flex items-center space-x-1 text-gray-500'>
								<Clock className='w-3 h-3' />
								<span className='text-xs'>{token.createdAt}</span>
							</div>
						</div>

						<div className='flex items-center space-x-4 mb-4'>
							<Badge className='bg-green-500/20 text-green-400 border-green-500/30'>
								market cap: {token.marketCap}
							</Badge>
							<span className='text-xs text-gray-500'>
								replies: {token.replies}
							</span>
						</div>

						<p className='text-gray-300 text-xs md:text-sm leading-relaxed mb-4 line-clamp-4'>
							{token.description}
						</p>

						<div className='flex items-center justify-between pt-3 border-t border-gray-700'>
							<div className='flex items-center space-x-4'>
								<button className='flex items-center space-x-1 text-gray-400 hover:text-pink-400 transition-colors'>
									<Heart className='w-4 h-4' />
									<span className='text-sm'>0</span>
								</button>
								<button className='flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors'>
									<MessageCircle className='w-4 h-4' />
									<span className='text-sm'>{token.replies}</span>
								</button>
							</div>
							<Button
								size='sm'
								className='bg-green-600 text-xs md:text-sm hover:bg-green-700 text-white'
							>
								<Zap className='size-3.5 md:size-4' />
								Trade
							</Button>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
