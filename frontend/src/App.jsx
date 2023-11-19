import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import LayoutLogin from './layouts/LayoutLogin';
import {
  Home,
  Quest,
  Results,
  Topics,
  Login,
  CreateQuest,
  NewPassword,
  Register,
  ForgetPassword,
  ConfirmAccount,
  ResultQuest
} from './pages/Pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LayoutLogin />}>
          <Route index element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='forget-password' element={<ForgetPassword />} />
          <Route path='forget-password/:token' element={<NewPassword />} />
          <Route path='confirm/:id' element={<ConfirmAccount />} />


        </Route>
        <Route path='/inicio' element={<AuthLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path='/crear-formulario' element={<AuthLayout />}>
          <Route index element={<Quest />} />
          <Route path='crear' element={<CreateQuest />} />
        </Route>
        <Route path='/resultados' element={<AuthLayout />}>
          <Route index element={<Results />} />
          <Route path=':idQuest' element={<ResultQuest />} />
        </Route>
        <Route path='/tematicas' element={<AuthLayout />}>
          <Route index element={<Topics />} />
          <Route path=':idrol' element={<Topics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
