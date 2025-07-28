/* eslint-disable @next/next/no-img-element */
'use client';

import { Button } from '@/components/ui/button';
import { navItems } from '@/consts/config';
import { Rocket } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
	const pathname = usePathname();

	return (
		<div className='h-full bg-gray-900 hidden border-r w-full border-gray-800 lg:flex flex-col'>
			<div className='p-6 py-0 h-18 flex items-center border-b border-gray-800'>
				<Link
					href='/'
					className='flex items-center space-x-3'
				>
					<div className='p-1 rounded-lg backdrop-blur-3xl'>
						<img
							src={'https://dumpdotfun.vercel.app/pepe-sm.png'}
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
								<span className='font-medium'>{item.label}</span>
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
