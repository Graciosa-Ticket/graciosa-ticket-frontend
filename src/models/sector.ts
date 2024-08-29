import { CounterToChartModel } from "./counterToChart";

export interface SectorCardModel {
  code?: string;
  name: string;
  responsible_code: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  phone?: string;
  user: {
    code?: string;
    name?: string;
    profile_picture?: string;
  };
  counters?: CounterToChartModel;
}
