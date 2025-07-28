import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
      background: {
        default: "#FAF7F3",  // Tło główne - beżowe
      },
      primary: {
        main: "#F6DFD1",     // Różowo brzoskwiniowy
        contrastText: "#1A1A1A", // Ciemny tekst na głównym kolorze
      },
      // secondary: {
      //   main: "#808000",   // Pastelowy róż - do przycisków, akcentów
      // },
      text: {
        primary: "#1A1A1A", 
      },
    },
    typography: {
        fontFamily: `"Quicksand"`,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: "#F3EDE4",  // Karty z kremowym tłem
            borderRadius: "16px",         // Zaokrąglone rogi
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)", // Delikatny cień
          },
        },
      },
  
      MuiInputLabel: {
        styleOverrides: {
          root: {
            '&.Mui-focused': {
              color: 'gray', 
            },
          },
        },
      },
      MuiSwitch: {
      styleOverrides: {
        switchBase: {
          padding: 9,
          color: '#EAC1B1', // kolor kółka gdy wyłączony
          '&.Mui-checked': {
            transform: 'translateX(20px)',
            color: '#EAC1B1', // kolor kółka gdy włączony
            '& + .MuiSwitch-track': {
              backgroundColor: '#EAC1B1', // kolor toru gdy włączony
              opacity: 1,
            },
          },
        },
        // track: {
        //   borderRadius: 16,
        //   backgroundColor: '#f5d6cc', // kolor toru gdy wyłączony
        //   opacity: 1,
        // },
      },
    },
  },
});
      // MuiButton: {
      //   styleOverrides: {
      //     root: {
      //       //borderRadius: "999px",   // Określenie zaokrąglonych przycisków
      //       backgroundColor: "#1A1A1A",
      //       fontSize: "0.7rem",           // mniejszy tekst
      //       padding: "2px 8px",           // mniejsze wnętrze przycisku
      // minHeight: "24px",            // niższy przycisk
      // lineHeight: "1", 
      //     },
      //   },
      // },
  
  export default theme;