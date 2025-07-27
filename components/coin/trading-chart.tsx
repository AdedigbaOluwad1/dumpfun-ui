'use client';

import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

export function TradingChart() {
	return (
		<Card className='bg-gray-800/50 border-gray-700 mb-6'>
			<CardContent>
				<div className='h-96 bg-gray-900/50 rounded-lg flex items-center justify-center mb-4'>
					<div className='text-center'>
						<TrendingUp className='w-16 h-16 text-green-400 mx-auto mb-4' />
						<p className='text-gray-400 mb-2'>Trading Chart</p>
						<p className='text-sm text-gray-500'>
							KRYPT/SOL Market Cap (USD) • 1 • Pump
						</p>
						<div className='flex items-center justify-center space-x-4 mt-4 text-sm'>
							<span className='text-green-400'>O: 5.3K</span>
							<span className='text-blue-400'>H: 5.3K</span>
							<span className='text-red-400'>L: 5.2K</span>
							<span className='text-yellow-400'>C: 5.3K</span>
							<span className='text-purple-400'>Vol: 15.68</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
