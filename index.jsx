import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import TopBar from './components/topBar/TopBar';
import Home from './components/home/Home';
import Announcements from './components/announcements/Announcements'
// import TaskList from './components/task/TaskList'; //obsolete?
import Tasks from './components/task/Tasks'
import AboutUs from './components/aboutUs/AboutUs';
import Login from './components/authentication/Login'
import Register from './components/authentication/Register'
// import TaskAssigner from './components/task/TaskAssigner'

const theme = createTheme({
  palette:{
    mode: 'dark'
  }
})

const App = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/register' && <TopBar />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/testing" />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

const view = (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <HashRouter>
      <App />
    </HashRouter>
  </ThemeProvider>
);

const root = ReactDOM.createRoot(document.getElementById('reactapp'));
root.render(view);
