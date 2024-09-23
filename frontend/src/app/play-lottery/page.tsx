"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LotteryList from "@/components/LotteryList";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { ADMIN_ADDRESS } from "@/constants/constants";
import { CreateLotteryForm } from "@/components/CreateLotteryForm";

const PlayLotteryPage = () => {
  const { account } = useWallet();

  return (
    <div className="flex min-h-screen w-full flex-col pt-28 font-primary">
      <div className="flex flex-col sm:gap-4 sm:py-4 ">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="new-lotteries">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="new-lotteries">New Lotteries</TabsTrigger>
                <TabsTrigger value="ended-lotteries">
                  Ended Lotteries
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <div>
                  {account?.address === ADMIN_ADDRESS && <CreateLotteryForm />}
                </div>
              </div>
            </div>
            <TabsContent value="new-lotteries">
              <LotteryList status="new" />
            </TabsContent>
            <TabsContent value="ended-lotteries">
              <LotteryList status="ended" />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default PlayLotteryPage;
