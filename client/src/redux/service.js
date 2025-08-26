import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

async function login(body){
    const response = await axios.post(
      `${API_URL}/api/auth/login`,
      body, 
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    const data = await response.data
    return data;
}


async function fetchExpenses(){
  try {
    const response = await axios.get(`${API_URL}/api/expenses`)
    return response.data
  } catch (error) {
  } finally {
  }
}

async function createExpense(expenseData) {
  try {
    const response = await axios.post(`${API_URL}/api/expenses/`,
        expenseData, {
      headers: { "Content-Type": "application/json" },
    })
    return response.data
    
  } catch (error) {
  console.log("🚀 ~ createExpense ~ error:", error)
  } finally {
  }
}

async function updateExpense(id, expenseData) {

  try {
    const response = await axios.put(`${API_URL}/api/expenses/${id}`, 
        expenseData ,{
      headers: { "Content-Type": "application/json" },
    })
    return response.data
  } catch (error) {
  } finally {
  }
}

async function deleteExpense(id){
  try {
    const response = await axios.delete(`${API_URL}/api/expenses/${id}`)
    return response.data
  } catch (error) {
  } finally {
  }
}

async function fetchSummary(){
  try {
    const response = await axios.get(`${API_URL}/api/expenses/summary`,
       { headers: {
          "Content-Type": "application/json"
        }}
    
    )

    return response.data
  } catch (error) {
    
  }
}

export const service = {
    login,
    fetchSummary,
    createExpense,
    fetchExpenses,
    updateExpense,
    deleteExpense
}