import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutLogin from './layouts/LayoutLogin';
import AuthLayout from './layouts/AuthLayout';
import { AuthProvider, RolesProvider, FormsProvider, ResponsesProvider, UsersProvider } from './context/Context.js'
import ProtectedRoute from './routes.jsx'
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
  Response,
  Users
} from './pages/Pages';
import Spinner from './components/Spinner';

function App() {
  return (
    <AuthProvider>
      <RolesProvider>
        <FormsProvider>
          <ResponsesProvider>
            <UsersProvider>
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
                    <Route path='tematicas/:id' element={<Topics />} />
                    <Route path='tematicas/:id/encuestas/:idtopic' element={<TopicsForm />} />
                  </Route>
                  <Route path='/crear-formulario' element={<AuthLayout />}>
                    <Route index element={<Quest />} />
                    <Route path='crear' element={<CreateQuest />} />
                  </Route>
                  <Route path='/resultados' element={<AuthLayout />}>
                    <Route index element={<Results />} />
                    <Route path=':idQuest' element={<ResultQuest />} />
                  </Route>
                  <Route path='/forms/v/:idform' element={<LayoutLogin />}>
                    <Route index element={<UserValidation />} />
                  </Route>
                  <Route path='/forms/r/:idform' element={<LayoutLogin />}>
                    <Route index element={<Response />} />
                  </Route>
                  <Route path='/users' element={<LayoutLogin />}>
                    <Route index element={<Users />} />
                  </Route>

                </Routes>
              </BrowserRouter>
            </UsersProvider>
          </ResponsesProvider>
        </FormsProvider>
      </RolesProvider>
    </AuthProvider>
  )
}

export default App