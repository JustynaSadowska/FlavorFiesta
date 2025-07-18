import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/layout/styles.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-toastify/dist/ReactToastify.css';
import theme from "./app/layout/Theme";  
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router';
import { router } from './app/router/Routes';
import { store, StoreContext } from './lib/stores/store';
import {ToastContainer} from 'react-toastify';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreContext.Provider value={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> 
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <ToastContainer position= 'bottom-right' hideProgressBar theme='colored'/>
          <RouterProvider router={router}/>
        </QueryClientProvider>
      </ThemeProvider>
    </StoreContext.Provider>
  </StrictMode>,
)