import { CreateLottery } from "@/components/CreateLottery";


function HomePage() {



  return (
    <div className="flex flex-col w-full px-4">
      <div className="flex justify-end items-end gap-4">
        <CreateLottery />
      </div>
      <div>
      </div>
    </div>
  );
}

export default HomePage;
