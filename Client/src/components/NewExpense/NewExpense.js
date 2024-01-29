import React,{useState} from 'react';

import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

const NewExpense = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString()
    };
    props.onAddExpense(expenseData);
    setIsEditing(false);
  };
    const startEditingHandeler =() =>{
      setIsEditing(true);
    };
    const stopEditingHandeler =()=>{
      setIsEditing(false);
    };
  return (
    <div className='new-expense'>
      {!isEditing && <button onClick={startEditingHandeler}>Add New Expense</button>}
      {isEditing && <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} onCancel={stopEditingHandeler} />}
    </div>
  );
};

export default NewExpense;
