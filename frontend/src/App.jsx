import React from 'react';
import './app.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import Home from './pages/Home';
import Quest from './pages/Quest';
import Results from './pages/Results';
import LayoutLogin from './layouts/LayoutLogin';


import Login from './pages/Login';
import NewPassword from './pages/NewPassword';
import Register from './pages/Register';
import ForgetPassword from './pages/ForgetPassword';
import ConfirmAccount from './pages/ConfirmAccount';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LayoutLogin />}>
          <Route index element={<Login />} />
          <Route path='register' element={<Register/>} />
          <Route path='forget-password' element={<ForgetPassword />} />
          <Route path='forget-password/:token' element={<NewPassword />} />
          <Route path='confirm/:id' element={<ConfirmAccount />} />
          

        </Route>
        <Route path='/inicio' element={<AuthLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path='/crear-formulario' element={<AuthLayout />}>
          <Route index element={<Quest />} />
        </Route>
        <Route path='/resultados' element={<AuthLayout />}>
          <Route index element={<Results />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
