import React, { useState, useEffect } from "react";

const AddTransactionForm = ({ userId, transaction, onSubmit }) => {
  const [title, setTitle] = useState(transaction.title || "");
  const [amount, setAmount] = useState(transaction.amount || "");
  const [category, setCategory] = useState(transaction.category || "");

  // Categories for the dropdown
  const categories = [
    "Food",
    "Transport",
    "Entertainment",
    "Utilities",
    "Healthcare",
    "Shopping",
    "Rent",
    "Miscellaneous",
  ];

  useEffect(() => {
    if (transaction) {
      setTitle(transaction.title);
      setAmount(transaction.amount);
      setCategory(transaction.category);
    }
  }, [transaction]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTransaction = {
      _id: transaction._id,
      title,
      amount,
      category,
    };
    onSubmit(updatedTransaction); // Pass the form data back to the modal's onSubmit
  };

  return (
    <form onSubmit={handleSubmit} id="addTransactionForm">
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="amount" className="block text-sm font-medium mb-2">
          Amount <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium mb-2">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default AddTransactionForm;