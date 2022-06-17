import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Topsection from './components/Topsection';
import { DashboardCustomizeTwoTone } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
function App() {
  return (
    <>
    <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
    <Navbar />
    <Topsection />
    </ThemeProvider>
    </>
  );
}
document.body.style.backgroundColor='#191919';
document.body.style.color='#ffffff';

export default App;
