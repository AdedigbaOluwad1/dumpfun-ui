'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Menu, Rocket, UserRound } from 'lucide-react';
import Link from 'next/link';
import { LoginModal } from '@/components/common';
import { useState } from 'react';
import { MobileSidebar } from './mobile-sidebar';

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
		<div className='bg-gray-900 sticky top-0 border-b border-gray-800 h-full flex items-center px-4 md:px-6'>
			<div className='flex items-center justify-between w-full'>
				<div className='flex items-center space-x-4 w-fit'>
					<div className='rounded-lg lg:hidden px-1 backdrop-blur-3xl'>
						<MobileSidebar>
							<Button
								size={'icon'}
								variant={'ghost'}
								className='text-foreground/80 -ml-2'
							>
								<Menu className='size-5 md:size-6 md:min-w-6' />
							</Button>
						</MobileSidebar>
					</div>
					{activities.map((activity, index) => (
						<div
							key={index}
							className='md:flex hidden items-center space-x-2 bg-gray-800 rounded-full px-4 py-2'
						>
							<Avatar className='w-6 h-6'>
								<AvatarImage src={activity.avatar || '/placeholder.svg'} />
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
									<span className='text-yellow-400'>{activity.amount}</span>
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
						<Button className='w-fit text-xs md:text-sm bg-gradient-to-r rounded-lg px-7 h-8 md:h-9 from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold'>
							<Rocket className='size-3.5 md:size-4' />
							Create Coin
						</Button>
					</Link>

					<Button
						onClick={() => setIsModalOpen(true)}
						className='w-fit bg-transparent rounded-lg px-7 h-8 md:h-9 hover:bg-transparent text-xs md:text-sm  text-green-600 border border-green-600 font-semibold'
					>
						<UserRound className='size-3.5 md:size-4' />
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
