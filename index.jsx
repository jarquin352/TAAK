import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import TopBar from './components/topBar/TopBar';
import Home from './components/home/Home';
import Announcements from './components/announcements/Announcements'
import Task from './components/task/TaskList';

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
      </Routes>
    </HashRouter>
  </ThemeProvider>
);

const root = ReactDOM.createRoot(document.getElementById('reactapp'));
root.render(view);
