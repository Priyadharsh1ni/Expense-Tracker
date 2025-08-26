import ExpenseForm from "./Components/ExpenseForm"
import ExpenseList from "./Components/ExpenseList"
import ExpenseSummary from "./Components/ExpenseSummary"
import LoginPage from "./Components/LoginPage"
import Header from "./Components/Header"
import { Plus, BarChart3 } from "lucide-react"
import { useState } from "react"
import { AuthContextProvider } from "./Context/authContext"
import { ToastProvider } from "./Components/hooks/toast"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

function ExpenseTrackerApp() {
  const [showForm, setShowForm] = useState(false)
  const auth = localStorage.getItem("user")

  if (!auth) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Summary Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold text-primary">Financial Overview</h2>
          </div>
          <ExpenseSummary />
        </div>

        {/* Main Content */}
        <div className="grid ">
          {!showForm ? (
            <div className="lg:col-span-1 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-2xl font-semibold text-primary">Add Expense</h2>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="bg-primary hover:bg-primary/90 bg-blue-800 flex rounded-lg text-white p-4"
              >
                <Plus className="h-5 w-5 text-primary" /> Add New Expense
              </button>
            </div>
          ) : (
            <ExpenseForm onCancel={() => setShowForm(false)} />
          )}

          <div className="lg:col-span-2">
            <ExpenseList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <AuthContextProvider>
      <ToastProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/expenses" element={<ExpenseTrackerApp />} />
          </Routes>
        </Router>
      </ToastProvider>
    </AuthContextProvider>
  )
}
