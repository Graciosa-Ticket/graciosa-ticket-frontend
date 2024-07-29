export interface CounterToChartModel {
  [key: string]: {
    aberto: number;
    aguardando_aprovacao: number;
    cancelado: number;
    concluido: number;
    em_andamento: number;
    impeditivo: number;
    reaberto: number;
  };
}
