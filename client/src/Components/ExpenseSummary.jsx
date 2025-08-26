import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts"
import { DollarSign, TrendingUp, PieChartIcon, BarChart3 } from "lucide-react"
import { action } from "../redux/action"

const CATEGORY_COLORS = {
  Food: "#22c55e",       // emerald-500 
  Transport: "#3b82f6",    // blue-500
  Shopping: "#f97316",     // orange-500
  Utilities: "#6366f1",    // indigo-500
  Entertainment: "#ec4899",// pink-500
  Healthcare: "#06b6d4",   // cyan-500
  Other: "#9ca3af",        // gray-400
}

export default function Expensesummary() {
  const dispatch = useDispatch()
  const summary = useSelector((state) => state.expenses.summary)

  useEffect(() => {
    dispatch(action.fetchSummary())
  }, [dispatch])

  const chartData = Object.entries(summary?.byCategory || {}).map(([category, amount]) => ({
    name: category,
    value: amount,
    color: CATEGORY_COLORS[category] || CATEGORY_COLORS.Other,
  }))

  const sortedData = [...chartData].sort((a, b) => b.value - a.value)

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0]
      return (
        <div className="bg-white border border-gray-300 rounded-lg p-2 shadow-md">
          <p className="font-medium">{data.payload.name}</p>
          <p className="text-blue-600 font-semibold">${data.value.toFixed(2)}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Total Expenses Card */}
      <div className="p-5 rounded-2xl bg-white shadow-md border border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
          <DollarSign className="h-5 w-5 text-blue-600" />
        </div>
        <div className="mt-3">
          <p className="text-3xl font-bold text-blue-700">
            ${(summary?.total || 0).toFixed(2)}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Across {Object.keys(summary?.byCategory || {}).length} categories
          </p>
        </div>
      </div>

      {/* Top Category Card */}
      <div className="p-5 rounded-2xl bg-white shadow-md border border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-500">Top Category</h3>
          <TrendingUp className="h-5 w-5 text-blue-500" />
        </div>
        <div className="mt-3">
          {sortedData.length > 0 ? (
            <>
              <p className="text-2xl font-bold text-gray-800">{sortedData[0].name}</p>
              <p className="text-sm text-gray-500">${sortedData[0].value.toFixed(2)}</p>
            </>
          ) : (
            <p className="text-gray-400">No expenses yet</p>
          )}
        </div>
      </div>

      {/* Pie Chart Card */}
      <div className="md:col-span-1 p-5 rounded-2xl bg-white shadow-md border border-gray-200">
        <div className="flex items-center gap-2 mb-4 text-blue-600 font-medium">
          <PieChartIcon className="h-5 w-5" />
          Expense Breakdown
        </div>
        {chartData.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-gray-400">
            No expense data to display
          </div>
        ) : (
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Bar Chart Card */}
      <div className="md:col-span-1 p-5 rounded-2xl bg-white shadow-md border border-gray-200">
        <div className="flex items-center gap-2 mb-4 text-blue-600 font-medium">
          <BarChart3 className="h-5 w-5" />
          Top Categories
        </div>
        {sortedData.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-gray-400">
            No expense data to display
          </div>
        ) : (
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sortedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {sortedData.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  )
}
