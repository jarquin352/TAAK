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

const StyledButton = styled(Button)({
  fontSize: "0.875rem",
  fontWeight: "700",
});

class Announcements extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        announcements: window.taakmodels.announcementsModel(),
        open: false,
        title: "",
        date: "",
        description: "",
      };
    }
  
    handleClickOpen = () => {
      this.setState({
        open: true,
      });
    };
  
    handleClose = () => {
      this.setState({
        open: false,
      });
    };
  
    handleInputChange = (event) => {
      const target = event.target;
      const value = target.value;
      const name = target.name;
  
      this.setState({
        [name]: value,
      });
    };
  
    handleFormSubmit = (event) => {
      event.preventDefault();
  
      const newAnnouncement = {
        title: this.state.title,
        dueDate: this.state.date,
        description: this.state.description,
      };
  
      // Save the new announcement
      // ...
  
      this.setState({
        announcements: [...this.state.announcements, newAnnouncement],
        open: false,
        title: "",
        date: "",
        description: "",
      });
    };

    render() {
        const { open, title, date, description } = this.state;
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
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <CardContent>
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
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              <Grid item xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    minWidth: 275,
                    borderRadius: 5,
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Add New Announcement
                    </Typography>
                    <Button variant="outlined" onClick={this.handleClickOpen}>
                      Open Form Dialog
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Dialog open={open} onClose={this.handleClose}>
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
                  onChange={(e) => this.handleChange("title", e)}
                />
                <TextField
                  margin="dense"
                  id="date"
                  label="Due Date"
                  type="date"
                  fullWidth
                  value={date}
                  onChange={(e) => this.handleChange("date", e)}
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
                  onChange={(e) => this.handleChange("description", e)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose}>Cancel</Button>
                <Button onClick={this.handleSave} color="primary">
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        );//return
    }//render
}//classAnnouncements

export default Announcements;
