import React from 'react';
import { NavLink } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './TopBar.css';

//adding sidebar
import { Drawer } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

//icons
import HomeIcon from '@mui/icons-material/Home';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import TaskAltTwoToneIcon from '@mui/icons-material/TaskAltTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import Avatar from '@mui/material/Avatar';
class TopBar extends React.Component {

  //changing the state of the drawer opening, by default this will be false
  constructor(props){
    super(props);
    this.state = {
      drawerOpen: false
    }
  }

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar className="taak-toolbar">
            {/* Button for the side bar, dynamic for now? */}
            <Button onClick={() => this.setState({ drawerOpen: !this.state.drawerOpen })}>
              <MenuTwoToneIcon/>
            </Button>

            <Typography variant="h6" className="taak-logo">
              TAAK - A Task Ticket Management System
            </Typography>

            {/* Adding Avatar component for profile icon */}
            <Stack direction="row" spacing={2}>
              <Avatar alt="Profile Image" src="/path/to/profile/image" />
            </Stack>
          </Toolbar>
        </AppBar>

        <Drawer 
          anchor="left"
          open={this.state.drawerOpen}
          variant="temporary" // set the variant to "temporary"
          onClose={() => this.setState({ drawerOpen: false })}
          ModalProps={{
            keepMounted: true // to avoid any issue with react strict mode
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

            <ListItem button component={NavLink} to="/inbox" onClick={() => this.setState({ drawerOpen: false })}>
              <ListItemIcon><EmailTwoToneIcon/></ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItem>

            <ListItem button component={NavLink} to="/settings" onClick={() => this.setState({ drawerOpen: false })}>
              <ListItemIcon><SettingsTwoToneIcon/></ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
        </Drawer>
      </div>
    );
  }
}

export default TopBar;
