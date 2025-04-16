// import React, { useState, useEffect } from 'react';
// import { Line, Bar, Radar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   RadialLinearScale,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// } from 'chart.js';
// import API from '../Api/api';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   RadialLinearScale,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// const OverallPerformance = () => {
//   const [performanceData, setPerformanceData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchPerformanceData();
//   }, []);

//   const fetchPerformanceData = async () => {
//     try {
//       setLoading(true);
//       const response = await API.get('/performance');
      
//       if (response.message === "No performance data found") {
//         setPerformanceData(null); // or handle differently
//       } else {
//         setPerformanceData(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching performance data:", error.response || error.message);
//       setPerformanceData(null); // in case of 404
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   if (loading) {
//     return <div className="flex justify-center items-center h-screen">Loading performance data...</div>;
//   }


//   if (!loading && !performanceData) {
//     return (
//       <div className="text-center mt-4">
//         <p className="text-lg text-gray-300">📊 No performance data available.</p>
//         <p className="text-gray-400">Looks like you haven’t attempted any quizzes yet. Start your first quiz to see insights!</p>
//       </div>
//     );
//   }
  

//   const { overallStats, performances } = performanceData;

//   // Prepare data for accuracy trend chart
//   const accuracyData = {
//     labels: performances.map((_, index) => `Quiz ${index + 1}`),
//     datasets: [{
//       label: 'Accuracy %',
//       data: performances.map(p => p.accuracy),
//       fill: true,
//       borderColor: 'rgb(75, 192, 192)',
//       tension: 0.1
//     }]
//   };

//   // Prepare data for response time chart
//   const responseTimeData = {
//     labels: performances.map((_, index) => `Quiz ${index + 1}`),
//     datasets: [{
//       label: 'Avg Response Time (s)',
//       data: performances.map(p => p.avgResponseTime),
//       backgroundColor: 'rgba(153, 102, 255, 0.5)',
//     }]
//   };

//   // Prepare data for weak topics radar chart
//   const weakTopicsCount = overallStats.weakTopics.reduce((acc, topic) => {
//     acc[topic] = (acc[topic] || 0) + 1;
//     return acc;
//   }, {});

//   const radarData = {
//     labels: Object.keys(weakTopicsCount),
//     datasets: [{
//       label: 'Weak Topics Frequency',
//       data: Object.values(weakTopicsCount),
//       backgroundColor: 'rgba(255, 99, 132, 0.2)',
//       borderColor: 'rgb(255, 99, 132)',
//       pointBackgroundColor: 'rgb(255, 99, 132)',
//       pointBorderColor: '#fff',
//       pointHoverBackgroundColor: '#fff',
//       pointHoverBorderColor: 'rgb(255, 99, 132)'
//     }]
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h1 className="text-3xl font-bold mb-8">Overall Performance Dashboard</h1>
      
//       {/* Summary Statistics */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="text-lg font-semibold mb-2">Total Quizzes</h3>
//           <p className="text-2xl text-blue-600">{overallStats.totalQuizzes}</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="text-lg font-semibold mb-2">Average Accuracy</h3>
//           <p className="text-2xl text-green-600">{overallStats.avgAccuracy.toFixed(1)}%</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="text-lg font-semibold mb-2">Total Correct</h3>
//           <p className="text-2xl text-purple-600">{overallStats.totalCorrect}</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="text-lg font-semibold mb-2">Avg Response Time</h3>
//           <p className="text-2xl text-orange-600">{overallStats.avgResponseTime.toFixed(2)}s</p>
//         </div>
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="text-lg font-semibold mb-4">Accuracy Trend</h3>
//           <Line data={accuracyData} options={{ responsive: true }} />
//         </div>
        
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="text-lg font-semibold mb-4">Response Time Analysis</h3>
//           <Bar data={responseTimeData} options={{ responsive: true }} />
//         </div>

//         <div className="bg-white p-4 rounded-lg shadow col-span-2">
//           <h3 className="text-lg font-semibold mb-4">Weak Topics Analysis</h3>
//           <div className="h-[400px]">
//             <Radar data={radarData} options={{ responsive: true, maintainAspectRatio: false }} />
//           </div>
//         </div>
//       </div>

//       {/* Recent Quizzes Table */}
//       <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
//         <h3 className="text-lg font-semibold p-4 border-b">Recent Quizzes</h3>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quiz</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accuracy</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Time</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {performances.map((perf, index) => (
//                 <tr key={perf.quizId}>
//                   <td className="px-6 py-4 whitespace-nowrap">Quiz {index + 1}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{perf.totalScore}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{perf.accuracy.toFixed(1)}%</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{perf.avgResponseTime.toFixed(2)}s</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {new Date(perf.lastAttempt).toLocaleDateString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OverallPerformance;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line, Bar, Radar } from 'react-chartjs-2';
import QuizPerformance from "../performance/quizPerformance";
import QuizReview from "../review/QuizReview";
import PopUpModal from "../Modal/Popup";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import API from '../Api/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const OverallPerformance = () => {
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'performance' | 'ai'
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  




  useEffect(() => {
    fetchPerformanceData();
  }, []);

  const fetchPerformanceData = async () => {
    try {
      
      const response = await API.get('/performance');
      setLoading(false);
      if (response.message === "No performance data found") {
        setPerformanceData(null); // or handle differently
      } else {
        setPerformanceData(response.data);
      }
    } catch (error) {
      console.error("Error fetching performance data:", error.message);
      setPerformanceData(null); // in case of 404
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading performance data...</div>;
  }


  if (!loading && !performanceData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
        <p className="text-2xl text-gray-200 font-semibold mb-2">
          📊 No performance data available.
        </p>
        <p className="text-lg text-gray-400 max-w-xl">
          Looks like you haven’t attempted any quizzes yet. Start your first quiz to see insights!
        </p>
      </div>
    );
  }
  
  

  const { overallStats, performances } = performanceData;

  // Prepare data for accuracy trend chart
  const accuracyData = {
    labels: performances.map((_, index) => `Quiz ${index + 1}`),
    datasets: [{
      label: 'Accuracy %',
      data: performances.map(p => p.accuracy),
      fill: true,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  // Prepare data for response time chart
  const responseTimeData = {
    labels: performances.map((_, index) => `Quiz ${index + 1}`),
    datasets: [{
      label: 'Avg Response Time (s)',
      data: performances.map(p => p.avgResponseTime),
      backgroundColor: 'rgba(153, 102, 255, 0.5)',
    }]
  };

  // Prepare data for weak topics radar chart
  const weakTopicsCount = overallStats.weakTopics.reduce((acc, topic) => {
    acc[topic] = (acc[topic] || 0) + 1;
    return acc;
  }, {});

  const radarData = {
    labels: Object.keys(weakTopicsCount),
    datasets: [{
      label: 'Weak Topics Frequency',
      data: Object.values(weakTopicsCount),
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)'
    }]
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        pointLabels: {
          font: {
            size: 14 // Size for labels around the chart
          },
          color: '#333',
        },
        ticks: {
          font: {
            size: 14, // Size for tick numbers
          },
          color: '#555',
          backdropColor: 'transparent',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14, // Size for legend text
          },
          color: '#000',
        },
      },
    },
  };

  const handleOpenModal = (type, quizId) => {
    setModalType(type);
    setSelectedQuizId(quizId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedQuizId(null);
  };


  

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl text-center text-[#66FCF1] font-bold mb-8">Overall Performance Dashboard</h1>
      
      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg text-gray-600 font-semibold mb-2">Total Quizzes</h3>
          <p className="text-2xl text-blue-600">{overallStats.totalQuizzes}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg text-green-900 font-semibold mb-2">Average Accuracy</h3>
          <p className="text-2xl text-green-600">{overallStats.avgAccuracy.toFixed(1)}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-purple-900 mb-2">Total Score</h3>
          <p className="text-2xl text-purple-600">{overallStats.totalScore}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-red-900 mb-2">Avg Response Time</h3>
          <p className="text-2xl text-orange-600">{overallStats.avgResponseTime.toFixed(2)}s</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg text-gray-500 font-semibold mb-4">Accuracy Trend</h3>
          <Line data={accuracyData} options={{ responsive: true }} />
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg text-gray-500 font-semibold mb-4">Response Time Analysis</h3>
          <Bar data={responseTimeData} options={{ responsive: true }} />
        </div>

        <div className="bg-white p-4 rounded-lg shadow col-span-2">
          <h3 className="text-lg  text-gray-500 font-semibold mb-4">Weak Topics Analysis</h3>
          <div className="h-[500px] mb-4">
            <Radar data={radarData} options={radarOptions} />
          </div>
        </div>
      </div>

      {/* Recent Quizzes Table */}
      <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
        <h3 className="text-lg font-semibold text-center text-teal-500 p-4 border-b"> Quizzes</h3>
        <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
  <thead className="bg-gray-50">
    <tr>
    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Quiz</th>
      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Accuracy</th>
      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Response Time</th>
      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {[...performances].reverse().map((perf, index) => (
      <>
        <tr
          key={perf.quizId}
          className="hover:bg-gray-100 cursor-pointer transition"
          onClick={() =>
            setExpandedRow(expandedRow === perf.quizId ? null : perf.quizId)
          }
        >
          <td className="px-6 py-4 text-gray-700 text-center">Quiz {index+1}</td>
          <td className="px-6 py-4 text-black font-light text-center">{perf.quizId.topic}</td>
          <td className="px-6 py-4 text-purple-700 text-center">{perf.totalScore}</td>
          <td className="px-6 py-4 text-green-700 text-center">{perf.accuracy.toFixed(1)}%</td>
          <td className="px-6 py-4 text-red-700 text-center">{perf.avgResponseTime.toFixed(2)}s</td>
          <td className="px-6 py-4 text-gray-500 text-center">
            {new Date(perf.lastAttempt).toLocaleDateString()}
          </td>
        </tr>

        {expandedRow === perf.quizId && (
          <tr>
            <td colSpan={5} className="px-6 py-4 text-center bg-gray-50">
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => handleOpenModal('performance', perf.quizId._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  📊 Quiz Performance
                </button>
                <button
                  onClick={() => handleOpenModal('ai', perf.quizId._id)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                >
                  🤖 Quiz AI Review
                </button>
              </div>
            </td>
          </tr>
        )}

      </>
    ))}
  </tbody>
</table>

        {/* Reusable Popup Modal */}
        <PopUpModal isOpen={isModalOpen} onClose={handleCloseModal} isLoading={loading}>
        {modalType === 'performance' && <QuizPerformance quizId={selectedQuizId} />}
        {modalType === 'ai' && <QuizReview quizId={selectedQuizId} />}
      </PopUpModal>
        </div>
      </div>
    </div>
  );
};

export default OverallPerformance;