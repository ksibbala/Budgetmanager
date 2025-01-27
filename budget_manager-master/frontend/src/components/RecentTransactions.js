import React from "react";
import TransactionCard from "./TransactionCard";

const RecentTransactions = ({ transactions, onEdit, onDelete }) => {
  // Sort transactions in descending order by date
  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-indigo-600 mb-4">Recent Five Transactions</h2>
      <div className="flex flex-col gap-6 w-full"> {/* Stack cards vertically with full width */}
        {sortedTransactions.slice(0, 5).map((transaction) => (
          <div className="w-full max-w-md"> {/* Cards will start from the start */}
            <TransactionCard
              key={transaction._id}
              transaction={transaction}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;