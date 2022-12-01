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

const drawService = (campaignId: string): DrawItemResult[] => {
  // if raffles or prize items length is zero, return empty result
  // fetch prize items
  // fetch raffles
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
