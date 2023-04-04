import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import TopBar from './components/topBar/TopBar';
import Home from './components/home/Home';
import Announcements from './components/announcements/Announcements'
// import TaskList from './components/task/TaskList'; //obsolete?
import Tasks from './components/task/Tasks'
import AboutUs from './components/aboutUs/AboutUs';
import Login from './components/authentication/Login'
// import TaskAssigner from './components/task/TaskAssigner'



const theme = createTheme({
  palette: {
    background: {
      default: "#EBEDF0"
    }
  },
});


//This view will contain all static, or views that should remain in whichever route we nav to
//i.e, top bar, side bar, etc.
var view = (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <HashRouter>
      <TopBar />
      <Routes>
      	<Route exact path="/" element={<Home />}/>
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/tasks" element={<Tasks />} />
        {/* <Route path="/testing" element={<TaskAssigner />} /> */}
        <Route path="/testing" element={<Login />} />
      </Routes>
    </HashRouter>
  </ThemeProvider>
);

const root = ReactDOM.createRoot(document.getElementById('reactapp'));
root.render(view);
