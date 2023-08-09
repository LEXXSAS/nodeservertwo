import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import React, {useState} from 'react';
import Navbaar from './components/Navbaar';
import Home from './components/Home';
import Register from './components/Register';
import Edit from './components/Edit';
import Details from './components/Details';
import {Navigate, Route, Routes} from "react-router-dom"
import { AppContext } from './components/context';
import Loginpage from './pages/Loginpage';



function App() {
  const [localEmail, setLocalEmail] = useState('');

  return (
    <AppContext.Provider value={{localEmail, setLocalEmail}} >
    <Navbaar />
    <Routes>
    <Route>
      <Route path='/' element={<Loginpage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/view/:id" element={<Details />} />
    </Route>
    </Routes>
    </AppContext.Provider>
  );
}

export default App;
