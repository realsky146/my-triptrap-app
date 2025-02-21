import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './page/style/index.css'
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
