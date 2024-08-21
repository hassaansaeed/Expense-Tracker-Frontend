import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseDoughnutChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        data: data.map((item) => parseFloat(item.amount)),
        backgroundColor: ["#3f51b5", "#f50057", "#4caf50", "#ff9800"],
        hoverBackgroundColor: ["#303f9f", "#c51162", "#388e3c", "#f57c00"],
      },
    ],
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Doughnut
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
            },
          },
        }}
      />
    </div>
  );
};

export default ExpenseDoughnutChart;
