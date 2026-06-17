import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import AuthProvider from './context/Authcontext.jsx'
import AnalysisProvider from './context/AnalysisProvider.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
    <AnalysisProvider>
    <App />
     </AnalysisProvider>
  </AuthProvider>
  </BrowserRouter>
)
