import Prize from "../prize/model";

interface DrawItemResult {
  prize: {
    id: number;
    name: string;
  };
  winner: {
    id: number;
    name: string;
    phone: string;
    email: string;
  };
}

const drawService = async (campaignId: string): Promise<DrawItemResult[]> => {
  // fetch prize item ids
  // if prizes length is zero, return empty result
  const prizeIdsResult = await Prize.findIds(campaignId);
  const prizesIds = Array.isArray(prizeIdsResult)
    ? prizeIdsResult.map((item) => item.id)
    : [];
  console.log(prizesIds);

  // fetch raffle ids
  // if raffle_items length is zero, return empty result

  // declare result array

  // iterate over prizes
  // pick raffle randomly
  // assign to prize (set id to raffle_id save it in db)
  // push to result array
  // remove raffle

  return [
    {
      prize: {
        id: 0,
        name: "",
      },
      winner: {
        id: 0,
        name: "",
        phone: "",
        email: "",
      },
    },
  ];
};

export { drawService };
