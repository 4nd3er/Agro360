import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import { AuthProvider } from './context/AuthContex';
import LayoutLogin from './layouts/LayoutLogin';
import { RolesProvider } from './context/RolesProvider';
import ProtectedRoute from './ProtectedRoute'
import {
  Home,
  Quest,
  Results,
  Topics,
  TopicsForm,
  Login,
  CreateQuest,
  NewPassword,
  Register,
  ForgetPassword,
  ConfirmAccount,
  ResultQuest,
  UserValidation,
  TokenValidation,
  Answers
} from './pages/Pages';

console.log(import.meta.env.VITE_BACKEND_URL)

function App() {
  return (
    <AuthProvider>
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


            <Route element={<ProtectedRoute />}>
              <Route path='/inicio' element={<AuthLayout />}>
                <Route index element={<Home />} />
                <Route path=':id/tematicas' element={<Topics />} />
              </Route>
              <Route path='/crear-formulario' element={<AuthLayout />}>
                <Route index element={<Quest />} />
                <Route path='crear' element={<CreateQuest />} />
              </Route>
              <Route path='/resultados' element={<AuthLayout />}>
                <Route index element={<Results />} />
              </Route>
            </Route>

          </Routes>
        </RolesProvider>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App