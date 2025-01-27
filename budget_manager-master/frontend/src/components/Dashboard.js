import React, { useState, useEffect } from "react";
import { useTransactions } from "../context/TransactionContext";
import { useNavigate } from "react-router-dom";
import Overview from "./Overview";
import RecentTransactions from "./RecentTransactions";
import FAB from "./FAB";
import AddTransactionModal from "./AddTransactionModal";
import axios from "../services/axios";
import BudgetUpdater from "./BudgetUpdater";
import SpendingChart from "./SpendingChart"; // Import the SpendingChart component

const Dashboard = () => {
  const { transactions, addTransaction, editTransaction, deleteTransaction } = useTransactions();
  const [userData, setUserData] = useState({});
  const [userBudget, setUserBudget] = useState({});
  const [newBudget, setNewBudget] = useState(0);
  const [savingsGoal, setSavingsGoal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "/login";
          return;
        }

        const userResponse = await axios.get("/api/users/me", {
          headers: { "x-auth-token": token },
        });
        setUserData(userResponse.data);

        const budgetResponse = await axios.get(`/api/budgets/${userResponse.data._id}`, {
          headers: { "x-auth-token": token },
        });
        setUserBudget(budgetResponse.data);
        setNewBudget(budgetResponse.data.totalBudget || 0);
        setSavingsGoal(budgetResponse.data.savingsGoal || 0);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const handleViewAllTransactions = () => {
    navigate("/all-transactions");
  };

  const handleBudgetUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const updatedBudget = {
        userId: userData._id,
        totalBudget: newBudget,
        savingsGoal: savingsGoal,
      };

      const response = await axios.post("/api/budgets", updatedBudget, {
        headers: { "x-auth-token": token },
      });

      setUserBudget(response.data);
    } catch (error) {
      console.error("Error updating budget", error);
    }
  };

  const totalExpenses = transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );
  const remainingBudget = newBudget - totalExpenses;

  return (
    <div className="p-4 sm:p-8 lg:p-12 min-h-screen bg-white">
      <h1 className="text-3xl font-bold mb-4 text-indigo-600">
        Welcome, {userData.name}
      </h1>

      {/* Budget Update Section */}
      <div className="lg:flex lg:gap-8">
        <div className="lg:w-1/3">
          <BudgetUpdater
            newBudget={newBudget}
            setNewBudget={setNewBudget}
            handleBudgetUpdate={handleBudgetUpdate}
          />
        </div>

        {/* Overview Section */}
        <div className="lg:w-2/3">
          <Overview
            totalBudget={newBudget}
            totalExpenses={totalExpenses}
            remainingBudget={remainingBudget}
          />
        </div>
      </div>

      {/* Main Content: Flex layout for transactions and chart */}
      {transactions.length === 0 ? (
        // Show this message if no transactions exist
        <div className="mt-8 text-center">
          <p className="text-xl font-semibold text-gray-500">
            No transactions yet.
          </p>
          <div className="mt-5 flex justify-center">
            {/* Highlight FAB */}
            <FAB onClick={() => setIsModalOpen(true)} />
          </div>
        </div>
      ) : (
        // If transactions exist, show transactions and chart
        <div className="lg:flex lg:gap-8 mt-8">
          <div className="w-full lg:w-1/3">
            <RecentTransactions
              transactions={transactions}
              onEdit={(transaction) => {
                setEditingTransaction(transaction);
                setIsModalOpen(true);
              }}
              onDelete={deleteTransaction}
            />
          </div>

          {/* Right side: Spending Chart + View All Transactions Button */}
          <div className="w-full lg:w-2/3">
            <div className="flex flex-col lg:flex-row gap-6">
              {" "}
              {/* Add gap between items */}
              {/* Spending Chart */}
              <div className="flex-1">
                <SpendingChart
                  transactions={transactions}
                  newBudget={newBudget}
                  totalExpenses={totalExpenses}
                />
              </div>
              {/* View All Transactions Button */}
              <div className="flex items-center justify-center lg:justify-start mt-4 lg:mt-0">
                <button
                  onClick={handleViewAllTransactions}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-300 transition"
                >
                  View All Transactions
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <FAB onClick={() => setIsModalOpen(true)} />

      <AddTransactionModal
        userId={userData._id}
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        onTransactionAdded={addTransaction}
        onTransactionEdited={editTransaction}
        editingTransaction={editingTransaction}
      />
    </div>
  );
};

export default Dashboard;