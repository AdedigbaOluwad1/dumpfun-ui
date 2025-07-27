'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export function Header() {
	const activities = [
		{
			user: '727qPs',
			action: 'bought',
			amount: '0.5467 SOL',
			token: 'DEVLIN',
			value: '$179K',
			avatar: '/placeholder.svg?height=24&width=24&text=7',
		},
		{
			user: '9b6TD7',
			action: 'created',
			token: 'CACA',
			avatar: '/placeholder.svg?height=24&width=24&text=9',
		},
	];

	return (
		<div className='bg-gray-900 sticky top-0 border-b border-gray-800 h-full flex items-center px-6'>
			<div className='flex items-center justify-between w-full'>
				<div className='flex items-center space-x-4 flex-1'>
					{activities.map((activity, index) => (
						<div
							key={index}
							className='flex items-center space-x-2 bg-gray-800 rounded-full px-4 py-2'
						>
							<Avatar className='w-6 h-6'>
								<AvatarImage
									src={activity.avatar || '/placeholder.svg'}
								/>
								<AvatarFallback className='text-xs'>
									{activity.user[0]}
								</AvatarFallback>
							</Avatar>
							<span className='text-sm text-gray-300'>
								<span className='text-green-400 font-medium'>
									{activity.user}
								</span>
								{` ${activity.action} `}
								{activity.amount && (
									<span className='text-yellow-400'>
										{activity.amount}
									</span>
								)}

								{activity.amount && ' of '}

								<span className='text-blue-400 font-medium'>
									{activity.token}
								</span>

								{activity.value && (
									<>
										<Badge
											variant='secondary'
											className='ml-1 bg-green-500/20 text-green-400'
										>
											{activity.value}
										</Badge>
									</>
								)}
							</span>
						</div>
					))}
				</div>

				<div className='flex items-center space-x-4'>
					<div className='relative'>
						<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
						<Input
							placeholder='Search...'
							className='pl-10 w-70 bg-gray-800 shadow-none! rounded-lg outline-0! border-gray-700 h-9 text-white placeholder:text-gray-400'
						/>
					</div>
					<Link href={'/create'}>
						<Button className='w-fit bg-gradient-to-r rounded-lg px-7 h-9 from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold'>
							Create Coin
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
