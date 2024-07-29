import {
  Chart as C,
  ChartOptions,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { useFetch } from "../../../../../services/hooks/getQuery";
import { useTheme } from "styled-components";

C.register(
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale
);

interface CounterData {
  aberto: number;
  aguardando_aprovacao: number;
  cancelado: number;
  concluido: number;
  em_andamento: number;
  impeditivo: number;
  reaberto: number;
}

type CounterToChartModel = Record<string, CounterData>;

export const LineGraph = () => {
  const [dataSource, setDataSource] = useState<CounterToChartModel | null>(
    null
  );
  const theme = useTheme();

  const { data } = useFetch<CounterToChartModel[]>(
    "/counters/CounterToChart/AllSectors",
    ["AllCounters"],
    {
      onSuccess: (data) => {
        setDataSource(data[0]);
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  useEffect(() => {
    if (data) {
      setDataSource(data[0]);
    }
  }, [data]);

  if (!dataSource) return <div> Carregando...</div>;

  const labels = Object.keys(dataSource);
  const datasetNames: (keyof CounterData)[] = [
    "aberto",
    "aguardando_aprovacao",
    "cancelado",
    "concluido",
    "em_andamento",
    "impeditivo",
    "reaberto",
  ];

  const colors = [
    theme.colors.ticket_status.open,
    theme.colors.ticket_status.waiting_approval,
    theme.colors.ticket_status.canceled,
    theme.colors.ticket_status.done,
    theme.colors.ticket_status.on_going,
    theme.colors.ticket_status.impediment,
    theme.colors.ticket_status.re_open,
  ];

  const datasets = datasetNames.map((name, index) => {
    return {
      label: name,
      data: labels.map((label) => dataSource[label as keyof CounterData][name]),
      fill: false,
      borderColor: colors[index % colors.length],
      tension: 0.1,
    };
  });

  const chartData = {
    labels: labels,
    datasets: datasets,
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: true,
        text: "Gráfico de Chamados por Quantidade",
      },
    },
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        grid: {
          lineWidth: 1,
        },
        title: {
          display: true,
          text: "Quantidade",
        },
      },
      y: {
        grid: {
          lineWidth: 1,
        },
        title: {
          display: true,
          text: "Setor",
        },
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default LineGraph;
