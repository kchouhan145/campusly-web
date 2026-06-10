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
import Getapp from './pages/Getapp';
import Footer from './components/Footer';
import Chat from './pages/Chat';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={[<NavBar/>,<Login/>,<Footer/>]}/>
        <Route path='/register' element={[<NavBar/>,<Singup/>,<Footer/>]}/>
        <Route path="*" element={[<NavBar/>,<NotFoundPage/>,<Footer/>]} />
        <Route path='download' element={[<NavBar/>,<Getapp/>,<Footer/>]}/>
        <Route path="/" element={<ProtectedRuoute><NavBar/><Home/><Footer/></ProtectedRuoute>} />
        <Route path='/events' element={<ProtectedRuoute><NavBar/><Events/><Footer/></ProtectedRuoute>}/>
        <Route path='/market' element={<ProtectedRuoute><NavBar/><Marketplace/><Footer/></ProtectedRuoute>}/>
        <Route path='/lostfound' element={<ProtectedRuoute><NavBar/><Lostfound/><Footer/></ProtectedRuoute>}/>
        <Route path='/chat' element={<ProtectedRuoute><NavBar/><Chat/><Footer/></ProtectedRuoute>}/>
        <Route path='/profile' element={<ProtectedRuoute><NavBar/><Profile/><Footer/></ProtectedRuoute>}/>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
      />
    </div>
  )
}

export default App
