import axios from "axios";
import { PrizesResult } from "../pages/Prizes/types";
import { RafflesResult } from "../pages/Raffles/types";
import { RafflePayload } from "../pages/NewRaffle/types";
import { PrizePayload } from "../pages/NewPrize/types";
import { CampaignPayload } from "../pages/NewCampaign/types";
import { ICampaign } from "../pages/Campaign/types";
import { DrawResult } from "./types";

const client = axios.create({ baseURL: "http://localhost:8000/v1" });

client.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response.status === 404) {
      window.location.href = "/not-found";
    }
    if (error.response.status === 401) {
      throw error;
    }
  }
);

const login = async (googleToken: string) => {
  const { data } = await client.post("/users/login", { googleToken });
  client.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
  localStorage.setItem("t", data.token);
  return data;
};

const verifyToken = async (token: string) => {
  return client.post("/users/verify-token", { token });
};

const getCampaigns = async () => {
  const { data } = await client.get("/campaigns");
  return data;
};

const getCampaign = async (campaignId: string = ""): Promise<ICampaign> => {
  const { data } = await client.get(`/campaigns/${campaignId}`);
  return data;
};

const createCampaign = async (payload: CampaignPayload) => {
  const { data } = await client.post("/campaigns", payload);
  return data;
};

const updateCampaign = async (campaignId: string, payload: CampaignPayload) => {
  const { data } = await client.patch(`/campaigns/${campaignId}`, payload);
  return data;
};

const getRaffles = async (
  campaignId: string,
  page: number,
  limit: number
): Promise<RafflesResult> => {
  const { data } = await client.get(
    `/campaigns/${campaignId}/raffles?page=${page}&limit=${limit}`
  );
  return data;
};

const createRaffles = async (campaignId: string, payload: RafflePayload) => {
  client.post(`/campaigns/${campaignId}/raffles`, payload);
};

const deleteRaffle = async (campaignId: string, id: number) => {
  client.delete(`/campaigns/${campaignId}/raffles/${id}`);
};

const getPrizes = async (
  campaignId: string,
  page: number,
  limit: number
): Promise<PrizesResult> => {
  const { data } = await client.get(
    `/campaigns/${campaignId}/prizes?page=${page}&limit=${limit}`
  );
  return data;
};

const createPrize = async (campaignId: string, payload: PrizePayload) => {
  client.post(`/campaigns/${campaignId}/prizes`, payload);
};

const deletePrize = async (campaignId: string, prizeId: number) => {
  client.delete(`/campaigns/${campaignId}/prizes/${prizeId}`);
};

const draw = async (campaignId: string) => {
  client.post(`/campaigns/${campaignId}/draw`);
};

const getDrawResult = async (campaignId: string): Promise<DrawResult[]> => {
  const { data } = await client.get(`/campaigns/${campaignId}/draw`);
  return data;
};

const getSellers = getRaffles;

export {
  client,
  login,
  verifyToken,
  getCampaign,
  getCampaigns,
  createCampaign,
  updateCampaign,
  getRaffles,
  createRaffles,
  deleteRaffle,
  getPrizes,
  createPrize,
  deletePrize,
  getSellers,
  draw,
  getDrawResult,
};
