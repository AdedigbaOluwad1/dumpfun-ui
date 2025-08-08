import { FilterBar, TokenFeed, TrendingTokens } from "@/components/home";
import dumpfunApi from "@/lib/utils";
import { iApiResponse } from "@/types";
import { iCoin, iPaginatedResponse, iRunner } from "@/types/onchain-data";

export default async function Home() {
  const [tokenFeedData, runners] = await Promise.all([
    dumpfunApi.get<iApiResponse<iPaginatedResponse<iCoin>>>(
      "/onchain-data/coins",
    ),
    dumpfunApi.get<iApiResponse<iRunner[]>>("/onchain-data/runners"),
  ]);

  return (
    <div className="w-full p-5 px-4 md:p-6 md:px-6">
      <TrendingTokens data={runners.data.data} />
      <FilterBar />
      <TokenFeed data={tokenFeedData.data.data} />
    </div>
  );
}
