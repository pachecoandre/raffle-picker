import PrizeModel from "../prize/model";
import RaffleModel from "../raffles/model";
import * as CampaignModel from "./model";

export interface DrawItemResult {
  prizeName: string;
  winnerName: string;
  winnerPhone: string;
}

const drawService = async (campaignId: string): Promise<DrawItemResult[]> => {
  const prizeIdsRaw = await PrizeModel.findIds(campaignId);
  const prizeIds = Array.isArray(prizeIdsRaw)
    ? prizeIdsRaw.map((item) => item.id)
    : [];

  if (prizeIds.length === 0) return [];

  const raffleIdsRaw = await RaffleModel.findIds(campaignId);
  const raffleIds = Array.isArray(raffleIdsRaw)
    ? raffleIdsRaw.map((item) => item.id)
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

  await CampaignModel.updateOne(campaignId, {
    drawDate: new Date().toISOString().split("T")[0],
  });

  const drawResult = await PrizeModel.findDrawResult(campaignId);
  return drawResult;
};

export { drawService };
