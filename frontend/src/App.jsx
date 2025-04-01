import React from 'react';
import Home from './components/home';
import Login from './components/Login';
import Signup from './components/Signup';
import PageNotFound from './components/pagenotfound';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  const token= localStorage.getItem("jwt")
  return( 
    <div >
      <Routes>
        <Route path='/' element={token?<Home/> : Navigate("/login")}/> 
        <Route path='*' element={<PageNotFound/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>

    </div>
  )
}

export default App;
