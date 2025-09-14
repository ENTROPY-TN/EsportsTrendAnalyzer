import React from "react";
import "./PieChart.css";

const PieChart = ({ data = [] }) => {
  if (!Array.isArray(data) || data.length === 0) return <div>No data available</div>;

  return (
    <div className="pie-chart">
      {data.map(item => (
        <div key={item.name}>
          {item.name}: {item.value}%
        </div>
      ))}
    </div>
  );
};

export default PieChart;