import React from 'react';
import { PieChart, Pie } from 'recharts';

const TodoPieChart = ({ complete, incomplete }) => (
  <PieChart
    width={500}
    height={500}
    margin={{
      top: 5,
      right: 20,
      left: 30,
      bottom: 5,
    }}
  >
    <Pie
      isAnimationActive={false}
      data={complete}
      cx={200}
      cy={200}
      outerRadius={60}
      fill="#8884d8"
      dataKey="id"
      keyField="title"
    />
    <Pie
      isAnimationActive={false}
      data={incomplete}
      cx={200}
      cy={200}
      innerRadius={70}
      outerRadius={90}
      fill="#82ca9d"
      dataKey="id"
      keyField="title"
      label={(entry) => entry.title}
    />
  </PieChart>
);

export default TodoPieChart;
