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
  ["Em andamento"]: number;
  impeditivo: number;
  reaberto: number;
}

type CounterToChartModel = Record<string, CounterData>;

export const LineGraph = () => {
  const [dataSource, setDataSource] = useState<CounterToChartModel | null>(
    null
  );
  const theme = useTheme();

  useFetch<CounterToChartModel[]>(
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

  if (!dataSource) return <div> Carregando...</div>;

  const labels = Object.keys(dataSource);
  const datasetNames: (keyof CounterData)[] = [
    "aberto",
    "aguardando_aprovacao",
    "cancelado",
    "concluido",
    "Em andamento",
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
    const data = labels.map(
      (label) => dataSource[label as keyof CounterData][name]
    );

    return {
      label: name,
      data,
      fill: false,
      borderColor: colors[index % colors.length],
      tension: 0.1,
    };
  });

  const chartData = {
    labels: labels.map((e) => "Setor " + e),
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
          text: "Setor",
        },
      },
      y: {
        grid: {
          lineWidth: 1,
        },
        title: {
          display: true,
          text: "Quantidade",
        },
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default LineGraph;
