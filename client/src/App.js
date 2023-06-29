import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import NavigationBar from './components/NavigationBar';
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
    <NavigationBar />
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
