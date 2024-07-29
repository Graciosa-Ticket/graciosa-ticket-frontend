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
import { useState, useEffect } from "react";
import { useFetch } from "../../../../../services/hooks/getQuery";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BarGraph = () => {
  const theme = useTheme();
  const [dataSource, setDataSource] = useState<CounterToChartModel | null>(
    null
  );

  const { data } = useFetch<CounterToChartModel>(
    "/counters/CounterToChart",
    ["counter"],
    {
      onSuccess: (data) => {
        setDataSource(data);
      },
    }
  );

  useEffect(() => {
    if (data) {
      setDataSource(data);
    }
  }, [data]);

  if (!dataSource) return <div> Carregando...</div>;

  return (
    <Bar
      data={{
        labels: Object.keys(dataSource),
        datasets: [
          {
            label: "Chamados",
            data: Object.values(dataSource),
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

export default BarGraph;
