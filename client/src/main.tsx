import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Router from './Router'
import { LanguageProvider } from './context/LanguageProvider'
import "./App.css"
import { store } from './store/store'
import { Provider } from "react-redux";
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <LanguageProvider>
        <Router />
      </LanguageProvider>
    </Provider>
  </BrowserRouter>
)
