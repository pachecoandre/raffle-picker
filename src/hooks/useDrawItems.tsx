import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDrawResult } from "../client";
import { DrawResult } from "../client/types";

const useWinners = () => {
  const { campaignId = "" } = useParams();
  const [winners, setWinners] = useState<DrawResult[]>([]);

  useEffect(() => {
    getDrawResult(campaignId).then((result) => {
      setWinners(result);
    });
  }, []);

  return winners;
};

export default useWinners;
