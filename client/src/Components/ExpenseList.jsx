"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
// import { fetchExpenses, deleteExpenseThunk, setFilter } from "../Context/authContext"
// import { button } from "./ui/button"
// import { Card, div } from "lucide-react"
// import { Select, div, div, div, div } from "./ui/select"
// import { Badge } from "./ui/badge"
import { Trash2, Edit, Calendar, DollarSign, Badge } from "lucide-react"
// import { useToast } from "../hooks/use-toast"
import ExpenseForm from "./ExpenseForm"
import { action } from "../redux/action"
import { useToast } from "./hooks/toast"

const CATEGORIES = ["all", "Food", "Transport", "Shopping", "Utilities", "Entertainment", "Healthcare", "Other"]

const getCategoryColor = (category) => {
  const colors = {
    Food: "bg-chart-1 text-chart-1-foreground",
    Transport: "bg-chart-2 text-chart-2-foreground",
    Shopping: "bg-chart-3 text-chart-3-foreground",
    Utilities: "bg-chart-4 text-chart-4-foreground",
    Entertainment: "bg-chart-5 text-chart-5-foreground",
    Healthcare: "bg-accent text-accent-foreground",
    Other: "bg-muted text-muted-foreground",
  }
  return colors[category] || "bg-muted text-muted-foreground"
}

export default function ExpenseList() {
  const dispatch = useDispatch()
  const { addToast } = useToast(); 
  const expoenseList = useSelector((state) => state.expenses.expoenseList)
  const [ editingExpense, setEditingExpense] = useState(null)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    dispatch(action.fetchExpenses())
  }, [dispatch])

const filteredExpenses =
  filter === "all"
    ? expoenseList
    : expoenseList.filter((expense) => expense.category === filter)

  const handleDelete = async (id) => {
      try {
        await dispatch(action.deleteExpense(id))
        await dispatch(action.fetchExpenses())
        addToast( "Expense deleted successfully",)
      } catch (error) {
        addToast(
            "Failed to delete expense",
        )
      }
    
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (editingExpense) {
    return (
      <div className="space-y-4">
        <ExpenseForm expense={editingExpense} onCancel={() => setEditingExpense(null)} />
      </div>
    )
  }

  return (
    <div className="w-full bg-white p-6 rounded-2xl shadow-md border border-border space-y-6">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-primary">Recent Expenses</div>
            <div className="flex items-center gap-2">
            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-40 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
                {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                </option>
                ))}
            </select>
            </div>

        </div>
      </div>
      <div>
        {
        filteredExpenses?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {filter === "all" ? "No expenses found" : `No expenses found in ${filter} category`}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredExpenses?.map((expense) => (
              <div
                key={expense._id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium text-card-foreground">{expense.description}</h3>
                    <Badge className={getCategoryColor(expense.category)}>{expense.category}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-medium">${expense.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(expense.date)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingExpense(expense)}
                    className="hover:bg-accent"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(expense._id)}
                    className="hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
