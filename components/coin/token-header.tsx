'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';

interface TokenHeaderProps {
	tokenId: string;
}

export function TokenHeader({ tokenId }: TokenHeaderProps) {
	return (
		<div className='bg-gray-900 z-20 sticky top-0 border-b border-gray-800 px-6 py-4'>
			<div className='flex items-center justify-between'>
				{/* Left - Back button and activity */}
				<div className='flex items-center space-x-4'>
					<Link href='/'>
						<Button
							variant='ghost'
							size='sm'
							className='text-gray-400 hover:text-white'
						>
							<ArrowLeft className='w-4 h-4' />
						</Button>
					</Link>

					<div className='flex items-center space-x-2 bg-blue-500/20 rounded-full px-4 py-2'>
						<Avatar className='w-6 h-6'>
							<AvatarFallback className='text-xs bg-blue-600'>
								8
							</AvatarFallback>
						</Avatar>
						<span className='text-sm text-blue-400'>
							<span className='font-medium'>86vECv</span> created{' '}
							<span className='font-medium'>KRYPT</span>
						</span>
						<Badge className='bg-blue-500/30 text-blue-300 border-blue-500/50'>
							✓
						</Badge>
					</div>
				</div>

				{/* Right - Actions */}
				<div className='flex items-center space-x-4'>
					<Button
						variant='outline'
						className='border-green-500 text-green-400 hover:bg-green-500 hover:text-white bg-transparent'
					>
						Create coin
					</Button>
					<Button className='bg-green-600 hover:bg-green-700'>
						Log in
					</Button>
				</div>
			</div>
		</div>
	);
}
