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
import HomeIcon from '@mui/icons-material/Home';

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
            skills:'',
            avatarUrl: 'https://via.placeholder.com/150',
            teamName:'',
            teamCode:'',
            teamMembers:[]
        };
    }

      componentDidMount() {
        this.checkLogin();
        this.getUserInfo();
        this.getTeam();
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
            skills:response.data.skills.join()
        });
      }
    })
    .catch(err => {
        console.log(err.response.data);
      });
}

submitUserEdits = () => {
    const { firstName, lastName, email, password, skills } = this.state;
    console.log(firstName, lastName, email, password, skills);
    const userChanges = {
      name: firstName + ' ' + lastName,
      email: email,
      password: password,
      skills: skills.split(',')
    };
    console.log(userChanges);
    axios
      .post('api/editUser', userChanges)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  

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
/*Team Member Information */

getTeam = () => {
  axios
  .get('/api/getTeam')
  .then(response => {
    console.log(response.data)
    this.setState({
      teamName:response.data.teamName,
      teamCode:response.data.teamCode,
      teamMembers:response.data.teamMembers
    });
  })
  .catch(error => {
    console.log(error);
    if (error.response.status===401) {
      window.location.href = '#/login';
    }
  });
}
/*Team Member Information */
    render() {
        return (
            <div>
                <Container component="main" maxWidth="md">
                    <CssBaseline />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '100px' }}>
                        <Avatar {...this.stringAvatar(this.state.firstName + ' ' +this.state.lastName)} />
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '100px', my: -13}}>
              
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                                <TextField
                                  disabled
                                  fullWidth
                                  id="outlined-disabled"
                                  label="Team Name"
                                  value={this.state.teamName}
                                />
                        </Grid>
                        <Grid item xs={12}>
                              <TextField
                                disabled
                                fullWidth
                                id="outlined-disabled"
                                label="Team Code"
                                value={this.state.teamCode}
                              />
                        </Grid>
                        <Grid item xs={12}>
                        <ul style={{ listStyleType: 'none' }}>
                          {this.state.teamMembers.map((member) => (
                            <li key={member._id} style={{padding:4}}>
                              <span
                                style={{
                                  backgroundColor: '#35374C',
                                  color: '#D7D7D7',
                                  borderRadius: '15px',
                                  padding: '3px 10px',
                                }}
                              >
                                {member.name}
                              </span>
                            </li>
                          ))}
                        </ul>
                        </Grid>
                      </Grid>
                    </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
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
                                    <Button type="submit" fullWidth variant="contained" style={{backgroundColor:'#191943', color:'#AFB3CF', border: '3px double rgba(25, 31, 69, 0.1)', borderRadius: "10px"}} onClick = {this.submitUserEdits}>
                                        Save Changes
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                  <Button component={NavLink} to="/" fullWidth variant="contained" style={{backgroundColor:'#303046', color:'#AFB3CF', border: '3px double rgba(25, 31, 69, 0.1)', borderRadius: "10px"}}>
                                    <Typography type="h4">Return Home </Typography><HomeIcon/>
                                  </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                    </Box>
                </Container>
            </div>
        );
    }
}

export default Settings;
