import { TrendingSection } from '../components/trending-section';
import { TokenFeed } from '../components/token-feed';
import { FilterBar } from '../components/filter-bar';

export default function Home() {
	return (
		<div className='p-6 w-full'>
			<TrendingSection />
			<FilterBar />
			<TokenFeed />
		</div>
	);
}
