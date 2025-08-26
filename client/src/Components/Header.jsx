"use client"

import {  useAuth } from "../Context/authContext"
import { Wallet, LogOut, User } from "lucide-react"

export default function Header() {
  const { user,logout } = useAuth()

  const handleLogout = async() => {
    await logout()    
  }

  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-700 shadow-md">
      <div className="container mx-auto px-6 py-3 max-w-6xl">
        <div className="flex items-center justify-between">
          {/* Logo + Title */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-wide">Expense Tracker</h1>
              <p className="text-xs text-white/80">Manage your finances</p>
            </div>
          </div>

          {/* User Info + Logout */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
              <User className="h-4 w-4 text-white/80" />
              <span className="text-sm text-white font-medium">
                {user?.name || "Guest"}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white text-blue-900 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-100 transition"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
