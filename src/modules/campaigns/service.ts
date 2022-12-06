import PrizeModel from "../prize/model";
import RaffleModel from "../raffles/model";
import { updateOne } from "./model";

export interface DrawItemResult {
  prizeName: string;
  winnerName: string;
  winnerPhone: string;
}

const drawService = async (campaignId: string): Promise<DrawItemResult[]> => {
  const prizeIdsResult = await PrizeModel.findIds(campaignId);
  const prizeIds = Array.isArray(prizeIdsResult)
    ? prizeIdsResult.map((item) => item.id)
    : [];

  if (prizeIds.length === 0) return [];

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
      prizeId,
      raffleId: pickedRaffleId,
    });
  });

  const prizeItemsBulkUpdate = [];
  for (const item of result) {
    prizeItemsBulkUpdate.push(
      PrizeModel.updatePrizeItem(item.prizeId, item.raffleId)
    );
  }
  await Promise.all(prizeItemsBulkUpdate);

  await updateOne(campaignId, {
    drawDate: new Date().toISOString().split("T")[0],
  });

  const drawResult = await PrizeModel.findDrawResult(campaignId);
  return drawResult;
};

export { drawService };
