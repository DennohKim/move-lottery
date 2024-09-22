import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getIsLotteryDrawn } from "@/view-functions/getIsLotteryDrawn";
import { getTicketPrice } from "@/view-functions/getTicketPrice";
import { getParticipantsCount } from "@/view-functions/getParticipantsCount";
import { getPrizeAmount } from "@/view-functions/getPrizeAmount";
import { getWinner } from "@/view-functions/getWinner";
import { formatApt } from "@/lib/utils";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { buyLotteryTicket } from "@/entry-functions/BuyTicket";
import { useToast } from "@/hooks/use-toast";
import { ADMIN_ADDRESS } from "@/constants/constants";
import { drawWinner } from "@/entry-functions/drawWinner";
import { getLotteryEndTime } from "@/view-functions/getLotteryEndTime";
import { formatDistanceToNowStrict, isPast } from "date-fns";

interface LotteryCardProps {
  lotteryId: number;
}
const LotteryCard = ({ lotteryId }: LotteryCardProps) => {
  const [ticketPrice, setTicketPrice] = useState(0);
  const [prizeAmount, setPrizeAmount] = useState(0);
  const [participantsCount, setParticipantsCount] = useState(0);
  const [lotteryEndTime, setLotteryEndTime] = useState(0);
  const [remainingTime, setRemainingTime] = useState("");
  const [isEnded, setIsEnded] = useState(false);

  const [winner, setWinner] = useState("");
  const [isDrawn, setIsDrawn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const { signAndSubmitTransaction, account } = useWallet();

  const isAdmin = account?.address === ADMIN_ADDRESS;

  useEffect(() => {
    const fetchLotteryInfo = async () => {
      const drawn = await getIsLotteryDrawn(lotteryId);
      setIsDrawn(drawn);
      console.log(drawn);

      const price = await getTicketPrice();
      setTicketPrice(price);

      const participantsCount = await getParticipantsCount(lotteryId);
      setParticipantsCount(participantsCount);

      const prizeAmount = await getPrizeAmount(lotteryId);
      setPrizeAmount(prizeAmount);

      const winner = await getWinner(lotteryId);
      setWinner(winner);

      const endTime = await getLotteryEndTime(lotteryId);
      setLotteryEndTime(endTime);
    };

    fetchLotteryInfo();
    // Add functions to fetch other lottery details here
  }, [lotteryId]);

  useEffect(() => {
    if (lotteryEndTime) {
      const timer = setInterval(() => {
        const endDate = new Date(lotteryEndTime * 1000);
        if (isPast(endDate)) {
          setIsEnded(true);
          setRemainingTime("Ended");
          clearInterval(timer);
        } else {
          setRemainingTime(
            formatDistanceToNowStrict(endDate, { addSuffix: true })
          );
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [lotteryEndTime]);

  const handleBuyTicket = async () => {
    setIsLoading(true);
    try {
      const payload = buyLotteryTicket({ lotteryId });
      await signAndSubmitTransaction(payload);
      toast({
        description: "Ticket purchased successfully!",
        variant: "success",
      });
      //Refresh lottery info after successful purchase
      const newParticipantsCount = await getParticipantsCount(lotteryId);
      setParticipantsCount(newParticipantsCount);
      const newPrizeAmount = await getPrizeAmount(lotteryId);
      setPrizeAmount(newPrizeAmount);
    } catch (error: any) {
      console.error("Error buying ticket:", error);
      toast({
        description: `Error buying ticket: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrawWinner = async () => {
    setIsLoading(true);
    try {
      const payload = drawWinner({ lotteryId });
      await signAndSubmitTransaction(payload);
      toast({ description: "Winner drawn successfully!", variant: "success" });
      // Refresh lottery info after drawing winner
      const drawn = await getIsLotteryDrawn(lotteryId);
      setIsDrawn(drawn);
      if (drawn) {
        const winner = await getWinner(lotteryId);
        setWinner(winner);
      }
    } catch (error: any) {
      console.error("Error drawing winner:", error);
      toast({
        description: `Error drawing winner: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col text-white bg-[#141414] bg-opacity-70 border border-neutral-800 backdrop-filter backdrop-blur-sm rounded-xl shadow-md p-6 justify-between">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Lottery #{lotteryId}
          </CardTitle>
          <CardDescription className="text-sm text-neutral-400">
            Ends: {remainingTime}
          </CardDescription>{" "}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-row  justify-between gap-4">
              <div className="flex flex-col gap-2">
                <p>Ticket Price</p>
                <p className="font-bold text-2xl">
                  {formatApt(ticketPrice)} APT
                </p>
              </div>
              <div className="flex flex-col justify-end items-end gap-2">
                <p>Prize Amount</p>
                <p className="font-bold text-2xl">
                  {formatApt(prizeAmount)} APT
                </p>
              </div>
            </div>

            <div className="flex flex-row justify-between gap-4">
              <div className="flex flex-col gap-2">
                <p>Participants</p>
                <p className="font-bold text-2xl">{participantsCount}</p>
              </div>
              <div className="flex flex-col justify-end items-end gap-2">
                <p>Status</p>
                <p
                  className={`font-bold ${
                    isDrawn
                      ? "text-red-500 bg-red-500/30 px-4 py-1 rounded-full"
                      : "text-green-500 bg-green-500/30 px-4 py-1 rounded-full"
                  }`}
                >
                  {isDrawn ? "Drawn" : "Open"}
                </p>
              </div>
            </div>

            {isDrawn && (
              <div className="flex flex-col gap-2">
                <p>Winner</p>
                <p className="font-bold text-xl break-all">{winner}</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          {!isDrawn ? (
            <div className="flex flex-row justify-between items-center">
              <Button
                variant="primary"
                onClick={handleBuyTicket}
                disabled={isLoading || isEnded}
              >
                {isLoading
                  ? "Buying..."
                  : isEnded
                  ? "Lottery Ended"
                  : "Buy Ticket"}
              </Button>
              {isAdmin && (
                <Button
                  variant="secondary"
                  onClick={handleDrawWinner}
                  disabled={isLoading || participantsCount === 0 || !isEnded}
                  className="ml-2 rounded-full"
                >
                  {isLoading ? "Drawing..." : "Draw Winner"}
                </Button>
              )}
            </div>
          ) : (
            <p className="text-red-500 font-semibold">Lottery Ended</p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default LotteryCard;
