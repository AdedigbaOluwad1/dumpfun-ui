'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Rocket, UserRound } from 'lucide-react';
import Link from 'next/link';
import { LoginModal } from '@/components/common';
import { useState } from 'react';

export function Header() {
	const [isModalOpen, setIsModalOpen] = useState(false);
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
				<div className='flex items-center space-x-4 w-fit'>
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
					<Link href={'/create'}>
						<Button className='w-fit bg-gradient-to-r rounded-lg px-7 h-9 from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold'>
							<Rocket className='size-4' />
							Create Coin
						</Button>
					</Link>

					<Button
						onClick={() => setIsModalOpen(true)}
						className='w-fit bg-transparent rounded-lg px-7 h-9 hover:bg-transparent  text-green-600 border border-green-600 font-semibold'
					>
						<UserRound className='size-4' />
						Login
					</Button>
				</div>
			</div>

			<LoginModal
				onOpenChange={setIsModalOpen}
				open={isModalOpen}
			/>
		</div>
	);
}
