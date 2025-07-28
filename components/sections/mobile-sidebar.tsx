'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Rocket } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { navItems } from '@/consts/config';

interface MobileSidebarProps {
	children: React.ReactNode;
}

export function MobileSidebar({ children }: MobileSidebarProps) {
	const pathname = usePathname();

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent
				side='left'
				className='w-80 p-0 bg-transparent border-none shadow-none'
			>
				<div className='h-full p-4'>
					<div className='h-full bg-gray-900/5 backdrop-blur-md border border-gray-700/50 rounded-xl shadow-2xl overflow-hidden'>
						<div className='h-full w-full flex flex-col'>
							<div className='p-6 py-0 h-15 flex items-center border-b border-gray-800'>
								<Link
									href='/'
									className='flex items-center space-x-3'
								>
									<div className='p-0 rounded-lg backdrop-blur-3xl'>
										<Image
											src={'/pepe.png'}
											width={1000}
											height={1000}
											className='w-7'
											alt=''
										/>
									</div>
									<span className='text-xl font-bold'>dump.fun</span>
								</Link>
							</div>

							<nav className='flex-1 w-full p-4 py-2'>
								<ul className='space-y-2'>
									{navItems.map((item) => (
										<SheetClose
											asChild
											key={item.label}
										>
											<Link
												href={item.href}
												className={`flex items-center space-x-3 px-2 py-2 h-12 rounded-lg text-sm transition-colors ${
													pathname === item.href
														? 'bg-transparent text-green-400 border-0 border-green-500/30'
														: 'text-gray-300'
												}`}
											>
												<item.icon className='size-5' />
												<span className='font-medium'>{item.label}</span>
											</Link>
										</SheetClose>
									))}
								</ul>
							</nav>

							<div className='p-4 border-t border-gray-800'>
								<Link href='/create'>
									<Button className='w-full bg-gradient-to-r rounded-lg h-10 text-xs from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold'>
										<Rocket className='size-4' />
										Create Coin
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
