import React from 'react';
import { NavLink } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormControlLabel, Checkbox } from '@mui/material';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FormGroup } from '@mui/material';
import axios from 'axios';

import Select from '@mui/material/Select';


class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
		  isAdmin: null
		};
	  }

	handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
		const userAccount = {		  
		name: data.get('firstName') + ' ' +  data.get('lastName'),
		email: data.get('username'),
		password: data.get('password'),
		teamCode: parseInt(data.get('teamcode')),
		isAdmin: this.state.isAdmin
		}
        console.log(userAccount);
        axios
          .post("api/user", userAccount)
          .then(response => {
            let user = response.data;
            this.props.changeLoggedIn(user);
			window.location.href = '/';
          })
          .catch(err => {
                    console.log(err.response.data);
                    alert(err.response.data);
          });
      };

	render() {
		return (
			<Container component="main" maxWidth="xs" sx={{ px:1, py:20, margin:'0 auto' }}>
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						
					}}
				>
                        <Avatar src="./public/js/TAAK_ROCKET_WHITE.png" sx={{
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
									label="Email"
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
								<TextField
									required
									fullWidth
									name="teamcode"
									label="Teamcode"
									id="teamcode"
									inputProps={{ maxLength: 7, type:'number', pattern: '[0-9]*' }}
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
									onChange={(event) => {
										console.log(event.target.value)
										if (event.target.value === 'admin'){
											this.setState({isAdmin: true}); // log the selected value
										}
										else{
											this.setState({isAdmin: false})
										}
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
