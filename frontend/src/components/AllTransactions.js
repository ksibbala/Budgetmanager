import React, { useState } from "react";
import TransactionCard from "./TransactionCard"; // Import the TransactionCard component
import { useTransactions } from "../context/TransactionContext"; // Use the transaction context
import AddTransactionModal from "./AddTransactionModal";
import { useAuth } from "../context/AuthContext"; // Import useAuth to get userId

const AllTransactions = ({ onEdit, onDelete }) => {
  const { transactions, editTransaction, deleteTransaction } = useTransactions();
  const { user } = useAuth(); // Get the user object from AuthContext
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state
  const [editingTransaction, setEditingTransaction] = useState(null); // Transaction being edited

  // Open the modal and set the transaction to be edited
  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 sm:p-8 lg:p-12 min-h-screen bg-white">
      <h1 className="text-3xl font-bold mb-4">All Transactions</h1>

      {/* Show message if there are no transactions */}
      {transactions.length === 0 ? (
        <p className="text-xl text-gray-500">No transactions available.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {transactions.map((transaction) => (
            <TransactionCard
              key={transaction._id}
              transaction={transaction}
              onEdit={() => handleEditTransaction(transaction)} // Open modal on edit
              onDelete={() => deleteTransaction(transaction._id)} // Delete the transaction
            />
          ))}
        </div>
      )}

      {/* Modal for editing transaction */}
      {isModalOpen && (
        <AddTransactionModal
          userId={user?._id} // Pass the userId here from AuthContext
          isModalOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          onTransactionAdded={() => {}}
          onTransactionEdited={editTransaction}
          editingTransaction={editingTransaction}
        />
      )}
    </div>
  );
};

export default AllTransactions;