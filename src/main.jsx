import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './routes/route.jsx'
import AuthProvider from './context/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
// import { HelmetProvider } from 'react-helmet-async'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
       <QueryClientProvider client={queryClient}>
        {/* <HelmetProvider> */}
    <AuthProvider>
     <RouterProvider router={router} />
     </AuthProvider>
     <Toaster></Toaster>
      <ReactQueryDevtools initialIsOpen={false} />
      {/* </HelmetProvider> */}
        </QueryClientProvider>

  </StrictMode>,
)
