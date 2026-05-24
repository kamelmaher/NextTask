import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Router from './Router'
import { LanguageProvider } from './context/LanguageProvider'
import "./App.css"
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <LanguageProvider>
      <Router />
    </LanguageProvider>
  </BrowserRouter>
)
