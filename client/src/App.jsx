import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutLogin from './layouts/LayoutLogin';
import AuthLayout from './layouts/AuthLayout';
import { AuthProvider, RolesProvider, FormsProvider, ResponsesProvider, UsersProvider, ChargeDataProvider } from './context/Context'
import { ProtectedRoute, ProtectedForm } from './routes'
import {
  Login,
  ForgetPassword,
  NewPassword,
  Home,
  RegisterAdmin,
  Quest,
  CreateQuest,
  EditQuest,
  Results,
  ResultQuest,
  Topics,
  Forms,
  UserValidation,
  Response,
  RegisterUsers,
  ChargeData
} from './pages/Pages';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <RolesProvider>
        <FormsProvider>
          <ResponsesProvider>
            <UsersProvider>
              <ChargeDataProvider>
                <BrowserRouter>
                  <Routes>

                    <Route path='/' element={<LayoutLogin />}>
                      <Route index element={<Login />} />
                      <Route path='forget-password' element={<ForgetPassword />} />
                      <Route path='reset-password' element={<NewPassword />} />
                      <Route path='confirm/:id' element={<ConfirmAccount />} />
                    </Route>

                    <Route element={<ProtectedRoute />}>
                      <Route path='/inicio' element={<AuthLayout />}>
                        <Route index element={<Home />} />
                        <Route path='tematicas/:id' element={<Topics />} />
                        <Route path='tematicas/:id/encuestas/:idtopic' element={<Forms />} />
                        <Route path='charge-data' element={<ChargeData />} />
                        <Route path='register-admin' element={<RegisterAdmin />} ></Route>
                      </Route>
                      <Route path='/crear-formulario' element={<AuthLayout />}>
                        <Route index element={<Quest />} />
                        <Route path='crear' element={<CreateQuest />} />
                        <Route path='editar/:id' element={<EditQuest />} />
                      </Route>
                      <Route path='/resultados' element={<AuthLayout />}>
                        <Route index element={<Results />} />
                        <Route path=':idform' element={<ResultQuest />} />
                      </Route>
                    </Route>

                    <Route path='/forms' element={<LayoutLogin />}>
                      <Route path='v/:form' element={<UserValidation />} />
                      <Route element={<ProtectedForm />} >
                        <Route path='r/:idform' element={<Response />} />
                      </Route>
                    </Route>

                    <Route path='/users' element={<LayoutLogin />}>
                      <Route index element={<RegisterUsers />} />
                    </Route>

                  </Routes>
                </BrowserRouter>
              </ChargeDataProvider>
            </UsersProvider>
          </ResponsesProvider>
        </FormsProvider>
      </RolesProvider>
    </AuthProvider >
  )
}

export default App