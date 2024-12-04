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
import NotFoundComponent from "../../../../../components/notFound";

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

const formatLabel = (label: string) => {
  const formattedLabel = label.replace(/_/g, " ").toLowerCase();

  const capitalizedLabel =
    formattedLabel.charAt(0).toUpperCase() + formattedLabel.slice(1);

  return capitalizedLabel
    .replace(/Aguardando aprovacao/g, "Aguardando aprovação")
    .replace(/Em andamento/g, "Em andamento")
    .replace(/Impeditivo/g, "Impeditivo")
    .replace(/Reaberto/g, "Reaberto");
};

export const BarGraph = ({ data }: BarGraphProps) => {
  const theme = useTheme();

  if (!data) {
    return <NotFoundComponent message="Nenhum dado encontrado" />;
  }

  const labels = Object.keys(data).map(formatLabel);
  const dataValues = Object.values(data);

  const colors = [
    theme.colors.ticket_status.open,
    theme.colors.ticket_status.waiting_approval,
    theme.colors.ticket_status.canceled,
    theme.colors.ticket_status.done,
    theme.colors.ticket_status.on_going,
    theme.colors.ticket_status.impediment,
    theme.colors.ticket_status.re_open,
  ].slice(0, labels.length);

  return (
    <Bar
      data={{
        labels: labels,
        datasets: [
          {
            label: "Chamados",
            data: dataValues,
            backgroundColor: colors,
            borderColor: colors,
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
              display: true,
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
