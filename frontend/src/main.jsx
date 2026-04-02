import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/Home.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Results } from './pages/Results.jsx'
import Layout from './layouts/Layout.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* LanguageProvider wraps everything so all components can access translations */}
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>,
)
