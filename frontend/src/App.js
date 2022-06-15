import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Topsection from './components/Topsection';
import Table from './components/Table';
function App() {
  return (
    <>
    <Navbar />
    <Topsection />
    <Table />
    </>
  );
}
document.body.style.backgroundColor='#191919';
export default App;
