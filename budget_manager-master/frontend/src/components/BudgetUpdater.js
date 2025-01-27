import React from "react";

const BudgetUpdater = ({ newBudget, setNewBudget, handleBudgetUpdate }) => {
  const handleInputChange = (e) => {
    const value = e.target.value;

    // Prevent leading zeros but allow 0 when it's the only value
    if (/^0[0-9]/.test(value)) {
      setNewBudget(value.slice(1)); // Remove leading zero
    } else {
      setNewBudget(value);
    }
  };

  return (
    <div className="mb-6 bg-white shadow-2xl rounded-lg p-4">
      <h3 className="text-xl font-bold text-indigo-600 mb-4">Set Your Budget</h3>
      <div className="flex flex-col space-y-4">
        {/* Stack input and button vertically */}
        <div className="relative w-full">
          <input
            type="text" // Change to text for more control
            id="budget"
            value={newBudget}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded-md w-full focus:ring focus:ring-blue-300 focus:border-blue-500"
            placeholder="Enter budget"
          />
        </div>
        <button
          onClick={handleBudgetUpdate}
          className="bg-blue-600 text-white px-5 py-2 rounded-md shadow hover:bg-blue-700 focus:ring focus:ring-blue-300 transition"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default BudgetUpdater;