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
  heightChange: (val: number) => void;
  onRendered: (matrix: number[][] | null) => void;
};

const Graph: React.FC<GraphProps> = ({ data, heightChange, onRendered }) => {
  const chartRef = React.useRef(null);
  const minimalChartRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const chart = chartRef.current?.chartInstance ?? chartRef.current;

    if (chart && chart.chartArea) {
      const chartArea = chart.chartArea;
      heightChange(chartArea.bottom - chartArea.top);
    }

    onRendered(getPixelMatrixForRightHalf());
  }, []);
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

  const getPixelMatrixForRightHalf = (): number[][] | null => {
    const chartInstance = minimalChartRef.current;
    const canvas = chartInstance?.canvas; // Access the canvas element from the chart instance

    if (!canvas) {
      return null;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return null;
    }
    const { width, height } = canvas;
    const rightHalfStart = Math.floor(width / 2);
    const pixelData = ctx.getImageData(
      rightHalfStart,
      0,
      width / 2,
      height
    ).data;

    const matrix: number[][] = [];

    // Loop through the right half of the canvas
    for (let y = 0; y < height; y++) {
      const row: number[] = [];
      for (let x = 0; x < width / 2; x++) {
        const index = (y * width + (x + rightHalfStart)) * 4; // RGBA components
        const alpha = pixelData[index + 3]; // Alpha channel
        // If alpha is not zero, we consider it as a drawn pixel (part of the graph)
        row.push(alpha > 0 ? 1 : 0);
      }
      matrix.push(row);
    }

    return matrix;
  };

  // Chart configuration options
  const chartOptions = {
    responsive: false, // Disable automatic resizing
    devicePixelRatio: 1, // Prevent scaling on high DPI devices
    maintainAspectRatio: false, // Control height/width manually
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
    elements: {
      point: {
        radius: 0, // No points on the line
      },
    },
  };
  // Minimal chart options (no labels, no legend, no titles)
  const minimalChartOptions = {
    responsive: false, // Disable automatic resizing
    devicePixelRatio: 1, // Prevent scaling on high DPI devices
    maintainAspectRatio: false, // Control height/width manually
    scales: {
      x: {
        display: false, // Hide the X-axis
      },
      y: {
        display: false, // Hide the Y-axis
      },
    },
    plugins: {
      legend: {
        display: false, // No legend
      },
      title: {
        display: false, // No title
      },
    },
    elements: {
      point: {
        radius: 0, // No points on the line
      },
    },
  };

  return (
    <>
      <div style={{ width: "800px", height: "400px" }}>
        <Line
          ref={chartRef}
          height={400}
          width={800}
          data={chartData}
          options={chartOptions}
        />
      </div>
      <div
        style={{
          position: "absolute",
          width: "800px",
          top: "500px",
          left: "0px",
        }}
      >
        {/* Minimal chart, just the line */}
        <div
          style={{
            border: "1px solid black",
            width: "800px",
            height: "400px",
            marginTop: "20px",
            display: "none",
          }}
        >
          <Line
            ref={minimalChartRef}
            data={chartData}
            options={minimalChartOptions}
            width={800}
            height={400}
          />
          <button onClick={getPixelMatrixForRightHalf}>Convert</button>
        </div>
      </div>
    </>
  );
};

export default Graph;
