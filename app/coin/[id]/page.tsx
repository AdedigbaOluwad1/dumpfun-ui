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
        <div className="grid md:gap-6 md:grid-cols-10 xl:grid-cols-12">
          <div className="md:col-span-4 xl:col-span-3">
            <TokenInfo />
            <TokenStats />
          </div>

          <div className="h-fit md:col-span-6 xl:col-span-6">
            <TradingChart />
            <TokenComments />
            <div className="mt-6 xl:hidden">
              <TradingPanel />
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
