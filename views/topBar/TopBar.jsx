import React from 'react';
import { NavLink } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


//adding sidebar
import { Drawer } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

//icons + styling
import HomeIcon from '@mui/icons-material/Home';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import TaskAltTwoToneIcon from '@mui/icons-material/TaskAltTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import InfoIcon from '@mui/icons-material/Info';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

import axios from 'axios';

//front end data

function stringToColor(string) {
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


class TopBar extends React.Component {
  
  //changing the state of the drawer opening, by default this will be false
  constructor(props){
    super(props);
    this.state = {
      drawerOpen: false,
      //users: users,
      //projTeam: projTeam
      projTeam: [],
    }
  }
  
  componentDidMount(){
    this.getTeamMembers();
  }

  stringAvatar = (name)=> {
   return {
     sx: {
       bgcolor: stringToColor(name),
       color:"black"
     },
     children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
   }
  }

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

  handleLogout = () => {
		axios.post('/api/logout')
			.then((response) => {
				if (response.status===200) {
					console.log(response);
					location.reload();
				}
			})
			.catch((error) => {
				console.log(error.data);
			});
	}

  getTeamMembers = () =>{
    axios
      .get('/api/getTeam')
      .then(response => {
        console.log(response)
        this.setState({
          projTeam:response.data.teamMembers
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  
  render() {
    const {projTeam} = this.state;
    console.log(projTeam)
    return (
      <div>
        <AppBar position="static" style={{ background: '#191931', boxShadow: 'none' }}>
          <Toolbar className="taak-toolbar">

            {/* Button for the side bar, dynamic for now? */}
            <Button onClick={() => this.setState({ drawerOpen: !this.state.drawerOpen })}>
              <MenuTwoToneIcon sx ={{color:'white'}}/>
            </Button>

            {/* <Typography variant="h6" className="taak-logo">
              TAAK - A Task Ticket Management System
            </Typography> */}

            <Typography variant="h6" sx={{ width: '25%', display: 'block', margin: '0 auto', textAlign:'center' }} >
            <img src={"./public/js/TAAK_BAR_WHITE_REGULAR_reduced.png"} alt="TAAK Logo" className="taak-logo" sx={{ width: '25%', display: 'block', margin: '0 auto' }}/>
            </Typography>

            {/* Adding Avatar component for profile icon, needs a state for person name */}
            <Stack direction="row" spacing={2}>
              <AvatarGroup max = {3}>
              {projTeam.map(member => (
                
                <Avatar key={member._id} {...this.stringAvatar(member.name)} alt={member.name} />
              ))}
              </AvatarGroup>
              <Avatar alt="Profile Image" src="/path/to/profile/image" />
            </Stack>
          </Toolbar>
        </AppBar>

        <Drawer 
          anchor="left"
          open={this.state.drawerOpen}
          variant="permamant" 
          onClose={() => this.setState({ drawerOpen: false })}
          ModalProps={{
            keepMounted: true // to avoid any issue with react strict mode
          }}
          sx={{
            width: 60
          }}>
          
          <List>
            <ListItem button component={NavLink} to="/" onClick={() => this.setState({ drawerOpen: false })}>
              <ListItemIcon><HomeIcon/></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>

            <ListItem button component={NavLink} to="/tasks" onClick={() => this.setState({ drawerOpen: false })}>
              <ListItemIcon><TaskAltTwoToneIcon/></ListItemIcon>
              <ListItemText primary="Assigned Tasks" />
            </ListItem>

            <ListItem button component={NavLink} to="/messages" onClick={() => this.setState({ drawerOpen: false })}>
              <ListItemIcon><EmailTwoToneIcon/></ListItemIcon>
              <ListItemText primary="Group Chat" />
            </ListItem>

            <ListItem button component={NavLink} to="/settings" onClick={() => this.setState({ drawerOpen: false })}>
              <ListItemIcon><SettingsTwoToneIcon/></ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>

            <ListItem button component={NavLink} to="/aboutUs" onClick={() => this.setState({ drawerOpen: false })}>
              <ListItemIcon><InfoIcon/></ListItemIcon>
              <ListItemText primary="About Us" />
            </ListItem>
          </List>
          <div style={{ flexGrow: 1 }}></div>

        <List>
          <ListItem button component={NavLink} to="/"onClick={this.handleLogout}>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>

        </Drawer>
      </div>
    );
  }
}

export default TopBar;
