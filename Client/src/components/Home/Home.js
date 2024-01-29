import React, { useEffect, useState } from 'react';
import NewExpense from '../NewExpense/NewExpense';
import Expenses from '../Expenses/Expenses';

const Home = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const AddExpenseHandler = async (expense) => {
    try {
      const response = await fetch('https://backend-expense-tracker-0qdz.onrender.com/push-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expense),
      });

      console.log(response);

      // Fetch the updated data after adding a new expense
      fetchData();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('https://backend-expense-tracker-0qdz.onrender.com/get-data');
      const result = await response.json();

      // Ensure result is an array
      if (Array.isArray(result)) {
        // Filter out items without a valid 'date' property
        const validExpenses = result.map((item) => {
          // Parse 'date' as a Date object
          const date = new Date(item.date);

          return {
            id: item._id,
            title: item.title,
            amount: item.amount,
            date: date,
          };
        });

        setExpenses(validExpenses);
      } else {
        console.error('Invalid data format:', result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <NewExpense onAddExpense={AddExpenseHandler} />
      <Expenses items={expenses} />
    </>
  );
};

export default Home;
