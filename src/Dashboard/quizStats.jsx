import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const QuizStats = ({sampleData}) => {


    const isEmpty = !sampleData || sampleData.length === 0;

    // X-axis labels: "Quiz 1", "Quiz 2", ...
    const labels = isEmpty ? [] : sampleData.map((_, index) => `Quiz ${index + 1}`);
    // Data extraction
    const correct = isEmpty ? [] : sampleData.map((item) => item.correct);
    const incorrect = isEmpty ? [] : sampleData.map((item) => item.incorrect);
    const topics = isEmpty ? [] : sampleData.map((item) => item.topic);
  const data = {
    labels: ["Quiz 1", "Quiz 2", "Quiz 3", "Quiz 4", "Quiz 5"],
    datasets: [
      {
        label: "Correct",
        data: correct,
        backgroundColor: "#66FCF1",
        barThickness: 25, // thinner bars
        borderRadius: 6,
      },
      {
        label: "Incorrect",
        data: incorrect,
        backgroundColor: "#FF4C4C",
        barThickness: 25, // thinner bars
        borderRadius: 6,
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
            return `${tooltipItem.dataset.label}: ${tooltipItem.formattedValue}`;
          },
        },
      },
    },
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
    
  };

  return isEmpty ? (
    <p className="text-center text-gray-400 text-sm">No performance data available yet.</p>
  ) : (
    <Bar data={data}  options={options}/>
  );
}









export default QuizStats;
