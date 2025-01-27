import React from 'react';

const TransactionCard = ({ transaction, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-xl rounded-lg p-4 space-y-3">
      <div className="flex justify-between items-center">
        <span className="font-medium">
          {transaction.title.charAt(0).toUpperCase() + transaction.title.slice(1)}
        </span>
        <span
          className={`font-semibold ${transaction.amount > 0 ? "text-green-500" : "text-red-500"}`}
        >
          ${transaction.amount}
        </span>
      </div>
      <div className="text-sm text-gray-500">
        <span>{transaction.category}</span> | {new Date(transaction.date).toLocaleString()}
      </div>

      {/* Action Buttons for Edit and Delete */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => onEdit(transaction)}
          className="text-blue-500 hover:text-blue-700 font-bold"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(transaction._id)}
          className="text-red-500 hover:text-red-700 font-bold"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TransactionCard;