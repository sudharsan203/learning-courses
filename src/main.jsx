import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LearningProvider } from './context/LearningContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LearningProvider>
        <App />
      </LearningProvider>
    </BrowserRouter>
  </StrictMode>,
)
