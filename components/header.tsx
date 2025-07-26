'use client';
import React, { useState } from 'react';
import { Input } from './ui/input';
import { ChartLine, Plus, Rocket, Search, Wallet } from 'lucide-react';
import { Button } from './ui/button';
import { useWallet } from '@/hooks';

export function Header() {
	const wallet = useWallet();
	const [activeTab, setActiveTab] = useState('explore');
	const [searchQuery, setSearchQuery] = useState('');

	return (
		<header className='sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-700/50'>
			<div className='max-w-7xl mx-auto px-4 py-4'>
				<div className='flex justify-between items-center'>
					{/* Logo & Nav */}
					<div className='flex items-center gap-8'>
						<div className='flex items-center gap-3'>
							<div className='w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25'>
								<Rocket className='h-6 w-6 text-white' />
							</div>
							<div className='text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent'>
								DumpFun
							</div>
						</div>

						<nav className='hidden md:flex gap-1'>
							<Button
								variant={
									activeTab === 'explore'
										? 'default'
										: 'ghost'
								}
								onClick={() => setActiveTab('explore')}
								className={
									activeTab === 'explore'
										? 'bg-cyan-500 hover:bg-cyan-600'
										: 'text-slate-300 hover:text-white hover:bg-slate-800'
								}
							>
								<ChartLine className='w-4 h-4 mr-2' />
								Explore
							</Button>
							<Button
								variant={
									activeTab === 'create' ? 'default' : 'ghost'
								}
								onClick={() => setActiveTab('create')}
								className={
									activeTab === 'create'
										? 'bg-cyan-500 hover:bg-cyan-600'
										: 'text-slate-300 hover:text-white hover:bg-slate-800'
								}
							>
								<Plus className='w-4 h-4 mr-2' />
								Launch
							</Button>
							<Button
								variant={
									activeTab === 'portfolio'
										? 'default'
										: 'ghost'
								}
								onClick={() => setActiveTab('portfolio')}
								className={
									activeTab === 'portfolio'
										? 'bg-cyan-500 hover:bg-cyan-600'
										: 'text-slate-300 hover:text-white hover:bg-slate-800'
								}
							>
								<Wallet className='w-4 h-4 mr-2' />
								Portfolio
							</Button>
						</nav>
					</div>

					{/* Search & Wallet */}
					<div className='flex items-center gap-4'>
						<div className='relative hidden md:block'>
							<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400' />
							<Input
								placeholder='Search tokens...'
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className='pl-10 w-72 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400'
							/>
						</div>

						<Button
							onClick={
								wallet.connected
									? wallet.disconnect
									: wallet.connect
							}
							className={`font-semibold ${
								wallet.connected
									? 'bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/25'
									: 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/25'
							}`}
						>
							<Wallet className='w-4 h-4 mr-2' />
							{wallet.connected
								? `${wallet.publicKey?.slice(
										0,
										4
								  )}...${wallet.publicKey?.slice(-4)}`
								: 'Connect Wallet'}
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
}
