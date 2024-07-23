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

  const { data, error } = useFetch<CounterToChartModel>(
    "/counters/CounterToChart",
    ["counter"],
    {
      onSuccess: (data) => {
        setDataSource(data);
      },
      onError: (error) => {
        console.error("Failed to fetch data", error);
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
    <div>
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
              display: true,
              position: "top",
            },
            title: {
              display: true,
              text: "Gráfico de Chamados por Status",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Status",
              },
            },
            y: {
              title: {
                display: true,
                text: "Quantidade",
              },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default BarGraph;
