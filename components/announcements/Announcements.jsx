import React from "react";

//styling
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from "@mui/material";

class Announcements extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          announcements: window.taakmodels.announcementsModel(),
        };
      }

    render() {
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
                            <Card sx={{ minWidth: 275, borderRadius:5, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'}}>
                                <CardContent>
                                    <Typography variant="h5" component="div">{announcement.title}</Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">{announcement.owner} - {announcement.dueDate}</Typography>
                                    <Typography sx={{ mb: 1 }} color="text.secondary">{announcement.description}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    }
}

export default Announcements;
