import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import LayoutLogin from './layouts/LayoutLogin';
import { RolesProvider } from './context/RolesProvider';
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
  ConfirmAccount
} from './pages/Pages';

function App() {
  return (
    <BrowserRouter>
      <RolesProvider>
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
            <Route path=':id/tematicas' element={<Topics />}/>
          </Route>
          <Route path='/crear-formulario' element={<AuthLayout />}>
            <Route index element={<Quest />} />
            <Route path='crear' element={<CreateQuest />} />
          </Route>
          <Route path='/resultados' element={<AuthLayout />}>
            <Route index element={<Results />} />
          </Route>
        </Routes>
      </RolesProvider>
    </BrowserRouter>
  )
}

export default App
