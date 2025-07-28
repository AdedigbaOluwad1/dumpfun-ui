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
	Rocket,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
	const pathname = usePathname();

	const navItems = [
		{ icon: Home, label: 'Home', href: '/' },
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
					<div className='p-1 rounded-lg backdrop-blur-3xl'>
						<Image
							src={'/pepe.png'}
							width={1000}
							height={1000}
							className='w-8'
							alt=''
						/>
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
									pathname === item.href
										? 'bg-transparent text-green-400 border-0 border-green-500/30'
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
						<Rocket className='size-5' />
						Create Coin
					</Button>
				</Link>
			</div>
		</div>
	);
}
