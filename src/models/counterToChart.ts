export interface CounterToChartModel {
  aberto: number;
  aguardando_aprovacao: number;
  cancelado: number;
  concluido: number;
  em_andamento: number;
  impeditivo: number;
  reaberto: number;
}

export type CounterToChartModelSector = {
  [key: string]: CounterToChartModel;
};
