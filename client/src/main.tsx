import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/layout/styles.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from './app/layout/App';
import theme from "./app/layout/Theme";  // Zaimportowanie pliku z theme
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { CssBaseline } from '@mui/material';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Resetuje style, stosuje nasz theme */}
      <App />
    </ThemeProvider>
  </StrictMode>,
)