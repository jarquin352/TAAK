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

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


class Register extends React.Component {

	render() {
		return (
			<Container component="main" maxWidth="xs" sx={{ px:1, py:1 }}>
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
                        <Avatar src="./public/js/taak-org.png" sx={{
                            width: '25%',
                            height: '25%',
                            bgcolor: 'transparent',
                            color: 'primary.contrastText',
                            fontSize: 32,
                            fontWeight: 'bold',
                            borderRadius: 0
                        }} />
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="given-name"
									name="firstName"
									required
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="family-name"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="username"
									label="User Name"
									name="username"
									autoComplete="username"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
								/>
							</Grid>
							<Grid item xs={12}>
                                <Select
                                    native
                                    fullWidth
                                    id="user-type"
                                    label="User Type"
                                    inputProps={{
                                        name: 'user-type',
                                        id: 'user-type',
                                    }}
                                >
									<option title>Select Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="member">Member</option>
                                </Select>
                            </Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link to="/login" variant="body2" component={NavLink}>
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		);
	}
}
export default Register;




// 	handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       login_name: data.get('username'),
//       password: data.get('password'),
//     });

// 		axios
//       .post("api/user", {
// 				first_name: data.get('firstName'),
// 				last_name: data.get('lastName'),
//         user_name: data.get('username'),
//         password: data.get('password')
//       })
//       .then(response => {
//         //message 200
//         let user = response.data;
//         this.props.changeLoggedIn(user);
//         window.location.href = '/';
//       })
//       .catch(err => {
// 				console.log(err.response.data);
// 				alert(err.response.data);
//       });
//   };