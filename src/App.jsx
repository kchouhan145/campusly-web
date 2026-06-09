import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRuoute from './routes/ProtectedRoute';
import Home from './pages/Home';
import Events from './pages/Events';
import Marketplace from './pages/Marketplace';
import Profile from './pages/Profile';
import Lostfound from './pages/Lostfound';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import NotFoundPage from './pages/NotFoundPage';
import Singup from './pages/Singup';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={[<NavBar/>,<Login/>]}/>
        <Route path='/register' element={[<NavBar/>,<Singup/>]}/>
        <Route path="*" element={<NotFoundPage/>} />
        <Route path="/" element={<ProtectedRuoute><NavBar/><Home/></ProtectedRuoute>} />
        <Route path='/events' element={<ProtectedRuoute><NavBar/><Events/></ProtectedRuoute>}/>
        <Route path='/market' element={<ProtectedRuoute><NavBar/><Marketplace/></ProtectedRuoute>}/>
        <Route path='/lostfound' element={<ProtectedRuoute><NavBar/><Lostfound/></ProtectedRuoute>}/>
        <Route path='/profile' element={<ProtectedRuoute><NavBar/><Profile/></ProtectedRuoute>}/>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
      />
    </div>
  )
}

export default App
