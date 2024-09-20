import { MODULE_ADDRESS } from "@/constants/constants";
import { aptosClient } from "@/utils/aptosClient";

export const getTicketPrice = async (): Promise<boolean> => {
  try {
    const ticketPrice = await aptosClient().view<[boolean]>({
      payload: {
        function: `${MODULE_ADDRESS}::lottery::get_ticket_price`,
        functionArguments: [],
      },
    });

    return ticketPrice[0];
  } catch (error: any) {
    return false;
  }
};
