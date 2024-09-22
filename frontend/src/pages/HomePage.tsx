import { CreateLotteryForm } from "@/components/CreateLotteryForm";
import { ADMIN_ADDRESS } from "@/constants/constants";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

function HomePage() {
  const { account } = useWallet();

  return (
    <div className="flex flex-col w-full px-4">
      <div className="flex justify-end items-end gap-4 pt-28">
        {account?.address === ADMIN_ADDRESS && <CreateLotteryForm />}
      </div>
    </div>
  );
}

export default HomePage;
