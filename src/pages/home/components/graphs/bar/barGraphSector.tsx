import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useTheme } from "styled-components";
import { CounterToChartModel } from "../../../../../models/counterToChart";
import { SectorCardModel } from "../../../../../models/sector";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type SectorGraphData = CounterToChartModel & {
  sector_code?: string;
  [key: string]: number | string | undefined;
};

interface SectorBarGraphProps {
  data?: SectorGraphData[];
  sectorsListData: SectorCardModel[];
}

const SectorBarGraph = ({ data, sectorsListData }: SectorBarGraphProps) => {
  const theme = useTheme();

  if (!data || data.length === 0) return <div>Carregando...</div>;

  const statuses = [
    "aberto",
    "aguardando_aprovacao",
    "cancelado",
    "concluido",
    "em_andamento",
    "impeditivo",
    "reaberto",
  ];

  const backgroundColor = [
    theme.colors.ticket_status.open,
    theme.colors.ticket_status.waiting_approval,
    theme.colors.ticket_status.canceled,
    theme.colors.ticket_status.done,
    theme.colors.ticket_status.on_going,
    theme.colors.ticket_status.impediment,
    theme.colors.ticket_status.re_open,
  ];

  const borderColor = backgroundColor;

  const labels = data.map((item) => {
    const sector = sectorsListData.find(
      (sector) => sector.code === item.sector_code
    );
    return sector?.name || "Desconhecido";
  });

  const datasets = statuses.map((status, index) => ({
    label: status,
    data: data.map((sector) => sector[status] || 0),
    backgroundColor: backgroundColor[index],
    borderColor: borderColor[index],
    borderWidth: 1,
    barThickness: 15,
    borderRadius: 3,
    borderSkipped: false,
    categoryPercentage: 0.2,
    barPercentage: 0.8,
  }));

  return (
    <Bar
      data={{
        labels: labels,
        datasets: datasets,
      }}
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: false,
            text: "Gráfico de Chamados por Status",
          },
        },
        scales: {
          x: {
            grid: {
              lineWidth: 6,
            },
            title: {
              display: true,
              text: "Setores",
            },
            ticks: {
              display: true,
            },
            stacked: false,
          },
          y: {
            grid: {
              lineWidth: 0,
            },
            title: {
              display: false,
              text: "Quantidade",
            },
            beginAtZero: true,
          },
        },
      }}
    />
  );
};

export default SectorBarGraph;
