export interface Prize {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  quantity: number;
}

export interface PrizesResult {
  totalRows: number;
  data: Prize[];
}
