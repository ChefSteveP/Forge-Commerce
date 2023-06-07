// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9381ff',
    },
    secondary: {
      main: '#b8b8ff',
    },
    background: {
      default: '#f8f7ff',
    },
    text: {
      primary: '#000000',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 400,
  },
});

export default theme;
