import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ScoreChart = ({ sampleData }) => {
  // console.log("Scores data:", sampleData);

  const isEmpty = !sampleData || sampleData.length === 0;

  const topic = isEmpty ? [] : sampleData.map((item) => item.topic);
  const score = isEmpty ? [] : sampleData.map((item) => item.score);

  const data = {
    labels: topic,
    datasets: [
      {
        label: "Score",
        data: score,
        borderColor: "#66FCF1",
        backgroundColor: "rgba(102, 252, 241, 0.3)",
        tension: 0.4,
        pointBackgroundColor: "#66FCF1",
        pointBorderColor: "#fff",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 12,
        ticks: {
          color: "#ffffff", // Y axis tick color
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Light white grid lines
        },
      },
      x: {
        ticks: {
          color: "#ffffff", // X axis tick color
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Light white grid lines
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#ffffff", // Legend text color
        },
      },
    },
  };

  return isEmpty ? (
    <p className="text-center text-gray-400 text-sm">No performance data available yet.</p>
  ) : (
    <Line data={data} options={options} />
  );
};

export default ScoreChart;
