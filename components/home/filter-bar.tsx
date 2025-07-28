'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, Search } from 'lucide-react';
import { Switch } from '../common';
import { Input } from '../ui/input';

export function FilterBar() {
	const categories = [
		{ name: 'Doggo Mania', emoji: '🐕', active: true },
		{ name: 'Pump Vibes', emoji: '🔥', active: false },
		{ name: 'Finance Frenzy', emoji: '💰', active: false },
		{ name: 'Absurd Humor', emoji: '😂', active: false },
		{ name: 'Cat Craze', emoji: '🐱', active: false },
		{ name: 'Anime Aura', emoji: '✨', active: false },
		{ name: 'Frogverse', emoji: '🐸', active: false },
		{ name: 'Cosmic Journey', emoji: '🚀', active: false },
	];

	return (
		<div className='mb-6 space-y-4'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center space-x-6'>
					<div className='flex items-center space-x-2'>
						<span className='text-sm text-gray-400'>sort:</span>
						<Button
							variant='outline'
							size='sm'
							className='border-gray-600 text-gray-300 bg-transparent'
						>
							creation time
							<ChevronDown className='w-3 h-3 ml-1' />
						</Button>
					</div>

					<div className='flex items-center space-x-2'>
						<span className='text-sm text-gray-400'>order:</span>
						<Button
							variant='outline'
							size='sm'
							className='border-gray-600 text-gray-300 bg-transparent'
						>
							desc
							<ChevronDown className='w-3 h-3 ml-1' />
						</Button>
					</div>

					<div className='relative'>
						<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
						<Input
							placeholder='Search...'
							className='pl-10 w-60 bg-gray-800 shadow-none! text-xs rounded-lg outline-0! border-gray-700 h-8 text-white placeholder:text-gray-400'
						/>
					</div>
				</div>

				<div className='flex items-center space-x-6'>
					<div className='flex items-center space-x-2'>
						<span className='text-sm text-gray-400'>
							show animations:
						</span>
						<Switch defaultChecked />
					</div>

					<div className='flex items-center space-x-2'>
						<span className='text-sm text-gray-400'>
							include nsfw:
						</span>
						<Switch />
					</div>
				</div>
			</div>

			<div className='flex flex-wrap gap-2'>
				{categories.map((category) => (
					<Badge
						key={category.name}
						variant={category.active ? 'default' : 'secondary'}
						className={`px-4 py-1.25 rounded-xl cursor-pointer transition-colors ${
							category.active
								? 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30'
								: 'bg-gray-800 text-sm text-gray-400 border-gray-700 hover:bg-gray-700'
						}`}
					>
						<span className='mr-1'>{category.emoji}</span>
						{category.name}
					</Badge>
				))}
			</div>
		</div>
	);
}
