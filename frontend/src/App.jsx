
import React from 'react'
import './App.css'
import Signin from './Signin'

import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './Home'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Signin />}/>
          <Route path="/home" element={<Home/>} />


        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
