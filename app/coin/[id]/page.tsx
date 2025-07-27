import {
	TokenComments,
	TokenInfo,
	TokenStats,
	TradingChart,
	TradingPanel,
} from '@/components/coin';

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const tokenId = (await params).id;
	console.log(tokenId);

	return (
		<div className='h-full w-full'>
			<div className='p-8'>
				<div className='grid grid-cols-12 gap-6'>
					<div className='col-span-3'>
						<TokenInfo />
						<TokenStats />
					</div>

					<div className='col-span-6'>
						<TradingChart />
						<TokenComments />
					</div>

					<div className='col-span-3'>
						<TradingPanel />
					</div>
				</div>
			</div>
		</div>
	);
}
