import {
  TokenComments,
  TokenInfo,
  TokenStats,
  TradingChart,
  TradingPanel,
} from "@/components/coin";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const tokenId = (await params).id;
  console.log(tokenId);

  return (
    <div className="h-full w-full">
      <div className="px-3 py-8 md:p-8">
        <div className="grid md:grid-cols-10 md:gap-6 xl:grid-cols-12">
          <div className="md:col-span-4 xl:col-span-3">
            <TokenInfo />
            <div className="mb-6 hidden xl:block">
              <TokenStats />
            </div>
          </div>

          <div className="h-fit md:col-span-6 xl:col-span-6">
            <TradingChart />
            <div className="mb-6 xl:hidden">
              <TradingPanel />
            </div>
            <TokenComments />
            <div className="mt-6 xl:hidden">
              <TokenStats />
            </div>
          </div>

          <div className="col-span-6 col-start-5 hidden xl:col-span-3 xl:block">
            <TradingPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
