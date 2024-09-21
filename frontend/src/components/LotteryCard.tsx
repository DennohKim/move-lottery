import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
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

interface LotteryCardProps {
  lotteryId: number;
}
const LotteryCard = ({ lotteryId }: LotteryCardProps) => {
  const [ticketPrice, setTicketPrice] = useState(0);
  const [prizeAmount, setPrizeAmount] = useState(0);
  const [participantsCount, setParticipantsCount] = useState(0);
  const [winner, setWinner] = useState("");
  const [isDrawn, setIsDrawn] = useState(false);

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
    };

    fetchLotteryInfo();
    // Add functions to fetch other lottery details here
  }, [lotteryId]);

  return (
    <div className="flex flex-col text-white bg-[#141414] bg-opacity-70 border border-neutral-800 backdrop-filter backdrop-blur-sm rounded-xl shadow-md p-6 justify-between">
      <Card>
        <CardHeader>
          <CardTitle>Lottery #{lotteryId}</CardTitle>
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
              <div className="flex flex-col gap-2">
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
              <div className="flex flex-col gap-2">
                <p>Status</p>
                <p className="font-bold text-2xl">
                  {isDrawn ? "Drawn" : "Open"}
                </p>
              </div>
              {isDrawn && (
                <div className="flex flex-col gap-2">
                  <p>Winner</p>
                  <p className="font-bold text-xl break-all">{winner}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {!isDrawn ? (
            <Button variant="primary" onClick={() => {}}>
              Buy Ticket
            </Button>
          ) : (
            <p className="text-green-500 font-semibold">Lottery Ended</p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default LotteryCard;
