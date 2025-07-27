'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Settings } from 'lucide-react';

export function TradingPanel() {
	return (
		<Card className='bg-gray-800/50 border-gray-700 sticky top-8'>
			<CardHeader className='pb-3'>
				<div className='flex items-center justify-between'>
					<CardTitle className='text-white'>Trade KRYPT</CardTitle>
					<Button
						variant='ghost'
						size='sm'
					>
						<Settings className='w-4 h-4' />
					</Button>
				</div>
			</CardHeader>

			<CardContent className='space-y-6'>
				<Tabs
					defaultValue='buy'
					className='w-full'
				>
					<TabsList className='grid w-full grid-cols-2 bg-gray-700'>
						<TabsTrigger
							value='buy'
							className='data-[state=active]:bg-green-600 data-[state=active]:text-white'
						>
							Buy
						</TabsTrigger>
						<TabsTrigger
							value='sell'
							className='data-[state=active]:bg-red-600 data-[state=active]:text-white'
						>
							Sell
						</TabsTrigger>
					</TabsList>

					<TabsContent
						value='buy'
						className='space-y-4 mt-6'
					>
						<div className='text-center'>
							<Button
								variant='outline'
								size='sm'
								className='border-green-500 text-green-400 hover:bg-green-500 hover:text-white bg-transparent'
							>
								Switch to KRYPT
							</Button>
						</div>

						<div>
							<div className='flex items-center justify-between mb-2'>
								<span className='text-sm text-gray-400'>
									You pay
								</span>
								<span className='text-xs text-gray-500'>
									Balance: 0 SOL
								</span>
							</div>
							<div className='relative'>
								<Input
									placeholder='0'
									className='bg-gray-700 border-gray-600 text-white text-2xl h-16 pr-16 text-center'
								/>
								<div className='absolute right-4 top-1/2 -translate-y-1/2'>
									<Badge className='bg-gray-600 text-white'>
										SOL
									</Badge>
								</div>
							</div>
						</div>

						<div className='grid grid-cols-4 gap-2'>
							<Button
								variant='outline'
								size='sm'
								className='border-gray-600 bg-transparent text-xs'
							>
								Reset
							</Button>
							<Button
								variant='outline'
								size='sm'
								className='border-gray-600 bg-transparent text-xs'
							>
								0.1 SOL
							</Button>
							<Button
								variant='outline'
								size='sm'
								className='border-gray-600 bg-transparent text-xs'
							>
								0.5 SOL
							</Button>
							<Button
								variant='outline'
								size='sm'
								className='border-gray-600 bg-transparent text-xs'
							>
								1 SOL
							</Button>
							<Button
								variant='outline'
								size='sm'
								className='border-gray-600 bg-transparent text-xs'
							>
								Max
							</Button>
						</div>

						<div>
							<div className='flex items-center justify-between mb-2'>
								<span className='text-sm text-gray-400'>
									Set max slippage
								</span>
							</div>
							<div className='grid grid-cols-4 gap-2'>
								<Button
									variant='outline'
									size='sm'
									className='border-gray-600 bg-transparent text-xs'
								>
									Auto
								</Button>
								<Button
									variant='outline'
									size='sm'
									className='border-gray-600 bg-transparent text-xs'
								>
									1%
								</Button>
								<Button
									variant='outline'
									size='sm'
									className='border-gray-600 bg-transparent text-xs'
								>
									5%
								</Button>
								<Button
									variant='outline'
									size='sm'
									className='border-gray-600 bg-transparent text-xs'
								>
									10%
								</Button>
							</div>
						</div>

						<div className='space-y-2 text-sm border-t border-gray-700 pt-4'>
							<div className='flex justify-between'>
								<span className='text-gray-400'>Position</span>
								<span className='text-white'>0 KRYPT</span>
							</div>
							<div className='flex justify-between'>
								<span className='text-gray-400'>Trades</span>
								<span className='text-white'>0</span>
							</div>
							<div className='flex justify-between'>
								<span className='text-gray-400'>
									Profit/Loss
								</span>
								<span className='text-white'>-</span>
							</div>
							<div className='flex justify-between'>
								<span className='text-gray-400'>
									Profit indicator
								</span>
								<span className='text-white'>-</span>
							</div>
						</div>

						<Button
							className='w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg font-semibold'
							disabled
						>
							Log in to trade
						</Button>
					</TabsContent>

					<TabsContent
						value='sell'
						className='space-y-4 mt-6'
					>
						<div className='text-center py-8'>
							<p className='text-gray-400'>
								Connect wallet to start selling
							</p>
						</div>
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	);
}
