import { useState } from "react"
import { useDispatch } from "react-redux"
import { action } from "../redux/action"
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Input,
  Select,
  MenuItem,
} from "@mui/material"

const CATEGORIES = ["Food", "Transport", "Shopping", "Utilities", "Entertainment", "Healthcare", "Other"]

export default function ExpenseForm({ expense = null, onCancel = null }) {
  console.log("🚀 ~ ExpenseForm ~ expense:", expense)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    description: expense?.description || "",
    amount: expense?.amount || "",
    category: expense?.category || "",
    date: expense?.date ? new Date(expense.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.description || !formData.amount || !formData.category) {
      return
    }

    const expenseData = {
      ...formData,
      amount: Number.parseFloat(formData.amount),
      date: new Date(formData.date),
    }

    try {
      if (expense) {
        await dispatch(action.updateExpense(expense._id, expenseData))
        await dispatch(action.fetchExpenses()) 
      } else {
        await dispatch(action.createExpense(expenseData))
        await dispatch(action.fetchExpenses()) 
      }

      if (onCancel) onCancel()
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error)
    }
  }

  return (
    <Dialog open={true} onClose={onCancel} fullWidth maxWidth="sm">
      <DialogTitle>{expense ? "Edit Expense" : "Add New Expense"}</DialogTitle>
      <DialogContent>
        <DialogContentText>Please enter the expense details below</DialogContentText>
        {/* ✅ form wraps everything including buttons */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="description">Description</label>
            <Input
              id="description"
              type="text"
              placeholder="Enter expense description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              fullWidth
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="amount">Amount ($)</label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
              fullWidth
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category">Category</label>
            <Select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              fullWidth
              required
            >
              <MenuItem value="">Select a category</MenuItem>
              {CATEGORIES.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="date">Date</label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              fullWidth
            />
          </div>

          <DialogActions>
            <Button type="submit" variant="contained" color="#166534">
              {expense ? "Update" : "Add"} Expense
            </Button>
            {onCancel && (
              <Button type="button" variant="outlined" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}
