import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LotteryList from "@/components/LotteryList";

const PlayLotteryPage = () => {
  return (
    <div className="flex flex-col w-full px-4 font-primary pt-28">
      <Tabs defaultValue="new-lotteries" className=" ">
        <TabsList>
          <TabsTrigger value="new-lotteries">New Lotteries</TabsTrigger>
          <TabsTrigger value="ended-lotteries">Ended Lotteries</TabsTrigger>
        </TabsList>
        <TabsContent value="new-lotteries">
          <LotteryList status="new" />
        </TabsContent>
        <TabsContent value="ended-lotteries">
          <LotteryList status="ended" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlayLotteryPage;
