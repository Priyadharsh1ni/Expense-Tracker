import LoginPage from "./Components/LoginPage"
import { AuthContextProvider } from "./Context/authContext"
import { ToastProvider } from "./Components/hooks/toast"
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom"
import Dashboard from "./pages/dashboard"



export default function Page() {
  return (
    <AuthContextProvider>
      <ToastProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/expenses" element={<Dashboard />} />
          </Routes>
        </Router>
      </ToastProvider>
    </AuthContextProvider>
  )
}

