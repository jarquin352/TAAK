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
import { Visibility, VisibilityOff } from '@material-ui/icons';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current_user: null,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            showPassword: false,
            skills:[],
            avatarUrl: 'https://via.placeholder.com/150',
        };
    }

      componentDidMount() {
        this.checkLogin();
        this.getUserInfo();
      }
/*Login Authentication */
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
/*Login Authentication */
/*User Settings */

//pull user information
getUserInfo = () =>{
    axios.get('/api/selfUser')
    .then((response) => {
      if (response.status===200) {     
        console.log(response.data)         
        this.setState({
            firstName: response.data.name.split(" ")[0],
            lastName: response.data.name.split(" ")[1],
            email: response.data.authid.email,
            password: response.data.authid.password,
            skills:response.data.skills
        });
        console.log(this.state.skills)
      }
    })
    .catch(err => {
        console.log(err.response.data);
      });
}

submitUserEdits = () => {
    const {firstName, lastName, email, password, skills} = this.state;
    const skillSet = skills.split(',')
    const userChanges = {		  
    name: firstName + ' ' + lastName,
    email: email,
    password: password,
    skills:skillSet
    }
    console.log(userChanges)
    // axios
    //     .post('api/editUser', userChanges)
    //     .then((response) => {
    //         console.log(response.data);
    //         this.getUserInfo();
    //         location.reload();

    //     })
    //     .catch(err => {
    //         console.log(err.response.data);
    //     });
}

toggleShowPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }));
  }


/*User Settings */
/*Avatar Styling */
stringToColor = (string) => {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
    stringAvatar = (name) =>{
    return {
        sx: {
        bgcolor: this.stringToColor(name),
        color:'white',
        width: 150, height: 150,
        fontSize: 85
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
    }

/*End of Avatar Styling */


    render() {
        return (
            <div>
                <Container component="main" maxWidth="md">
                    <CssBaseline />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '100px' }}>
                        <Avatar {...this.stringAvatar(this.state.firstName + ' ' +this.state.lastName)} />
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
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        value={this.state.password}
                                        onChange={(event) => this.setState({ password: event.target.value })}
                                        InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                            <IconButton onClick={this.toggleShowPassword}>
                                                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                            </InputAdornment>
                                        )
                                        }}
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
                                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick = {this.submitUserEdits}>
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
