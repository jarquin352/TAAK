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
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';

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
          <div>
          <Typography variant="h4" sx={{ textAlign: 'center',my:3, textShadow:'7px 1px 26px rgba(0, 0, 0, 0.8)'}}>Announcements and Updates</Typography>
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
            <Typography variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom:'20px', mx:4}}>
            <div style={{ marginLeft: 'auto' }}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: '#303046',
                  color: '#8F95B9',
                  border: '3px double rgba(25, 31, 69, 0.1)',
                  borderRadius: '10px',
                }}
                onClick={this.handleClickOpen}
              >
                <AddCircleTwoToneIcon />
              </Button>
            </div>
        </Typography>
          <div style={{background:"rgba(142, 142, 142, 0.2)", margin:30, padding: 16, borderRadius: 20}}>
            <Grid container spacing={2}>
              {this.state.announcements.map((announcement) => (
                <Grid key={announcement._id} item xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      minWidth: 275,
                      borderRadius: 5,
                      boxShadow: '5px 5px 5px 2px rgba(18, 18, 34, 0.7)',
                      position: 'relative'
                    }}
                  >
                      <CardContent>
                          <Box sx={{ position: 'relative' }}>
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
                          {`${announcement.owner} - ${announcement.announcementDate.substring(0,10)}`}
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

              </Grid>
            </Grid>
            </div>

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
          </div>

        );//return
    }//render
}//classAnnouncements

export default Announcements;
