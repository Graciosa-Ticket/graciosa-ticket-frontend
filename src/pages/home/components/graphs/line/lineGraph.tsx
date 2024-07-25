import {
  Chart as C,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { CounterToChartModel } from "../../../../../models/counterToChart";
import { useState, useEffect } from "react";
import { useFetch } from "../../../../../services/hooks/getQuery";

C.register(
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale
);

export const LineGraph = () => {
  const [dataSource, setDataSource] = useState<CounterToChartModel | null>(
    null
  );

  const { data, error } = useFetch<CounterToChartModel>(
    "/counters/CounterToChart/AllSectors",
    ["AllCounters"],
    {
      onSuccess: (data) => {
        setDataSource(data);
      },
      onError: (error) => {},
    }
  );

  useEffect(() => {
    if (data) {
      setDataSource(data);
    }
  }, [data]);

  if (!dataSource) return <div> Carregando...</div>;

  return (
    <Line
      data={{
        labels: Object.keys(dataSource),
        datasets: [
          {
            label: "Setores",
            data: Object.values(dataSource),
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
            text: "Gráfico de Chamados por Setor",
          },
        },
        scales: {
          x: {
            grid: {
              lineWidth: 0,
            },
            title: {
              display: false,
              text: "Setor",
            },
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

export default LineGraph;
