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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarGraphProps {
  data?: CounterToChartModel;
}

export const BarGraph = ({ data }: BarGraphProps) => {
  const theme = useTheme();

  if (!data) return <div> Carregando...</div>;

  return (
    <Bar
      data={{
        labels: Object.keys(data),
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
              display: false,
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
