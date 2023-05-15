import React, { Component } from 'react';
import { Container, Box, Avatar, Tooltip, Grid,TextField, Button, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';


class Groupchat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current_user: props.current_user,
      messages: [],
      teamMembers: [],
      teamName: '',
      newMessage: '',
    };
  }

  componentDidMount() {
    this.checkLogin();
    this.getMessages();
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

  getTeam = () => {
    axios.get('/api/getTeam')
      .then(response => {
        console.log(response.data)
        this.setState({
          teamName:response.data.teamName,
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

  getMessages = () => {
    axios.get('/api/groupMessages')
      .then(response => {
        console.log(response.data)
        this.setState({
          messages:response.data
        });
      })
      .catch(error => {
        console.log(error);
        if (error.response.status===401) {
          window.location.href = '#/login';
        }
      });
  }

  handleSendMessage = () => {
    // const { newMessage, messages } = this.state;
    // if (newMessage.trim() !== '') {
    //   const newId = messages.length + 1;
    //   const newMessageData = { id: newId, message: newMessage, sender: 'John' }; // Assuming the user sending the message is "John"
    //   const updatedMessages = [...messages, newMessageData];
    //   this.setState({ messages: updatedMessages, newMessage: '' });
    // }
    console.log(this.state.newMessage)
  };

  render() {
    const { messages, teamMembers, teamName, newMessage, current_user } = this.state;
    console.log(current_user);
  
    // Calculate the number of columns based on the teamMembers length
    const numColumns = Math.ceil(teamMembers.length / 3);

    // Split the teamMembers array into subarrays to represent the columns
    const columns = Array.from({ length: numColumns }, (_, index) =>
      teamMembers.slice(index * 3, index * 3 + 3)
    );
    
    return (
      <Container maxWidth="md" style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(142, 142, 142, 0.2)', padding: 20, borderRadius: 30 }}>
        <Box sx={{ flex: '1 0 auto',textAlign:"center"}}>
        <Typography variant="h3">{'Chat'}</Typography>
          <Typography variant="h6">{teamName}</Typography>
          <Box display="flex" justifyContent="center" flexWrap="wrap" alignItems="center">
            {teamMembers.map((member) => (
              <Tooltip key={member._id} title={member.name}>
                <Avatar sx={{ margin: '5px',backgroundColor: '#333b75', color:"#B2B2B2" }} alt={member.name}>
                  {member.name.split(' ').map((split) => split.charAt(0))}
                </Avatar>
              </Tooltip>
            ))}
          </Box>
        </Box>
  
        <Box sx={{ flexShrink: 0 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', width: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '10px',
                marginBottom: '10px',
              }}
            >
              {messages.map((message) => (
                <React.Fragment key={message.id}>
                      <div
                        style={{
                          color: '#fff',
                          fontSize: '0.8rem',
                          alignSelf: message.sender.authid === current_user._id ? 'flex-end' : 'flex-start',
                          marginTop: 1,
                        }}
                      >
                        {message.sender.name}
                      </div>
                  <div
                    style={{
                      backgroundColor: message.sender.authid === current_user._id ? "#8e8e93" : '#147efb',
                      color: '#fff',
                      borderRadius: '10px',
                      padding: '10px',
                      maxWidth: '80%',
                      marginBottom: 10,
                      wordWrap: 'break-word',
                      alignSelf: message.sender.authid === current_user._id ? 'flex-end' : 'flex-start',
                    }}
                  >
                    {message.message}
                  </div>
                    <div
                      style={{
                        color: '#fff',
                        fontSize: '0.8rem',
                        alignSelf: message.sender.authid === current_user._id ? 'flex-end' : 'flex-start',
                        marginTop: 1,
                        textAlign: message.sender.authid === current_user._id ? 'right' : 'left',
                        paddingRight: message.sender.authid === current_user._id ? 0 : '10px',
                        paddingLeft: message.sender.authid === current_user._id ? '10px' : 0,
                        paddingBottom:15

                      }}
                    >
                        {new Date(message.createdAt).toLocaleDateString()} {new Date(message.createdAt).toLocaleTimeString()}
                    </div>
                </React.Fragment>
              ))}
            </Box>
  
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={11}>
                <TextField
                  fullWidth
                  placeholder="Type your message"
                  value={newMessage}
                  onChange={(e) => this.setState({ newMessage: e.target.value })}
                  variant="filled"
                  focused
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      borderRadius: '999px',
                      '&.MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                      },
                    },
                  }}
                  sx={{
                    backgroundColor: '#00FFFFF',
                    '& .MuiInputBase-input': {
                      padding: '10px',
                    },
                    '& .MuiInputBase-root.Mui-focused': {
                      backgroundColor: '#5e748b',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={1}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#303046',
                  color: '#8F95B9',
                  border: '3px double rgba(25, 31, 69, 0.1)',
                  borderRadius: '10px',
                }}
                onClick={this.handleClickOpen}
              >
                <SendIcon/>
              </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
  }
}
export default Groupchat
