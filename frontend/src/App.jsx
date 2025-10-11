import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import IntroPage from "./pages/IntroPage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import CryptoCoinsPage from "./pages/CryptoCoinsPage"
import CoinDetailsPage from "./pages/CoinDetailPage"

const ProtectedRoute = ({ children }) => {
  const { user, token, loading } = useContext(AuthContext);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/home"
            element={<ProtectedRoute> <HomePage /> </ProtectedRoute>}
          />

          <Route
            path="/coins"
            element={<ProtectedRoute> <CryptoCoinsPage /> </ProtectedRoute>}
          />

          <Route
            path="/coin/:id"
            element={<ProtectedRoute> <CoinDetailsPage /> </ProtectedRoute>}
          />

        </Routes>
      </Router>
    </>
  )
}

export default App
