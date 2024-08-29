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
  // Substitui sublinhados por espaços e capitaliza a primeira letra de cada palavra
  const formattedLabel = label
    .replace(/_/g, " ") // Substitui sublinhados por espaços
    .toLowerCase(); // Converte tudo para minúsculas inicialmente

  // Capitaliza apenas a primeira letra da primeira palavra
  const capitalizedLabel =
    formattedLabel.charAt(0).toUpperCase() + formattedLabel.slice(1);

  // Corrige casos específicos de acentuação e pontuação
  return capitalizedLabel
    .replace(/Aguardando aprovacao/g, "Aguardando aprovação") // Substitui 'Aguardando aprovacao' por 'Aguardando Aprovação'
    .replace(/Em andamento/g, "Em andamento") // Substitui 'Em andamento' por 'Em Andamento'
    .replace(/Impeditivo/g, "Impeditivo") // Certifica-se de que a palavra é corretamente formatada
    .replace(/Reaberto/g, "Reaberto"); // Certifica-se de que a palavra é corretamente formatada
};

export const BarGraph = ({ data }: BarGraphProps) => {
  const theme = useTheme();

  if (!data) {
    return <NotFoundComponent message="Nenhum dado encontrado" />;
  }

  // Formata os rótulos e extrai as cores
  const labels = Object.keys(data).map(formatLabel);
  const dataValues = Object.values(data);

  // Certifique-se de que há uma cor para cada rótulo
  const colors = [
    theme.colors.ticket_status.open,
    theme.colors.ticket_status.waiting_approval,
    theme.colors.ticket_status.canceled,
    theme.colors.ticket_status.done,
    theme.colors.ticket_status.on_going,
    theme.colors.ticket_status.impediment,
    theme.colors.ticket_status.re_open,
  ].slice(0, labels.length); // Ajusta o tamanho das cores para o número de rótulos

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
