import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AccuracyChart = ({sampleData}) => {

  const isEmpty = !sampleData || sampleData.length === 0;

  const labels = isEmpty ? [] : sampleData.map((_, index) => `Quiz ${index + 1}`);
 
  const accuracy = isEmpty ? [] : sampleData.map((item) => item.accuracy);
  
  const topics = isEmpty ? [] : sampleData.map((item) => item.topic);


  const data = {
    labels: labels,
    datasets: [
      {
        label: "Accuracy",
        data: accuracy,
        backgroundColor: "#66FCF1", // soft violet
        barThickness: 30, // thinner bars
        borderRadius: 6, // rounded bars for better aesthetics
      },
    ],
  };

  const options = {
    plugins: {
    tooltip: {
      callbacks: {
        title: (tooltipItems) => {
          const index = tooltipItems[0].dataIndex;
          return topics[index]; // Show topic on hover
        },
        label: (tooltipItem) => {
          return `${tooltipItem.dataset.label}: ${tooltipItem.formattedValue}%`;
        },
      },
    },
  },
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => value + "%",
          color: "#ffffff",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Light white grid lines
        },
        
      },
      x: {
        ticks: {
          color: "#ffffff",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Light white grid lines
        },
      },
    },

  };

  return isEmpty ? (
    <p className="text-center text-gray-400 text-sm">No performance data available yet.</p>
  ) : (
    <Bar data={data}  options={options}/>
  );
};

export default AccuracyChart;
