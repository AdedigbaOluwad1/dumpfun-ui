'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { formatNumber, formatPrice } from '@/lib/utils';
import { ArrowDown, ArrowUp, BarChart3, Copy } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useWallet } from '@/hooks';
import { Token } from '@/types';

export function TradingModal({
	token,
	isOpen,
	onClose,
}: {
	token: Token | null;
	isOpen: boolean;
	onClose: () => void;
}) {
	const [tradeMode, setTradeMode] = useState('buy');
	const [amount, setAmount] = useState('');
	const wallet = useWallet();

	if (!token) return null;

	const calculateReceive = () => {
		if (!amount) return '0';
		const basePrice = token.price;
		return (parseFloat(amount) / basePrice).toFixed(0);
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onClose}
		>
			<DialogContent className='lg:max-w-6xl w-screen bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700'>
				<DialogHeader>
					<DialogTitle className='flex items-center gap-3 text-2xl'>
						<div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-2xl'>
							{token.image}
						</div>
						<div>
							<div className='text-white'>{token.name}</div>
							<div className='text-slate-400 text-sm font-normal'>
								{token.symbol}
							</div>
						</div>
						<Badge
							className={
								token.change24h > 0
									? 'bg-green-500/20 text-green-400'
									: 'bg-red-500/20 text-red-400'
							}
						>
							{token.change24h > 0 ? '+' : ''}
							{token.change24h.toFixed(1)}%
						</Badge>
					</DialogTitle>
				</DialogHeader>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6'>
					{/* Chart Section */}
					<div className='lg:col-span-2'>
						<Card className='bg-slate-800/50 border-slate-700'>
							<CardHeader>
								<div className='flex justify-between items-center'>
									<div className='flex items-baseline gap-4'>
										<div className='text-3xl font-bold text-white font-mono'>
											{formatPrice(token.price)}
										</div>
										<div
											className={`text-lg font-semibold ${
												token.change24h > 0
													? 'text-green-400'
													: 'text-red-400'
											}`}
										>
											{token.change24h > 0 ? '+' : ''}
											{token.change24h.toFixed(1)}%
										</div>
									</div>
									<div className='flex gap-1'>
										{['1H', '4H', '1D', '1W', '1M'].map(
											(timeframe) => (
												<Button
													key={timeframe}
													variant='outline'
													size='sm'
													className='border-slate-600 text-slate-300 hover:bg-slate-700'
												>
													{timeframe}
												</Button>
											)
										)}
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<div className='h-80 bg-slate-900/50 rounded-lg flex items-center justify-center'>
									<div className='text-center'>
										<BarChart3 className='h-16 w-16 text-slate-600 mx-auto mb-4' />
										<p className='text-slate-400'>
											Price chart would be integrated here
										</p>
										<p className='text-sm text-slate-500'>
											Using TradingView or custom chart
											library
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Trading Section */}
					<div className='space-y-6'>
						<Card className='bg-slate-800/50 border-slate-700'>
							<CardHeader>
								<div className='flex'>
									<Button
										onClick={() => setTradeMode('buy')}
										variant={
											tradeMode === 'buy'
												? 'default'
												: 'outline'
										}
										className={`flex-1 mr-1 ${
											tradeMode === 'buy'
												? 'bg-green-500 hover:bg-green-600'
												: 'border-slate-600 text-slate-300 hover:bg-slate-700'
										}`}
									>
										<ArrowUp className='w-4 h-4 mr-2' />
										Buy
									</Button>
									<Button
										onClick={() => setTradeMode('sell')}
										variant={
											tradeMode === 'sell'
												? 'default'
												: 'outline'
										}
										className={`flex-1 ml-1 ${
											tradeMode === 'sell'
												? 'bg-red-500 hover:bg-red-600'
												: 'border-slate-600 text-slate-300 hover:bg-slate-700'
										}`}
									>
										<ArrowDown className='w-4 h-4 mr-2' />
										Sell
									</Button>
								</div>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div>
									<Label className='text-slate-300'>
										You Pay
									</Label>
									<div className='relative'>
										<Input
											type='number'
											placeholder='0.0'
											value={amount}
											onChange={(e) =>
												setAmount(e.target.value)
											}
											className='bg-slate-900/50 border-slate-600 text-white pr-16'
										/>
										<div className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 font-semibold'>
											SOL
										</div>
									</div>
								</div>

								<div>
									<Label className='text-slate-300'>
										You Receive
									</Label>
									<div className='relative'>
										<Input
											type='text'
											value={calculateReceive()}
											disabled
											className='bg-slate-900/30 border-slate-600 text-white pr-20'
										/>
										<div className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 font-semibold'>
											{token.symbol}
										</div>
									</div>
								</div>

								<Button
									disabled={!wallet.connected || !amount}
									className={`w-full font-semibold py-3 ${
										tradeMode === 'buy'
											? 'bg-green-500 hover:bg-green-600'
											: 'bg-red-500 hover:bg-red-600'
									}`}
								>
									{wallet.connected
										? `${
												tradeMode === 'buy'
													? 'Buy'
													: 'Sell'
										  } ${token.symbol}`
										: 'Connect Wallet to Trade'}
								</Button>
							</CardContent>
						</Card>

						{/* Token Stats */}
						<Card className='bg-slate-800/50 border-slate-700'>
							<CardHeader>
								<CardTitle className='text-white flex items-center gap-2'>
									<BarChart3 className='h-5 w-5 text-blue-400' />
									Token Statistics
								</CardTitle>
							</CardHeader>
							<CardContent className='space-y-3'>
								<div className='flex justify-between items-center py-2 border-b border-slate-700/50'>
									<span className='text-slate-400'>
										Market Cap
									</span>
									<span className='text-white font-mono'>
										{formatNumber(token.marketCap)}
									</span>
								</div>
								<div className='flex justify-between items-center py-2 border-b border-slate-700/50'>
									<span className='text-slate-400'>
										24h Volume
									</span>
									<span className='text-white font-mono'>
										{formatNumber(token.volume24h)}
									</span>
								</div>
								<div className='flex justify-between items-center py-2 border-b border-slate-700/50'>
									<span className='text-slate-400'>
										Holders
									</span>
									<span className='text-white font-mono'>
										{token.holders.toLocaleString()}
									</span>
								</div>
								<div className='flex justify-between items-center py-2 border-b border-slate-700/50'>
									<span className='text-slate-400'>
										Creator
									</span>
									<div className='flex items-center gap-2'>
										<span className='text-white font-mono text-sm'>
											{token.creator}
										</span>
										<Button
											variant='ghost'
											size='sm'
											className='h-6 w-6 p-0'
										>
											<Copy className='h-3 w-3' />
										</Button>
									</div>
								</div>
								<div className='flex justify-between items-center py-2'>
									<span className='text-slate-400'>Age</span>
									<span className='text-white'>
										{token.created}
									</span>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
