import { useState } from "react"
import { Navigate } from "react-router-dom"
import Header from "../Components/Header"
import { BarChart3, Download, Plus } from "lucide-react"
import Expensesummary from "../Components/ExpenseSummary"
import ExpenseForm from "../Components/ExpenseForm"
import ExpenseList from "../Components/ExpenseList"

function Dashboard() {
  const [showForm, setShowForm] = useState(false)
  const auth = localStorage.getItem("user")

  if (!auth) {
    return <Navigate to="/login" replace />
  }



  const exportData = () => {
    const data = JSON.parse(localStorage.getItem("expenses") || "[]")
    const csvContent = data.map((row) => Object.values(row).join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.setAttribute("download", "expenses.csv")
    link.click()
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
            <button
              onClick={exportData}
              className="ml-auto bg-primary hover:bg-primary/90 bg-blue-800 flex rounded-lg text-white p-4"
            >
              <Download className="h-5 w-5 text-primary" /> Export
            </button>
          </div>
          <Expensesummary />
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

export default Dashboard