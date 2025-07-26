/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState, useEffect } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Rocket, Wallet, Coins, Users, DollarSign } from 'lucide-react';
import { Token } from '@/types';
import { useWallet } from '@/hooks';
import { formatNumber, formatPrice } from '@/lib/utils';
import { Header } from '@/components/header';
import { TradingModal } from '@/components/trading-modal';

const mockTokens: Token[] = [
	{
		id: 1,
		name: 'PepeMax Pro',
		symbol: 'PMAX',
		price: 0.000234,
		change24h: 142.7,
		marketCap: 2340000,
		volume24h: 890000,
		holders: 4521,
		created: '2h ago',
		creator: '9WzD...AWWm',
		description: 'The ultimate Pepe evolution with advanced tokenomics',
		image: '🐸',
	},
	{
		id: 2,
		name: 'MoonDoge Elite',
		symbol: 'MDOGE',
		price: 0.000087,
		change24h: -12.4,
		marketCap: 1230000,
		volume24h: 450000,
		holders: 2891,
		created: '4h ago',
		creator: '7XaB...ZTgP',
		description: 'Lunar-powered Doge with staking rewards',
		image: '🌙',
	},
	{
		id: 3,
		name: 'ChainLink 3.0',
		symbol: 'LINK3',
		price: 0.001456,
		change24h: 67.2,
		marketCap: 5670000,
		volume24h: 1200000,
		holders: 8103,
		created: '6h ago',
		creator: '4KcN...MpQr',
		description: 'Next generation decentralized oracle network',
		image: '🔗',
	},
	{
		id: 4,
		name: 'SafeMoon 2.0',
		symbol: 'SAFE2',
		price: 0.000012,
		change24h: 234.8,
		marketCap: 890000,
		volume24h: 320000,
		holders: 1647,
		created: '8h ago',
		creator: '2VbM...QrSt',
		description: 'Improved SafeMoon with better tokenomics',
		image: '🚀',
	},
	{
		id: 5,
		name: 'ShibaInu Max',
		symbol: 'SHIMAX',
		price: 0.000298,
		change24h: -8.9,
		marketCap: 3450000,
		volume24h: 670000,
		holders: 5632,
		created: '12h ago',
		creator: '6YbN...UvWx',
		description: 'Maximum yield Shiba Inu fork',
		image: '🐕',
	},
	{
		id: 6,
		name: 'ElonCoin Pro',
		symbol: 'ELON',
		price: 0.000567,
		change24h: 89.3,
		marketCap: 4560000,
		volume24h: 980000,
		holders: 7234,
		created: '1d ago',
		creator: '8ZcP...YzAb',
		description: 'Mars-bound token with auto-staking',
		image: '🚀',
	},
];

export default function Page() {
	const wallet = useWallet();
	const [activeTab, setActiveTab] = useState('explore');
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedToken, setSelectedToken] = useState<Token | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [filteredTokens, setFilteredTokens] = useState(mockTokens);
	const [activeFilter, setActiveFilter] = useState('all');

	// Token creation form state
	const [tokenForm, setTokenForm] = useState({
		name: '',
		symbol: '',
		description: '',
		initialSupply: '',
		initialLiquidity: '',
	});

	useEffect(() => {
		const filtered = mockTokens.filter(
			(token) =>
				token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
		);
		setFilteredTokens(filtered);
	}, [searchQuery]);

	const handleCreateToken = async () => {
		console.log('Creating token:', tokenForm);
		// TODO: Integrate with Solana program
	};

	const openTokenModal = (token: any) => {
		setSelectedToken(token);
		setIsModalOpen(true);
	};

	const platformStats = {
		volume24h: '$24.7M',
		activeTokens: '8,429',
		totalUsers: '147K',
		createdToday: '234',
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900'>
			{/* Header */}
			<Header />

			<div className='max-w-7xl mx-auto px-4 py-8'>
				{/* Explore Tab */}
				{activeTab === 'explore' && (
					<div className='space-y-6'>
						{/* Stats Bar */}
						<Card className='bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600 backdrop-blur-sm'>
							<CardContent className='p-6'>
								<div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
									<div className='text-center'>
										<div className='w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl mx-auto mb-3 flex items-center justify-center'>
											<DollarSign className='h-6 w-6 text-white' />
										</div>
										<div className='text-2xl font-bold text-white'>
											{platformStats.volume24h}
										</div>
										<div className='text-sm text-slate-400 font-medium'>
											24h Volume
										</div>
									</div>
									<div className='text-center'>
										<div className='w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl mx-auto mb-3 flex items-center justify-center'>
											<Coins className='h-6 w-6 text-white' />
										</div>
										<div className='text-2xl font-bold text-white'>
											{platformStats.activeTokens}
										</div>
										<div className='text-sm text-slate-400 font-medium'>
											Active Tokens
										</div>
									</div>
									<div className='text-center'>
										<div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl mx-auto mb-3 flex items-center justify-center'>
											<Users className='h-6 w-6 text-white' />
										</div>
										<div className='text-2xl font-bold text-white'>
											{platformStats.totalUsers}
										</div>
										<div className='text-sm text-slate-400 font-medium'>
											Total Users
										</div>
									</div>
									<div className='text-center'>
										<div className='w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl mx-auto mb-3 flex items-center justify-center'>
											{/* <Fire className='h-6 w-6 text-white' /> */}
										</div>
										<div className='text-2xl font-bold text-white'>
											{platformStats.createdToday}
										</div>
										<div className='text-sm text-slate-400 font-medium'>
											Created Today
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Filters */}
						<div className='flex justify-between items-center flex-wrap gap-4'>
							<div className='flex gap-2'>
								{[
									'all',
									'new',
									'trending',
									'gainers',
									'recent',
								].map((filter) => (
									<Button
										key={filter}
										variant={
											activeFilter === filter
												? 'default'
												: 'outline'
										}
										size='sm'
										onClick={() => setActiveFilter(filter)}
										className={
											activeFilter === filter
												? 'bg-cyan-500 hover:bg-cyan-600'
												: 'border-slate-600 text-slate-300 hover:bg-slate-800'
										}
									>
										{filter.charAt(0).toUpperCase() +
											filter.slice(1)}
									</Button>
								))}
							</div>

							<Select defaultValue='volume'>
								<SelectTrigger className='w-48 bg-slate-800/50 border-slate-600 text-white'>
									<SelectValue />
								</SelectTrigger>
								<SelectContent className='bg-slate-800 border-slate-600'>
									<SelectItem value='volume'>
										Sort by Volume
									</SelectItem>
									<SelectItem value='marketcap'>
										Sort by Market Cap
									</SelectItem>
									<SelectItem value='change'>
										Sort by Price Change
									</SelectItem>
									<SelectItem value='age'>
										Sort by Age
									</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{/* Token Table */}
						<Card className='bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600 backdrop-blur-sm'>
							<CardContent className='p-0'>
								{/* Table Header */}
								<div className='grid grid-cols-12 gap-4 p-4 border-b border-slate-600 bg-slate-800/30 text-sm font-semibold text-slate-300 uppercase tracking-wide'>
									<div className='col-span-3'>Token</div>
									<div className='col-span-2'>Price</div>
									<div className='col-span-1'>24h %</div>
									<div className='col-span-2 hidden md:block'>
										Volume
									</div>
									<div className='col-span-2 hidden lg:block'>
										Market Cap
									</div>
									<div className='col-span-1 hidden xl:block'>
										Age
									</div>
									<div className='col-span-1'>Trade</div>
								</div>

								{/* Token Rows */}
								{filteredTokens.map((token) => (
									<div
										key={token.id}
										onClick={() => openTokenModal(token)}
										className='grid grid-cols-12 gap-4 p-4 border-b border-slate-700/50 hover:bg-slate-800/30 cursor-pointer transition-all duration-200 group'
									>
										<div className='col-span-3 flex items-center gap-3'>
											<div className='w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-600 rounded-xl flex items-center justify-center text-lg border border-slate-600'>
												{token.image}
											</div>
											<div>
												<div className='font-semibold text-white group-hover:text-cyan-400 transition-colors'>
													{token.name}
												</div>
												<div className='text-sm text-slate-400'>
													{token.symbol}
												</div>
											</div>
										</div>

										<div className='col-span-2 flex items-center'>
											<span className='font-mono font-semibold text-white'>
												{formatPrice(token.price)}
											</span>
										</div>

										<div className='col-span-1 flex items-center'>
											<Badge
												className={`font-mono ${
													token.change24h > 0
														? 'bg-green-500/20 text-green-400'
														: 'bg-red-500/20 text-red-400'
												}`}
											>
												{token.change24h > 0 ? '+' : ''}
												{token.change24h.toFixed(1)}%
											</Badge>
										</div>

										<div className='col-span-2 hidden md:flex items-center'>
											<span className='font-mono text-slate-300'>
												{formatNumber(token.volume24h)}
											</span>
										</div>

										<div className='col-span-2 hidden lg:flex items-center'>
											<span className='font-mono text-slate-300'>
												{formatNumber(token.marketCap)}
											</span>
										</div>

										<div className='col-span-1 hidden xl:flex items-center'>
											<span className='text-sm text-slate-400'>
												{token.created}
											</span>
										</div>

										<div className='col-span-1 flex items-center'>
											<Button
												size='sm'
												onClick={(e) => {
													e.stopPropagation();
													openTokenModal(token);
												}}
												className='bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/25'
											>
												Trade
											</Button>
										</div>
									</div>
								))}
							</CardContent>
						</Card>
					</div>
				)}

				{/* Create Tab */}
				{activeTab === 'create' && (
					<div className='max-w-4xl mx-auto'>
						<Card className='bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600 backdrop-blur-sm'>
							<CardHeader className='text-center'>
								<CardTitle className='text-3xl font-bold text-white flex items-center justify-center gap-3'>
									<Rocket className='h-8 w-8 text-cyan-400' />
									Launch Your Token
								</CardTitle>
								<CardDescription className='text-slate-300 text-lg'>
									Create your own meme token with our advanced
									bonding curve mechanism
								</CardDescription>
							</CardHeader>
							<CardContent className='space-y-6'>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
									<div className='space-y-4'>
										<div>
											<Label className='text-slate-300'>
												Token Name
											</Label>
											<Input
												placeholder='e.g., Doge Killer'
												value={tokenForm.name}
												onChange={(e) =>
													setTokenForm({
														...tokenForm,
														name: e.target.value,
													})
												}
												className='bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400'
											/>
										</div>

										<div>
											<Label className='text-slate-300'>
												Token Symbol
											</Label>
											<Input
												placeholder='e.g., DGKR'
												value={tokenForm.symbol}
												onChange={(e) =>
													setTokenForm({
														...tokenForm,
														symbol: e.target.value,
													})
												}
												className='bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400'
											/>
										</div>

										<div>
											<Label className='text-slate-300'>
												Initial Supply
											</Label>
											<Input
												type='number'
												placeholder='1000000000'
												value={tokenForm.initialSupply}
												onChange={(e) =>
													setTokenForm({
														...tokenForm,
														initialSupply:
															e.target.value,
													})
												}
												className='bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400'
											/>
										</div>

										<div>
											<Label className='text-slate-300'>
												Initial Liquidity (SOL)
											</Label>
											<Input
												type='number'
												placeholder='1.0'
												step='0.1'
												value={
													tokenForm.initialLiquidity
												}
												onChange={(e) =>
													setTokenForm({
														...tokenForm,
														initialLiquidity:
															e.target.value,
													})
												}
												className='bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400'
											/>
										</div>
									</div>

									<div className='space-y-4'>
										<div>
											<Label className='text-slate-300'>
												Description
											</Label>
											<Textarea
												placeholder='Tell the world about your token...'
												value={tokenForm.description}
												onChange={(e) =>
													setTokenForm({
														...tokenForm,
														description:
															e.target.value,
													})
												}
												className='bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 min-h-[120px]'
											/>
										</div>

										<div>
											<Label className='text-slate-300'>
												Token Image
											</Label>
											<div className='border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-slate-500 transition-colors cursor-pointer bg-slate-800/30'>
												<div className='text-4xl mb-4'>
													📁
												</div>
												<p className='text-slate-400'>
													Click to upload image
												</p>
												<p className='text-sm text-slate-500 mt-2'>
													PNG, JPG up to 5MB
												</p>
											</div>
										</div>
									</div>
								</div>

								<Button
									onClick={handleCreateToken}
									disabled={
										!wallet.connected ||
										!tokenForm.name ||
										!tokenForm.symbol
									}
									className='w-full font-semibold py-4 text-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/25'
								>
									<Rocket className='w-5 h-5 mr-2' />
									{wallet.connected
										? 'Launch Token (0.1 SOL)'
										: 'Connect Wallet to Launch'}
								</Button>
							</CardContent>
						</Card>
					</div>
				)}

				{/* Portfolio Tab */}
				{activeTab === 'portfolio' && (
					<div className='max-w-4xl mx-auto'>
						<Card className='bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600 backdrop-blur-sm'>
							<CardHeader className='text-center'>
								<CardTitle className='text-3xl font-bold text-white flex items-center justify-center gap-3'>
									<Wallet className='h-8 w-8 text-purple-400' />
									Your Portfolio
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='text-center py-16'>
									<div className='text-6xl mb-6 opacity-30'>
										<Wallet className='h-24 w-24 mx-auto text-slate-600' />
									</div>
									<p className='text-slate-400 text-lg'>
										{wallet.connected
											? 'No tokens found in your wallet'
											: 'Connect your wallet to view your portfolio'}
									</p>
									{!wallet.connected && (
										<Button
											onClick={wallet.connect}
											className='mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/25'
										>
											<Wallet className='w-4 h-4 mr-2' />
											Connect Wallet
										</Button>
									)}
								</div>
							</CardContent>
						</Card>
					</div>
				)}
			</div>

			{/* Trading Modal */}
			<TradingModal
				token={selectedToken}
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</div>
	);
}
