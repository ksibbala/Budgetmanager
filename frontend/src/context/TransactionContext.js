import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from '../services/axios'; // Assuming you have axios set up
import { useAuth } from './AuthContext';

const TransactionContext = createContext();

export const useTransactions = () => {
  return useContext(TransactionContext);
};

export const TransactionProvider = ({ children }) => {
  const { user, isLoggedIn } = useAuth(); // Get userId from AuthContext
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch transactions when the component mounts or when user changes
  useEffect(() => {
    if (isLoggedIn && user) {
      const fetchTransactions = async () => {
        try {
          const response = await axios.get(`/api/transactions/${user._id}`);
          setTransactions(response.data);
        } catch (error) {
          console.error('Error fetching transactions', error);
        } finally {
          setLoading(false);
        }
      };

      fetchTransactions();
    }
  }, [isLoggedIn, user]);

  // Add a new transaction
  const addTransaction = async (newTransaction) => {
    try {
      const response = await axios.post('/api/transactions', {
        userId: user._id,  // Pass the userId here
        ...newTransaction
      });
      setTransactions((prevTransactions) => [response.data, ...prevTransactions]);
    } catch (error) {
      console.error('Error adding transaction', error);
    }
  };

  // Edit an existing transaction
  const editTransaction = async (updatedTransaction) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(`/api/transactions/${updatedTransaction._id}`, updatedTransaction, {
        headers: { "x-auth-token": token },
      });

      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction._id === updatedTransaction._id
            ? { ...transaction, ...response.data }
            : transaction
        )
      );
    } catch (error) {
      console.error("Error editing transaction", error);
    }
  };

  // Delete a transaction
  const deleteTransaction = async (transactionId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`/api/transactions/${transactionId}`, {
        headers: { "x-auth-token": token },
      });

      setTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction._id !== transactionId)
      );
    } catch (error) {
      console.error("Error deleting transaction", error);
    }
  };

  return (
    <TransactionContext.Provider value={{
      transactions,
      addTransaction,
      editTransaction,
      deleteTransaction,
      loading
    }}>
      {children}
    </TransactionContext.Provider>
  );
};