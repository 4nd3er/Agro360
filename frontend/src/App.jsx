import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConfirmAccount, ForgetPassword, Home, Login, NewPassword, Quest, Register, Results } from './pages/pages.js';
import AuthLayout from './layouts/AuthLayout';
import GuestLayout from './layouts/GuestLayout';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        //Rutas del Login
        <Route path='/' element={<GuestLayout />}>
          <Route index element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='forget-password' element={<ForgetPassword />} />
          <Route path='forget-password/:token' element={<NewPassword />} />
          <Route path='confirm/:id' element={<ConfirmAccount />} />
        </Route>
        //Rutas del Home
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
