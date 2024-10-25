import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import UserInstallmetStatus from './Components/UserInstallmetStatus'
import AddEvents from './Components/AddEvents';
import css from './css/sb-admin-2.css';
import fontawesome from './vendor/fontawesome-free/css/all.min.css';
import LoginPage from './Components/Login';
import RegisterPage from './Components/Register';
import AddProduct from './Components/AddProduct';
import Home from './Pages/Home';
import store from './store';

const App = () => {
  const token = useSelector(state => state.user.token);
   console.log(token)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={token ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path='/register' element={token ? <Navigate to="/dashboard" /> : <RegisterPage />} />
        <Route path='/dashboard' element={token ? <Home /> : <Navigate to="/" />} />
        {/* <Route path='/addmusic' element={token ? <Addmusic /> : <Navigate to="/" />} /> */}
        <Route path='/add-product' element={token ? <AddProduct /> : <Navigate to="/" />} />
        {/* <Route path='/user-installment-status' element={token ? <UserInstallmetStatus /> : <Navigate to="/" />} />
        <Route path='/add-events' element={token ? <AddEvents /> : <Navigate to="/" />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
