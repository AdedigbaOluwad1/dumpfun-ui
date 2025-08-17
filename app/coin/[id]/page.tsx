import {
  TokenComments,
  TokenInfo,
  TradingChart,
  TradingPanel,
} from "@/components/coin";
import dumpfunApi from "@/lib/utils";
import { iApiResponse } from "@/types";
import { iCoin } from "@/types/onchain-data";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const tokenId = (await params).id;

  const [{ data: coin }] = await Promise.all([
    dumpfunApi.get<iApiResponse<iCoin>>(`/onchain-data/coin/${tokenId}`),
  ]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="mx-auto w-full max-w-[1500px] px-3 py-8 md:p-8">
        <TokenInfo coin={coin.data} />

        <div className="flex w-full flex-wrap gap-8">
          <div className="h-fit flex-1">
            <TradingChart coin={coin.data} />
            <div className="mb-6 lg:hidden">
              <TradingPanel coin={coin.data} />
            </div>
            <TokenComments />
          </div>

          <div className="hidden basis-[360px] lg:block">
            <TradingPanel coin={coin.data} />
          </div>
        </div>
      </div>
    </div>
  );
}
