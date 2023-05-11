import ReactDOM from 'react-dom/client';
import React from 'react';
import { HashRouter, Routes, Route} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import TopBar from './views/topBar/TopBar';
import Home from './views/home/Home';
import Tasks from './views/task/Tasks'
import AboutUs from './views/aboutUs/AboutUs';
import Login from './views/authentication/Login'
import Register from './views/authentication/Register'
import Settings from './views/settings/Settings'
import { NavLink, Navigate } from "react-router-dom";
import axios from 'axios';
import './index.css'


const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: 'transparent',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: `
            linear-gradient(112.1deg, #121222 11.4%, rgb(63, 76, 119) 300.2%),
            radial-gradient(circle at top left, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.05) 80%),
            radial-gradient(circle at bottom right, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.05) 80%)
          `,
        },
      },
    },
  },
});



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_user: null,
      isAuthenticated: false
    };
  }

  componentDidMount(){
    this.checkLogin();
  }

  checkLogin = () => {
    axios.get('/api/currentUser')
      .then((response) => {
        if (response.status===200) {
          this.setState({current_user: response.data, isAuthenticated: true});
        } else {
          this.setState({isAuthenticated: false});
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status===401) {
          this.setState({isAuthenticated: false});
        }
      });
  }

  changeLoggedIn = user => {
    this.setState({ current_user: user, isAuthenticated: true });
  };

  render() {
    const { isAuthenticated } = this.state;
    return (
      <>
        {isAuthenticated && <TopBar />}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/tasks" element={<Tasks />} />
          { isAuthenticated ?
            <Route path="/login" element={<Navigate to="/" />} />:
            <Route path="/login" element={<Login changeLoggedIn={this.changeLoggedIn} />} />
          }
          <Route path="/register" element={<Register changeLoggedIn = {this.changeLoggedIn} />} />
          <Route path="/settings" element={<Settings  />} />
        </Routes>
      </>
    );
  }
}

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
