import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast';
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import "./index.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider >
    <App />
     <Toaster  position="top-center" />
    </ThemeProvider>
  </StrictMode>,
)
