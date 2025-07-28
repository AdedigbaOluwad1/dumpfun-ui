import { FilterBar, TokenFeed, TrendingTokens } from '@/components/home';

export default function Home() {
	return (
		<div className='p-5 px-4 md:px-6 md:p-6 w-full'>
			<TrendingTokens />
			<FilterBar />
			<TokenFeed />
		</div>
	);
}
