export interface Raffle {
  id: number;
  participantName: string;
  participantPhone: string;
  participantEmail: string;
  sellerName: string;
  date: string;
}

export interface RafflesResult {
  totalRows: number;
  data: Raffle[];
}
