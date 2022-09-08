export interface Csvdata {
  success: boolean;
  data?: (DataEntity)[] | null;
}
export interface DataEntity {
  id: number;
  name: string;
  state: string;
  zip: number;
  amount: number;
  qty: number;
  item: string
}

