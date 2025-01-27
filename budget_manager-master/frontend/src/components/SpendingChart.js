import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"; // Import recharts components

const SpendingChart = ({ transactions, newBudget, totalExpenses }) => {
  // Calculate the total spent per category
  const categoryData = transactions.reduce((acc, transaction) => {
    const { category, amount } = transaction;
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});

  // Prepare data for the Pie chart
  const pieChartData = Object.keys(categoryData).map((category) => ({
    name: category,
    value: categoryData[category],
  }));

  // Pie chart colors
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#ff0000'];

  // Calculate remaining budget
  const remainingBudget = newBudget - totalExpenses;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-indigo-600 mb-4">Spending Breakdown</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieChartData}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            fill="#8884d8"
            label
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      {/* Display the remaining budget with red if negative */}
      <p className={`text-lg font-semibold mt-4 ${remainingBudget < 0 ? 'text-red-600' : 'text-green-600'}`}>
        Remaining Budget: ${remainingBudget < 0 ? remainingBudget : remainingBudget.toFixed(2)}
      </p>
    </div>
  );
};

export default SpendingChart;