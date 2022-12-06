import PrizeModel from "../prize/model";
import RaffleModel from "../raffles/model";

interface DrawItemResult {
  prize: {
    id: number;
    name?: string;
  };
  winner: {
    id: number;
    name?: string;
    phone?: string;
    email?: string;
  };
}

const drawService = async (campaignId: string): Promise<DrawItemResult[]> => {
  // fetch prize item ids
  const prizeIdsResult = await PrizeModel.findIds(campaignId);
  const prizeIds = Array.isArray(prizeIdsResult)
    ? prizeIdsResult.map((item) => item.id)
    : [];

  if (prizeIds.length === 0) return [];

  // fetch raffle ids
  const raffleIdsResult = await RaffleModel.findIds(campaignId);
  const raffleIds = Array.isArray(raffleIdsResult)
    ? raffleIdsResult.map((item) => item.id)
    : [];
    
  if (raffleIds.length === 0) return [];

  const result = [];

  if (raffleIds.length < prizeIds.length) return [];

  Math.round(raffleIds.length * Math.random());

  prizeIds.forEach((prizeId) => {
    const pickedIndex = Math.round((raffleIds.length - 1) * Math.random());
    const [pickedRaffleId] = raffleIds.splice(pickedIndex, 1);

    result.push({
      prize: { id: prizeId },
      winner: { id: pickedRaffleId },
    });
  });

  // iterate over prizes
  // pick raffle randomly
  // assign to prize (set id to raffle_id save it in db)
  // push to result array
  // remove raffle

  return result;
};

export { drawService };
