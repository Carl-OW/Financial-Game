import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type DataPoint = {
  year: number;
  populationGrowth: number | null;
};

type GraphProps = {
  data: DataPoint[];
};

const PopulationGrowthGraph: React.FC<GraphProps> = ({ data }) => {
  // Prepare the data for the chart
  const chartData = {
    labels: data.map((point) => point.year), // X-axis labels (years)
    datasets: [
      {
        label: "Population Growth (%)",
        data: data.map((point) => point.populationGrowth), // Y-axis values (population growth)
        borderColor: "#00824d", // Line color
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Area under the line
        borderWidth: 2, // Line width
        fill: true, // Fill the area under the line
      },
    ],
  };

  // Chart configuration options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Disable aspect ratio to control height/width
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
      y: {
        title: {
          display: true,
          text: "Population Growth (%)",
        },
        beginAtZero: false, // Don't force Y axis to start at 0
      },
    },
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ width: "800px", height: "400px" }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default PopulationGrowthGraph;
