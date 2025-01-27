import React, { useState, useEffect } from "react";
import { useTransactions } from "../context/TransactionContext";
import AddTransactionForm from "./AddTransactionForm";

const AddTransactionModal = ({
  isModalOpen,
  closeModal,
  userId,
  editingTransaction,
}) => {
  const { addTransaction, editTransaction } = useTransactions();
  const [transaction, setTransaction] = useState({
    title: "",
    amount: "",
    category: "",
    _id: "",
  });

  // Update transaction form when editingTransaction changes
  useEffect(() => {
    if (editingTransaction) {
      setTransaction({
        _id: editingTransaction._id,
        title: editingTransaction.title,
        amount: editingTransaction.amount,
        category: editingTransaction.category,
      });
    } else {
      resetForm();
    }
  }, [editingTransaction]);

  // Reset form to initial state
  const resetForm = () => {
    setTransaction({
      title: "",
      amount: "",
      category: "",
      _id: "",
    });
  };

  const handleSubmit = (updatedTransaction) => {
    const transactionData = { ...updatedTransaction, _id: transaction._id };

    if (transaction._id) {
      editTransaction(transactionData);
    } else {
      addTransaction(transactionData);
    }
    closeModal();
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg sm:w-96 md:w-80 lg:w-96 relative">
        <button
          onClick={() => {
            closeModal();
            resetForm(); // Ensure form resets when modal closes
          }}
          className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
        <h2 className="text-2xl font-semibold mb-4">
          {editingTransaction ? "Edit Transaction" : "Add New Transaction"}
        </h2>
        <AddTransactionForm
          userId={userId}
          transaction={transaction}
          onSubmit={handleSubmit}
        />
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={() => {
              closeModal();
              resetForm(); // Ensure form resets when cancel is clicked
            }}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="addTransactionForm"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            {editingTransaction ? "Update Transaction" : "Add Transaction"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionModal;