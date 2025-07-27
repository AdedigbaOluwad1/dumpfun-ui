'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
	ChevronDown,
	Upload,
	FileImage,
	Link,
	Clock,
	Heart,
	Share,
	TrendingUp,
	Users,
	DollarSign,
	X,
} from 'lucide-react';
import Image from 'next/image';

export default function CreateToken() {
	const [coinName, setCoinName] = useState('');
	const [ticker, setTicker] = useState('');
	const [description, setDescription] = useState('');
	const [website, setWebsite] = useState('');
	const [twitter, setTwitter] = useState('');
	const [telegram, setTelegram] = useState('');
	const [showSocialLinks, setShowSocialLinks] = useState(false);
	const [showBanner, setShowBanner] = useState(false);
	const [uploadedImage, setUploadedImage] = useState<string | null>(null);

	return (
		<div className='h-fit'>
			<div className='p-8'>
				<div className='max-w-7xl mx-auto'>
					<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
						<div className='lg:col-span-2 space-y-6'>
							<Card className='bg-gray-800/40 border-gray-700/50 backdrop-blur-sm shadow-xl'>
								<CardHeader className='pb-4'>
									<div className='flex items-center space-x-2'>
										<div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
										<CardTitle className='text-white text-lg'>
											Basic Information
										</CardTitle>
									</div>
									<p className='text-gray-400 text-sm'>
										Essential details for your token
									</p>
								</CardHeader>
								<CardContent className='space-y-6'>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
										<div className='space-y-3'>
											<Label className='text-gray-300 font-medium flex items-center'>
												Token Name
												<span className='text-red-400 ml-1'>
													*
												</span>
											</Label>
											<div className='relative'>
												<Input
													value={coinName}
													onChange={(e) =>
														setCoinName(
															e.target.value
														)
													}
													placeholder='e.g. Dogecoin'
													className='bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200 h-12'
												/>
												{coinName && (
													<div className='absolute right-3 top-1/2 -translate-y-1/2'>
														<div className='w-2 h-2 bg-green-400 rounded-full'></div>
													</div>
												)}
											</div>
										</div>
										<div className='space-y-3'>
											<Label className='text-gray-300 font-medium flex items-center'>
												Ticker Symbol
												<span className='text-red-400 ml-1'>
													*
												</span>
											</Label>
											<div className='relative'>
												<Input
													value={ticker}
													onChange={(e) =>
														setTicker(
															e.target.value
																.toUpperCase()
																.slice(0, 10)
														)
													}
													placeholder='e.g. DOGE'
													className='bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200 h-12'
												/>
												<div className='absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500'>
													{ticker.length}/10
												</div>
											</div>
										</div>
									</div>

									<div className='space-y-3'>
										<Label className='text-gray-300 font-medium'>
											Description
										</Label>
										<div className='relative'>
											<Textarea
												value={description}
												onChange={(e) =>
													setDescription(
														e.target.value.slice(
															0,
															500
														)
													)
												}
												placeholder='Tell the world about your token. What makes it special? What problem does it solve?'
												className='bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200 min-h-[120px] resize-none'
											/>
											<div className='absolute bottom-3 right-3 text-xs text-gray-500'>
												{description.length}/500
											</div>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className='bg-gray-800/40 border-gray-700/50 backdrop-blur-sm shadow-xl'>
								<CardHeader className='pb-4'>
									<div className='flex items-center space-x-2'>
										<FileImage className='w-5 h-5 text-green-400' />
										<CardTitle className='text-white text-lg'>
											Token Image
										</CardTitle>
									</div>
									<p className='text-gray-400 text-sm'>
										Upload an eye-catching image for your
										token
									</p>
								</CardHeader>
								<CardContent>
									<div className='relative'>
										<div className='border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-green-500 transition-all duration-300 bg-gray-900/30 hover:bg-gray-900/50 group'>
											{uploadedImage ? (
												<div className='relative'>
													<Image
														src={
															uploadedImage ||
															'/placeholder.svg'
														}
														alt='Token preview'
														width={120}
														height={120}
														className='mx-auto rounded-xl shadow-lg'
													/>
													<Button
														size='sm'
														variant='ghost'
														className='absolute -top-2 -right-2 w-6 h-6 p-0 bg-red-500 hover:bg-red-600 text-white rounded-full'
														onClick={() =>
															setUploadedImage(
																null
															)
														}
													>
														<X className='w-3 h-3' />
													</Button>
												</div>
											) : (
												<div className='space-y-4'>
													<div className='mx-auto w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center group-hover:from-green-500/20 group-hover:to-green-600/20 transition-all duration-300'>
														<Upload className='w-8 h-8 text-gray-400 group-hover:text-green-400 transition-colors' />
													</div>
													<div>
														<Button
															variant='outline'
															className='border-gray-600 text-gray-300 bg-transparent hover:bg-green-500/10 hover:border-green-500 hover:text-green-400 transition-all duration-200'
														>
															<Upload className='w-4 h-4 mr-2' />
															Choose Image
														</Button>
														<p className='text-sm text-gray-500 mt-3'>
															PNG, JPG, GIF up to
															10MB
														</p>
														<p className='text-xs text-gray-600'>
															Recommended:
															1000x1000px (1:1
															ratio)
														</p>
													</div>
												</div>
											)}
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className='bg-gray-800/40 border-gray-700/50 backdrop-blur-sm shadow-xl'>
								<CardHeader className='pb-4'>
									<CardTitle className='text-white text-lg'>
										Advanced Options
									</CardTitle>
									<p className='text-gray-400 text-sm'>
										Optional settings to enhance your token
									</p>
								</CardHeader>
								<CardContent className='space-y-6'>
									{/* Social Links */}
									<div className='space-y-4'>
										<Button
											type='button'
											variant='ghost'
											onClick={() =>
												setShowSocialLinks(
													!showSocialLinks
												)
											}
											className='text-gray-300 hover:text-white hover:bg-gray-700/50 p-3 w-full justify-start rounded-lg transition-all duration-200'
										>
											<Link className='w-5 h-5 mr-3 text-green-400' />
											<span className='flex-1 text-left'>
												Social Links
											</span>
											<ChevronDown
												className={`w-4 h-4 transition-transform duration-200 ${
													showSocialLinks
														? 'rotate-180'
														: ''
												}`}
											/>
										</Button>

										{showSocialLinks && (
											<div className='space-y-4 pl-8 border-l-2 border-green-500/30 animate-in slide-in-from-top-2 duration-300'>
												<div className='space-y-3'>
													<Label className='text-gray-300 font-medium'>
														Website
													</Label>
													<Input
														value={website}
														onChange={(e) =>
															setWebsite(
																e.target.value
															)
														}
														placeholder='https://yourwebsite.com'
														className='bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200'
													/>
												</div>
												<div className='space-y-3'>
													<Label className='text-gray-300 font-medium'>
														Twitter
													</Label>
													<Input
														value={twitter}
														onChange={(e) =>
															setTwitter(
																e.target.value
															)
														}
														placeholder='https://twitter.com/yourtoken'
														className='bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200'
													/>
												</div>
												<div className='space-y-3'>
													<Label className='text-gray-300 font-medium'>
														Telegram
													</Label>
													<Input
														value={telegram}
														onChange={(e) =>
															setTelegram(
																e.target.value
															)
														}
														placeholder='https://t.me/yourtoken'
														className='bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200'
													/>
												</div>
											</div>
										)}
									</div>

									<div className='space-y-4'>
										<Button
											type='button'
											variant='ghost'
											onClick={() =>
												setShowBanner(!showBanner)
											}
											className='text-gray-300 hover:text-white hover:bg-gray-700/50 p-3 w-full justify-start rounded-lg transition-all duration-200'
										>
											<FileImage className='w-5 h-5 mr-3 text-green-400' />
											<span className='flex-1 text-left'>
												Banner Image
											</span>
											<ChevronDown
												className={`w-4 h-4 transition-transform duration-200 ${
													showBanner
														? 'rotate-180'
														: ''
												}`}
											/>
										</Button>

										{showBanner && (
											<div className='pl-8 border-l-2 border-green-500/30 animate-in slide-in-from-top-2 duration-300'>
												<div className='border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-green-500 transition-all duration-300 bg-gray-900/30'>
													<Upload className='w-10 h-10 text-gray-400 mx-auto mb-3' />
													<Button
														variant='outline'
														className='border-gray-600 text-gray-300 bg-transparent hover:bg-green-500/10 hover:border-green-500 hover:text-green-400'
													>
														Upload Banner
													</Button>
													<p className='text-sm text-gray-500 mt-2'>
														PNG, JPG up to 5MB
													</p>
													<p className='text-xs text-gray-600'>
														Recommended: 1200x400px
													</p>
												</div>
											</div>
										)}
									</div>
								</CardContent>
							</Card>

							<div className='bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6 backdrop-blur-sm'>
								<div className='flex items-start space-x-4'>
									<div className='w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0'>
										<Clock className='w-5 h-5 text-yellow-400' />
									</div>
									<div>
										<h3 className='text-yellow-200 font-semibold mb-2'>
											Important Notice
										</h3>
										<p className='text-yellow-300/80 text-sm leading-relaxed'>
											Token details cannot be modified
											after creation. Please review all
											information carefully. The creation
											process is irreversible and costs
											0.1 SOL.
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className='lg:col-span-1'>
							<div className='sticky top-8 space-y-6'>
								<Card className='bg-gray-800/40 border-gray-700/50 backdrop-blur-sm shadow-xl'>
									<CardHeader className='pb-4'>
										<div className='flex items-center space-x-2'>
											<div className='w-2 h-2 bg-blue-400 rounded-full animate-pulse'></div>
											<CardTitle className='text-white text-lg'>
												Live Preview
											</CardTitle>
										</div>
										<p className='text-gray-400 text-sm'>
											See how your token will appear
										</p>
									</CardHeader>
									<CardContent>
										<div className='bg-gray-900/50 rounded-xl p-6 border border-gray-700/50'>
											<div className='flex items-start space-x-4 mb-6'>
												<div className='w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg'>
													{uploadedImage ? (
														<Image
															src={
																uploadedImage ||
																'/placeholder.svg'
															}
															alt='Token'
															width={64}
															height={64}
															className='rounded-xl'
														/>
													) : (
														<span className='text-2xl'>
															🪙
														</span>
													)}
												</div>

												<div className='flex-1 min-w-0'>
													<div className='flex items-center space-x-2 mb-2'>
														<h3 className='text-lg font-bold text-white truncate'>
															{coinName ||
																'Your Token Name'}
														</h3>
														<Badge className='bg-green-500/20 text-green-400 border-green-500/30 text-xs'>
															NEW
														</Badge>
													</div>
													<p className='text-gray-400 text-sm mb-1'>
														{ticker || 'TICKER'}
													</p>
													<div className='flex items-center space-x-2 text-xs text-gray-500'>
														<span>created now</span>
														<span>•</span>
														<span>0 replies</span>
													</div>
												</div>

												<div className='flex flex-col space-y-2'>
													<Button
														size='sm'
														variant='ghost'
														className='w-8 h-8 p-0 hover:bg-pink-500/20 hover:text-pink-400'
													>
														<Heart className='w-4 h-4' />
													</Button>
													<Button
														size='sm'
														variant='ghost'
														className='w-8 h-8 p-0 hover:bg-blue-500/20 hover:text-blue-400'
													>
														<Share className='w-4 h-4' />
													</Button>
												</div>
											</div>

											{description && (
												<div className='mb-6'>
													<p className='text-gray-300 text-sm leading-relaxed line-clamp-3'>
														{description}
													</p>
												</div>
											)}

											<div className='grid grid-cols-2 gap-4 mb-6'>
												<div className='bg-gray-800/50 rounded-lg p-3 text-center'>
													<div className='flex items-center justify-center space-x-1 mb-1'>
														<DollarSign className='w-4 h-4 text-green-400' />
														<span className='text-lg font-bold text-white'>
															$0
														</span>
													</div>
													<div className='text-xs text-gray-400'>
														Market Cap
													</div>
												</div>
												<div className='bg-gray-800/50 rounded-lg p-3 text-center'>
													<div className='flex items-center justify-center space-x-1 mb-1'>
														<Users className='w-4 h-4 text-blue-400' />
														<span className='text-lg font-bold text-white'>
															0
														</span>
													</div>
													<div className='text-xs text-gray-400'>
														Holders
													</div>
												</div>
											</div>

											<div className='mb-4'>
												<div className='flex justify-between text-xs text-gray-400 mb-2'>
													<span>
														Bonding Progress
													</span>
													<span>0%</span>
												</div>
												<div className='w-full bg-gray-700 rounded-full h-2'>
													<div className='bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full w-0 transition-all duration-300'></div>
												</div>
											</div>

											<Button className='w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg'>
												<TrendingUp className='w-4 h-4 mr-2' />
												Trade
											</Button>
										</div>

										{(website || twitter || telegram) && (
											<div className='mt-4 p-4 bg-gray-900/30 rounded-lg border border-gray-700/30'>
												<h4 className='text-white font-medium mb-3 text-sm'>
													Social Links
												</h4>
												<div className='space-y-2'>
													{website && (
														<div className='flex items-center space-x-2 text-xs'>
															<div className='w-2 h-2 bg-blue-400 rounded-full'></div>
															<span className='text-gray-400'>
																Website
															</span>
														</div>
													)}
													{twitter && (
														<div className='flex items-center space-x-2 text-xs'>
															<div className='w-2 h-2 bg-blue-400 rounded-full'></div>
															<span className='text-gray-400'>
																Twitter
															</span>
														</div>
													)}
													{telegram && (
														<div className='flex items-center space-x-2 text-xs'>
															<div className='w-2 h-2 bg-blue-400 rounded-full'></div>
															<span className='text-gray-400'>
																Telegram
															</span>
														</div>
													)}
												</div>
											</div>
										)}
									</CardContent>
								</Card>

								<Card className='bg-gray-800/40 border-gray-700/50 backdrop-blur-sm shadow-xl'>
									<CardContent className='p-4'>
										<div className='text-center'>
											<div className='text-2xl font-bold text-white mb-1'>
												{coinName && ticker
													? '✅'
													: '⏳'}
											</div>
											<div className='text-sm text-gray-400'>
												{coinName && ticker
													? 'Ready to Launch'
													: 'Fill Required Fields'}
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
