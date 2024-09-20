import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PlayLotteryPage = () => {
  return (
    <div className="flex flex-col w-full px-4 font-primary">
      <Tabs defaultValue="new-lotteries" className="w-[400px] ">
        <TabsList>
          <TabsTrigger value="new-lotteries">New Lotteries</TabsTrigger>
          <TabsTrigger value="ended-lotteries">Ended Lotteries</TabsTrigger>
        </TabsList>
        <TabsContent value="new-lotteries">New Lotteries</TabsContent>
        <TabsContent value="ended-lotteries">Ended Lotteries</TabsContent>
      </Tabs>
    </div>
  );
};

export default PlayLotteryPage;
