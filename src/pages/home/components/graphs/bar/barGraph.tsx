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
import {
  CounterToChartModel,
  CounterToChartModelSector,
} from "../../../../../models/counterToChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarGraphProps {
  data?: CounterToChartModel | CounterToChartModelSector;
}

// Função para formatar os rótulos
const formatLabel = (label: string) => {
  // Substitui os sublinhados por espaços e capitaliza a primeira letra de cada palavra
  return label
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const BarGraph = ({ data }: BarGraphProps) => {
  const theme = useTheme();

  if (!data) return <div>Carregando...</div>;

  // Formata os rótulos
  const labels = Object.keys(data).map(formatLabel);

  return (
    <Bar
      data={{
        labels: labels,
        datasets: [
          {
            label: "Chamados",
            data: Object.values(data),
            backgroundColor: [
              theme.colors.ticket_status.open,
              theme.colors.ticket_status.waiting_approval,
              theme.colors.ticket_status.canceled,
              theme.colors.ticket_status.done,
              theme.colors.ticket_status.on_going,
              theme.colors.ticket_status.impediment,
              theme.colors.ticket_status.re_open,
            ],
            borderColor: [
              theme.colors.ticket_status.open,
              theme.colors.ticket_status.waiting_approval,
              theme.colors.ticket_status.canceled,
              theme.colors.ticket_status.done,
              theme.colors.ticket_status.on_going,
              theme.colors.ticket_status.impediment,
              theme.colors.ticket_status.re_open,
            ],
            borderWidth: 1,
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: "top",
          },

          title: {
            display: false,
            text: "Gráfico de Chamados por Status",
          },
        },

        scales: {
          x: {
            grid: {
              lineWidth: 0,
            },
            title: {
              display: false,
              text: "Status",
            },
            ticks: {
              display: true, // Garante que os rótulos formatados sejam exibidos
            },
          },
          y: {
            grid: {
              lineWidth: 0,
            },
            title: {
              display: true,
              text: "Quantidade",
            },
            beginAtZero: true,
          },
        },
      }}
    />
  );
};

export default BarGraph;
