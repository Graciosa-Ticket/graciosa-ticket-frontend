export interface SectorCardModel {
  code?: string;
  name: string;
  responsible_code: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  user: {
    code?: string;
    name?: string;
    profile_picture?: string;
  };
  counters?: {
    aberto: 6;
    aguardando_aprovacao: 1;
    cancelado: 0;
    concluido: 0;
    em_andamento: 0;
    impeditivo: 0;
    reaberto: 2;
  };
}
