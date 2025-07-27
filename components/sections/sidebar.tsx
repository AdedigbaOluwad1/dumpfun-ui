'use client';

import { Button } from '@/components/ui/button';
import {
	Home,
	Radio,
	Settings,
	MessageCircle,
	User,
	HelpCircle,
	MoreHorizontal,
	TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

export function Sidebar() {
	const navItems = [
		{ icon: Home, label: 'Home', href: '/', active: true },
		{ icon: Radio, label: 'Livestreams', href: '/livestreams' },
		{ icon: Settings, label: 'Advanced', href: '/advanced' },
		{ icon: MessageCircle, label: 'Chat', href: '/chat' },
		{ icon: User, label: 'Profile', href: '/profile' },
		{ icon: HelpCircle, label: 'Support', href: '/support' },
		{ icon: MoreHorizontal, label: 'More', href: '/more' },
	];

	return (
		<div className='h-full bg-gray-900 border-r w-full border-gray-800 flex flex-col'>
			<div className='p-6 py-0 h-18 flex items-center border-b border-gray-800'>
				<Link
					href='/'
					className='flex items-center space-x-3'
				>
					<div className='w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center'>
						<TrendingUp className='w-5 h-5 text-white' />
					</div>
					<span className='text-xl font-bold'>dump.fun</span>
				</Link>
			</div>

			<nav className='flex-1 w-full p-4'>
				<ul className='space-y-2'>
					{navItems.map((item) => (
						<li key={item.label}>
							<Link
								href={item.href}
								className={`flex items-center space-x-3 px-4 py-2 h-12 rounded-lg transition-colors ${
									item.active
										? 'bg-green-500/20 text-green-400 border border-green-500/30'
										: 'text-gray-300 hover:bg-gray-800 hover:text-white'
								}`}
							>
								<item.icon className='w-5 h-5' />
								<span className='font-medium'>
									{item.label}
								</span>
							</Link>
						</li>
					))}
				</ul>
			</nav>

			<div className='p-4 border-t border-gray-800'>
				<Link href='/create'>
					<Button className='w-full bg-gradient-to-r rounded-lg h-10 from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold'>
						Create Coin
					</Button>
				</Link>
			</div>
		</div>
	);
}
