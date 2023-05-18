import React from 'react';
import { NavLink } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
//import {users, authentication} from '../task/tasksTestData';


class Login extends React.Component {

	handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('username'),
          password: data.get('password'),
        });
    
            axios
          .post("api/login", {
            email: data.get('username'),
            password: data.get('password')
          })
          .then(response => {
            let user = response.data;
            this.props.changeLoggedIn(user);
          })
          .catch(err => {
                    console.log(err.response.data);
                    alert(err.response.data.error);
          });
      };

      
      render() {
        const { theme } = this.props;
		return (
            <div style={{ display: 'flex',
            backgroundImage: 'url("./public/js/HOME_BACKGROUND.png")', 
            backgroundSize: 'cover',
            ...theme,
            display: 'flex',}}>
                <Container maxWidth="xs" sx={{ px:1, py:1 }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
						justifyContent: 'center',
						height: '105vh'
                    }}>
                        <Typography variant="h3" component="h1" gutterBottom>
							Having Trouble Making Progress?
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            TAAK is a task ticket management tool designed to help teams manage projects in one place.
                        </Typography>
                    </Box>
                </Container>
                <Container component="main" maxWidth="xs" sx={{
                    px:1,
                    py:1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh'
                }}>
                    <Box sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
						borderLeft: '3px solid #7b849e',
						paddingLeft: 4 // add some padding to the left of the border
						
                    }}>
                        <Avatar src="./public/js/TAAK_BAR_WHITE_REGULAR.png" sx={{
                            width: 350,
                            height: 79,
                            bgcolor: 'transparent',
                            color: 'primary.contrastText',
                            fontSize: 32,
                            fontWeight: 'bold',
                            borderRadius: 0
                        }} />
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="User Name"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                    Forgot your<br />password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to="/register" variant="body2" component={NavLink}>
                                    <div>
                                        Don't have an account?
                                        <br />
                                        Get Started
                                    </div>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </div>
		);
	}
}

export default Login;


