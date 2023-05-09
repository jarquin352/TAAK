import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import axios from "axios";
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

// const StyledButton = styled(Button)({
//   fontSize: "0.875rem",
//   fontWeight: "700",
// });

class Announcements extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        announcements: [],
        addAnnouncementOpen: false,
        deleteConfirmOpen:false,
        selectedAnnouncementId: null,
        title: "",
        date: "",
        description: "",
      };
    }
  
    componentDidMount(){
      this.getAnnouncements();
    }

    getAnnouncements = () => {
      axios
      .get('/api/announcements')
      .then(response => {
        this.setState({
          announcements:response.data
        });
      })
      .catch(error => {
        console.log(error);
        if (error.response.status===401) {
          window.location.href = '#/login';
        }
      });
    }

    //handles Create an Announcement button
    handleClickOpen = () => {
      this.setState({
        addAnnouncementOpen: true,
      });
    };
  
    //handle createAnnouncement close button
    handleClose = () => {
      this.setState({
        addAnnouncementOpen: false,
        title: "",
        date: "",
        description: "",
      });
    };
  
    //handles form input
    handleInputChange = (fieldName, event) => {
      this.setState({
        [fieldName]: event.target.value
      });
    };
    
    handleFormSubmit = (event) => {
      event.preventDefault();
      const newAnnouncement = {
        title: this.state.title,
        dueDate: this.state.date,
        description: this.state.description
      }

      axios
      .post("/api/newAnnouncement", newAnnouncement)
      .then(response => {
        this.getAnnouncements();
        location.reload();
      })
      .catch(err => {
				console.log(err.response.data);
      });
    };

    handleDeleteConfirmOpen = (announcmementId) => {
      console.log(announcmementId)
      this.setState({
        deleteConfirmOpen: true,
        selectedAnnouncementId: announcmementId
      });
    };
  
    handleDeleteConfirmClose = () => {
      this.setState({
        deleteConfirmOpen: false,
        selectedAnnouncementId: null,
      });
    };
  
    handleDelete = () => {
      // implement delete logic here
      const delAnnouncement = {
        _id: this.state.selectedAnnouncementId
      }
      console.log(delAnnouncement)
      axios
      .delete("/api/delAnnouncement", { data: delAnnouncement })
      .then(response => {
        console.log(response)
        location.reload();
      })
      .catch(err => {
        console.log(err.response.data);
      });
      this.handleDeleteConfirmClose();
    };

    render() {
        const { addAnnouncementOpen, title, date, description, deleteConfirmOpen } = this.state;
        return (
            <Box
            sx={{
              flexGrow: 1,
              m: 1,
              p: 1,
              borderColor: "black",
              borderRadius: 5,
              fontSize: "0.875rem",
              fontWeight: "700"
            }}
          >
            <h1>Announcements and Updates</h1>
            <Grid container spacing={2}>
              {this.state.announcements.map((announcement) => (
                <Grid key={announcement._id} item xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      minWidth: 275,
                      borderRadius: 5,
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      position: 'relative'
                    }}
                  >
                    {/* <CardContent>
                      <Typography variant="h5" component="div">
                        {announcement.title}
                      </Typography>
                      <Typography
                        sx={{ mb: 1.5 }}
                        color="text.secondary"
                      >{`${announcement.owner} - ${announcement.dueDate}`}</Typography>
                      <Typography
                        sx={{ mb: 1 }}
                        color="text.secondary"
                      >
                        {announcement.description}
                      </Typography>
                    </CardContent> */}
                      <CardContent>
                          <Box sx={{ position: 'relative' }}>
                          
                          {/* <Typography sx={{top: -10, right: -10, position:'absolute' }}>
                          <IconButton
                            onClick={() => console.log('Delete button')}
                          >
                          <CloseIcon />
                        </IconButton>
                          </Typography> */}

                        <Typography sx={{ top: -10, right: -10, position: "absolute" }}>
                          <IconButton onClick={() => this.handleDeleteConfirmOpen(announcement._id)}>
                            {/* <CloseIcon /> */}
                            <DeleteTwoToneIcon/>
                          </IconButton>
                        </Typography>

                        <Typography variant="h5" component="div">
                          {announcement.title}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          {`${announcement.owner} - ${announcement.dueDate}`}
                        </Typography>
                        <Typography sx={{ mb: 1 }} color="text.secondary">
                          {announcement.description}
                        </Typography>
                      </Box>
                    </CardContent>


                  </Card>
                </Grid>
              ))}
              <Grid item xs={12} sm={6} md={4}>
                {/* <Card
                  sx={{
                    minWidth: 275,
                    borderRadius: 5,
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Create a New Announcement
                    </Typography>
                    <Button variant="outlined" onClick={this.handleClickOpen}>
                      Open Form Dialog
                    </Button>
                  </CardContent>
                </Card> */}
              <Typography variant="h5" component="div">
                <Button variant="contained" onClick={this.handleClickOpen}>
                  Create an Announcement
                </Button>
              </Typography>

              </Grid>
            </Grid>

             {/* Form dialog code Delete Announcement */}
            <Dialog open={deleteConfirmOpen} onClose={this.handleDeleteConfirmClose}>
              <DialogTitle>Delete Announcement</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete this announcement? This cannot be undone.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleDeleteConfirmClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleDelete}  style={{color:'#E53147'}}>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
            {/* Form dialog code Add Announcement */}
            <Dialog open={addAnnouncementOpen} onClose={this.handleClose}>
              <DialogTitle>Add New Announcement</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="title"
                  label="Title"
                  type="text"
                  fullWidth
                  value={title}
                  onChange={(e) => this.handleInputChange("title", e)}
                />
                <TextField
                  margin="dense"
                  id="date"
                  label="Due Date"
                  type="date"
                  fullWidth
                  value={date}
                  onChange={(e) => this.handleInputChange("date", e)}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                <TextField
                  margin="dense"
                  id="description"
                  label="Description"
                  type="text"
                  fullWidth
                  value={description}
                  onChange={(e) => this.handleInputChange("description", e)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose}>Cancel</Button>
                <Button onClick={this.handleFormSubmit} color="primary">
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        );//return
    }//render
}//classAnnouncements

export default Announcements;
