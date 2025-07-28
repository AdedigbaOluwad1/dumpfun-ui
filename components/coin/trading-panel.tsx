'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export function TradingPanel() {
	return (
		<Card className='bg-gray-800/50 gap-0 border-gray-700 sticky top-8'>
			<CardContent className='space-y-6'>
				<Tabs
					defaultValue='buy'
					className='w-full'
				>
					<TabsList className='grid w-full grid-cols-2 h-fit bg-gray-700!'>
						<TabsTrigger
							value='buy'
							className='data-[state=active]:bg-green-600! text-base py-1.5 data-[state=active]:text-white'
						>
							Buy
						</TabsTrigger>
						<TabsTrigger
							value='sell'
							className='data-[state=active]:bg-red-600! text-base py-1.5 data-[state=active]:text-white!'
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
								className='border-green-500 text-green-400 hover:bg-green-500! hover:text-white bg-transparent'
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
									className='bg-gray-700 border-gray-600 text-white text-xl! h-12 pl-4 pr-16 rounded-lg text-left'
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
								className='border-gray-600 bg-transparent text-xs rounded-lg'
							>
								Reset
							</Button>
							<Button
								variant='outline'
								size='sm'
								className='border-gray-600 bg-transparent text-xs rounded-lg'
							>
								0.1 SOL
							</Button>
							<Button
								variant='outline'
								size='sm'
								className='border-gray-600 bg-transparent text-xs rounded-lg'
							>
								0.5 SOL
							</Button>
							<Button
								variant='outline'
								size='sm'
								className='border-gray-600 bg-transparent text-xs rounded-lg'
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
									className='border-gray-600 bg-transparent text-xs rounded-lg'
								>
									Auto
								</Button>
								<Button
									variant='outline'
									size='sm'
									className='border-gray-600 bg-transparent text-xs rounded-lg'
								>
									1%
								</Button>
								<Button
									variant='outline'
									size='sm'
									className='border-gray-600 bg-transparent text-xs rounded-lg'
								>
									5%
								</Button>
								<Button
									variant='outline'
									size='sm'
									className='border-gray-600 bg-transparent text-xs rounded-lg'
								>
									10%
								</Button>
							</div>
						</div>

						<Button
							className='w-full bg-gradient-to-r rounded-lg px-7 from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white h-11 text-base font-semibold'
							// disabled
						>
							Log in to trade
						</Button>
					</TabsContent>

					<TabsContent
						value='sell'
						className='space-y-4 mt-6'
					>
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
									className='bg-gray-700 border-gray-600 text-white text-xl! h-12 pl-4 pr-16 rounded-lg text-left'
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
								className='border-gray-600 bg-transparent text-xs rounded-lg'
							>
								Reset
							</Button>
							<Button
								variant='outline'
								size='sm'
								className='border-gray-600 bg-transparent text-xs rounded-lg'
							>
								25%
							</Button>
							<Button
								variant='outline'
								size='sm'
								className='border-gray-600 bg-transparent text-xs rounded-lg'
							>
								50%
							</Button>
							<Button
								variant='outline'
								size='sm'
								className='border-gray-600 bg-transparent text-xs rounded-lg'
							>
								100%
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
									className='border-gray-600 bg-transparent text-xs rounded-lg'
								>
									Auto
								</Button>
								<Button
									variant='outline'
									size='sm'
									className='border-gray-600 bg-transparent text-xs rounded-lg'
								>
									1%
								</Button>
								<Button
									variant='outline'
									size='sm'
									className='border-gray-600 bg-transparent text-xs rounded-lg'
								>
									5%
								</Button>
								<Button
									variant='outline'
									size='sm'
									className='border-gray-600 bg-transparent text-xs rounded-lg'
								>
									10%
								</Button>
							</div>
						</div>

						<Button
							className='w-full bg-gradient-to-r rounded-lg px-7 from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white h-12 text-base font-semibold'
							// disabled
						>
							Log in to trade
						</Button>
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	);
}
