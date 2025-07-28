'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Wallet, ChevronRight, Shield, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface LoginModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
	const [isConnecting, setIsConnecting] = useState<string | null>(null);
	const [showMoreWallets, setShowMoreWallets] = useState(false);

	const handleConnect = async (method: string) => {
		setIsConnecting(method);
		// Simulate connection delay
		await new Promise((resolve) => setTimeout(resolve, 2000));
		setIsConnecting(null);
		onOpenChange(false);
	};

	const wallets = [
		{
			name: 'Phantom',
			icon: 'https://phantom.app/img/phantom-logo.svg',
			description: 'Most popular Solana wallet',
			installed: true,
		},
		{
			name: 'Solflare',
			icon: '/placeholder.svg?height=32&width=32&text=SF',
			description: 'Secure & user-friendly',
			installed: false,
		},
		{
			name: 'Backpack',
			icon: '/placeholder.svg?height=32&width=32&text=BP',
			description: 'Built for DeFi',
			installed: false,
		},
		{
			name: 'Coinbase Wallet',
			icon: '/placeholder.svg?height=32&width=32&text=CB',
			description: 'Connect with Coinbase',
			installed: false,
		},
	];

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent
				showCloseButton={false}
				className='sm:max-w-md bg-gray-900/5 backdrop-blur-xl border-gray-700/50 shadow-2xl rounded-2xl'
			>
				<DialogHeader className='relative'>
					<Button
						variant='ghost'
						size='sm'
						className='absolute -top-2 -right-2 w-8 h-8 p-0 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full'
						onClick={() => onOpenChange(false)}
					>
						<X className='size-4' />
					</Button>
				</DialogHeader>

				<div className='space-y-8 py-4 pb-0'>
					<div className='text-center space-y-4'>
						<div className='relative mx-auto w-16 h-16'>
							<div className='absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl animate-pulse opacity-20'></div>
							<div className='relative w-full h-full bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg'>
								<div className='w-8 h-4 bg-white rounded-full relative overflow-hidden'>
									<div className='absolute left-1 top-1 w-2 h-2 bg-green-500 rounded-full animate-bounce'></div>
								</div>
							</div>
						</div>

						<div>
							<h2 className='text-xl font-semibold text-white mb-2'>
								Connect or Create Wallet
							</h2>
							<p className='text-sm text-gray-400'>
								Choose your preferred method to get started
							</p>
						</div>
					</div>

					<div className='space-y-3'>
						<Button
							variant='outline'
							className='w-full h-16 bg-gray-800/50 border-gray-700 hover:bg-gray-800 hover:border-green-500/50 transition-all rounded-lg duration-300 group'
							onClick={() => handleConnect('phantom')}
							disabled={isConnecting !== null}
						>
							<div className='flex items-center justify-between w-full'>
								<div className='flex items-center space-x-4'>
									<div className='w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center'>
										{isConnecting === 'phantom' ? (
											<div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
										) : (
											<div className='w-6 h-6 bg-white rounded-lg flex items-center justify-center'>
												<div className='w-4 h-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded'></div>
											</div>
										)}
									</div>
									<div className='text-left'>
										<div className='text-white font-medium flex items-center space-x-2'>
											<span>Phantom</span>
											{wallets[0].installed && (
												<div className='w-2 h-2 bg-green-400 rounded-full'></div>
											)}
										</div>
										<div className='text-xs text-gray-400'>
											Most popular Solana wallet
										</div>
									</div>
								</div>
								<ChevronRight className='w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors' />
							</div>
						</Button>

						<Button
							variant='outline'
							className='w-full h-14 bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/50 rounded-lg hover:border-gray-600 transition-all duration-300 group'
							onClick={() => setShowMoreWallets(!showMoreWallets)}
						>
							<div className='flex items-center justify-between w-full'>
								<div className='flex items-center space-x-4'>
									<div className='w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center'>
										<Wallet className='w-4 h-4 text-gray-400' />
									</div>
									<span className='text-gray-300 font-medium'>
										More Wallets
									</span>
								</div>
								<ChevronRight
									className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
										showMoreWallets ? 'rotate-90' : ''
									}`}
								/>
							</div>
						</Button>

						{showMoreWallets && (
							<div className='space-y-2 animate-in slide-in-from-top-2 duration-300'>
								{wallets.slice(1).map((wallet) => (
									<Button
										key={wallet.name}
										variant='outline'
										className='w-full h-14 bg-gray-800/30 border-gray-700/30 hover:bg-gray-800/50 hover:border-green-500/30 transition-all duration-300 group'
										onClick={() =>
											handleConnect(
												wallet.name.toLowerCase()
											)
										}
										disabled={isConnecting !== null}
									>
										<div className='flex items-center justify-between w-full'>
											<div className='flex items-center space-x-3'>
												<div className='w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center'>
													<Image
														src={
															wallet.icon ||
															'/placeholder.svg'
														}
														alt={wallet.name}
														width={20}
														height={20}
														className='rounded'
													/>
												</div>
												<div className='text-left'>
													<div className='text-white text-sm font-medium flex items-center space-x-2'>
														<span>
															{wallet.name}
														</span>
														{!wallet.installed && (
															<span className='text-xs text-blue-400 bg-blue-500/20 px-2 py-0.5 rounded-full'>
																Install
															</span>
														)}
													</div>
													<div className='text-xs text-gray-500'>
														{wallet.description}
													</div>
												</div>
											</div>
											{isConnecting ===
											wallet.name.toLowerCase() ? (
												<div className='w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin'></div>
											) : (
												<ArrowRight className='w-4 h-4 text-gray-500 group-hover:text-green-400 transition-colors' />
											)}
										</div>
									</Button>
								))}
							</div>
						)}
					</div>

					<div className='bg-gray-800/30 rounded-lg p-4 border border-gray-700/50'>
						<div className='flex items-start space-x-3'>
							<div className='w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0'>
								<Shield className='w-4 h-4 text-green-400' />
							</div>
							<div>
								<h4 className='text-white text-sm font-medium mb-1'>
									Secure Connection
								</h4>
								<p className='text-gray-400 text-xs leading-relaxed'>
									Your wallet connection is encrypted and
									secure. We never store your private keys or
									seed phrases.
								</p>
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
