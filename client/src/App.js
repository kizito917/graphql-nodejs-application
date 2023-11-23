import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Index from './pages/Index';
import Register from './pages/Register';
import DashboardMainPage from './pages/dashboard/Index';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' exact element={<Index />} />
          <Route path='/register' exact element={<Register />} />
          <Route path="/dashboard" exact element={<DashboardMainPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
