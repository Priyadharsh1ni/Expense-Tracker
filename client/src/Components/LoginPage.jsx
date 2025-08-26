"use client"

import { useState } from "react"
import { Wallet, Mail, Lock, Loader2 } from "lucide-react"
import { useAuth } from "../Context/authContext"
import { useToast } from "./hooks/toast"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)


  const { login } = useAuth()
  const {addToast} = useToast()
  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    await login(email, password)
    addToast(
     "Login successful"
    )
     window.location.href = "/expenses"; 
     setLoading(false)
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-blue-900 rounded-full">
              <Wallet className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500">Sign in to your Expense Tracker account</p>
        </div>

        {/* Form */}
        <form  className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                disabled={loading}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                disabled={loading}
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center items-center rounded-md bg-blue-900 text-white py-2 text-sm font-medium hover:bg-blue-800 focus:outline-none disabled:opacity-70"
            disabled={loading}
            onClick={(e) => handleSubmit(e)}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
             ) : ( 
               "Sign In" 
            )} 
          </button>
        </form>
      </div>
    </div>
  )
}
