'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Copy } from 'lucide-react';
import Image from 'next/image';

export function TokenInfo() {
	return (
		<Card className='bg-gray-800/50 pb-0 pt-2 rounded-2xl border-gray-700 mb-6'>
			<CardContent className='p-6'>
				<div className='text-center mb-6'>
					<div className='relative inline-block mb-4'>
						<Image
							src='/tipzy.png'
							alt='KRYPTONIT'
							width={100}
							height={100}
							className='rounded-2xl mx-auto'
						/>
					</div>

					<h1 className='text-2xl font-bold text-white mb-2'>
						KRYPTONIT
					</h1>
					<p className='text-gray-400 mb-2'>KRYPT</p>

					<div className='flex items-center justify-center space-x-2 mb-4'>
						<Avatar className='w-5 h-5'>
							<AvatarFallback className='text-xs bg-gray-700'>
								8
							</AvatarFallback>
						</Avatar>
						<span className='text-sm text-green-400'>86vECv</span>
						<span className='text-xs text-gray-500'>40s ago</span>
						<Badge className='bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs'>
							1.0% bonded
						</Badge>
					</div>

					<p className='text-gray-300 text-sm'>© BruG_dump</p>
				</div>

				{/* Market Cap */}
				<div className='mb-6'>
					<div className='flex items-center justify-between mb-2'>
						<span className='text-gray-400 text-sm'>
							Market Cap
						</span>
						<span className='text-orange-400 text-sm font-medium'>
							ATH $5.3K
						</span>
					</div>
					<div className='text-3xl font-bold text-white mb-2'>
						$5.3K
					</div>
					<div className='text-green-400 text-sm'>
						+$33 (+0.63%) 24hr
					</div>

					<div className='mt-4'>
						<div className='flex justify-between text-xs text-gray-400 mb-1'>
							<span>Bonding Curve Progress</span>
							<span>1.0%</span>
						</div>
						<div className='w-full bg-gray-700 rounded-full h-2'>
							<div
								className='bg-orange-500 h-2 rounded-full'
								style={{ width: '1%' }}
							></div>
						</div>
						<div className='text-xs text-gray-400 mt-1'>
							0.117 SOL in bonding curve • $77,534 to graduate
						</div>
					</div>
				</div>

				<div className='border-t border-gray-700 pt-4'>
					<div className='flex items-center justify-between'>
						<div className='flex flex-col gap-1'>
							<span className='text-xs text-gray-400'>
								Contract
							</span>
							<code className='text-xs text-gray-300 font-mono break-all'>
								BruG_dump...xyz123
							</code>
						</div>
						<Button
							variant='ghost'
							size='sm'
							className='p-1'
						>
							<Copy className='w-3 h-3' />
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
