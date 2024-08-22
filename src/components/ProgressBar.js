import React from "react";

const ProgressBar = ({ total, spent }) => {
  const percentage = (spent / total) * 100;

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#e0e0e0",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          width: `${percentage}%`,
          backgroundColor: percentage > 100 ? "red" : "#76c7c0",
          height: "20px",
          borderRadius: "10px",
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
