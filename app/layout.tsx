import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { Header, Sidebar } from '@/components/sections';
import { ScrollArea } from '@/components/ui/scroll-area';

const nunito = Nunito({
	variable: '--font-nunito',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Dumpfun',
	description:
		'A chaotic crypto playground where memes, market madness, and volatility collide — chart, trade, and vibe like it’s all a joke... until it isn’t.',
	icons: {
		icon: '/pepe.png',
		shortcut: '/pepe.png',
		apple: '/pepe.png',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={` ${nunito.variable} antialiased dark grid bg-gray-950 w-screen h-screen grid-cols-[16rem_1fr]`}
			>
				<Sidebar />
				<main className='grid grid-rows-[4.5rem_1fr] w-full h-screen overflow-hidden'>
					<Header />
					<div className='flex h-full px-0.5 py-1 w-full overflow-hidden'>
						<ScrollArea className='h-full flex-1 overflow-auto'>
							{children}
						</ScrollArea>
					</div>
				</main>
			</body>
		</html>
	);
}
