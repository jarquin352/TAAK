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
import axios from 'axios';
class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current_user: null,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            skills:'',
            receiveEmails: false,
            avatarUrl: 'https://via.placeholder.com/150',
        };
    }

      componentDidMount() {
        this.checkLogin();
      }
    
      checkLogin() {
        axios.get('/api/currentUser')
          .then((response) => {
            if (response.status===200) {
              this.setState({current_user: response.data});
            }
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status===401) {
              window.location.href = '#/login';
            }
          });
      }

    render() {
        return (
            <div>
                <Container component="main" maxWidth="md">
                    <CssBaseline />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '100px' }}>
                        <Avatar src={this.state.avatarUrl} sx={{ width: 150, height: 150 }} />
                        <input type="file" />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                        <form>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="firstName"
                                        label="First Name"
                                        value={this.state.firstName}
                                        onChange={(event) => this.setState({ firstName: event.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="lastName"
                                        label="Last Name"
                                        value={this.state.lastName}
                                        onChange={(event) => this.setState({ lastName: event.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="email"
                                        label="Email Address"
                                        type="email"
                                        value={this.state.email}
                                        onChange={(event) => this.setState({ email: event.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        value={this.state.password}
                                        onChange={(event) => this.setState({ password: event.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="skills"
                                        label="Skills"
                                        type="text"
                                        value={this.state.skills}
                                        onChange={(event) => this.setState({ skills: event.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox color="primary" name="receiveEmails" />}
                                        label="Receive Emails"
                                        checked={this.state.receiveEmails}
                                        onChange={(event) => this.setState({ receiveEmails: event.target.checked })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                        Save Changes
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <NavLink to="/">Back to Home</NavLink>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Container>
            </div>
        );
    }
}

export default Settings;
