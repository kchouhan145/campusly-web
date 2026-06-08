import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
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
        <Route path="/" element={[<NavBar/>,<Home/>]} />
        <Route path='/events' element={[<NavBar/>,<Events/>]}/>
        <Route path='/market' element={[<NavBar/>,<Marketplace/>]}/>
        <Route path='/lostfound' element={[<NavBar/>,<Lostfound/>]}/>
        <Route path='/login' element={[<NavBar/>,<Login/>]}/>
        <Route path='/register' element={[<NavBar/>,<Singup/>]}/>
        <Route path='/profile' element={[<NavBar/>,<Profile/>]}/>
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </div>
  )
}

export default App
