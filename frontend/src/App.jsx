import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import Home from './pages/Home';
import Quest from './pages/Quest';
import Results from './pages/Results';
import LayoutLogin from './layouts/LayoutLogin';
import Login from './pages/Login';
import CreateQuest from './pages/CreateQuest';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LayoutLogin />}>
          <Route index element={<Login />} />
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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
