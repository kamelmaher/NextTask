import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Router from './Router'
import "./styles.css"
import { store } from './store/store'
import { Provider } from "react-redux";
// import { Analytics } from "@vercel/analytics/react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router />
      </Provider>
    </QueryClientProvider>
    {/* <Analytics /> */}
  </BrowserRouter>
)
