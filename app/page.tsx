import { FilterBar, TokenFeed, TrendingTokens } from '@/components/home';

export default function Home() {
	return (
		<div className='p-6 w-full'>
			<TrendingTokens />
			<FilterBar />
			<TokenFeed />
		</div>
	);
}
