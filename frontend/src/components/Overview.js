import React from 'react';

const Overview = ({ totalBudget, totalExpenses, remainingBudget }) => {
  // Determine if the remaining budget is negative
  const isNegative = remainingBudget < 0;

  return (
    <div className="bg-white shadow-2xl rounded-lg p-6">
      <h2 className="text-xl font-bold text-indigo-600 mb-4">Overview</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-medium">Total Budget</h3>
          <p className="text-xl">${totalBudget || 0}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-medium">Total Expenses</h3>
          <p className="text-xl">${totalExpenses || 0}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-medium">Remaining Budget</h3>
          <p
            className={`text-xl ${isNegative ? 'font-bold text-red-600' : ''}`}
          >
            ${remainingBudget || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Overview;