import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DateRange } from '@material-ui/icons';
import format from 'date-fns/format';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateRange: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
}));


const SprintTimeline = ({ sprintsObj }) => {
  const classes = useStyles();

  const sprints = [
    {
      id: 1,
      name: 'Sprint 1',
      startDate: '2023-03-21',
      endDate: '2023-04-03',
    },
    {
      id: 2,
      name: 'Sprint 2',
      startDate: '2023-04-04',
      endDate: '2023-04-17',
    },
    {
      id: 3,
      name: 'Sprint 3',
      startDate: '2023-04-18',
      endDate: '2023-05-01',
    },
  ];
  return (
    <Grid container spacing={2}>
      {sprints.map((sprint) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={sprint.id}>
          <Paper className={classes.paper}>
            <Typography variant="h6" component="h3">
              {sprint.name}
            </Typography>
            <div className={classes.dateRange}>
              <DateRange />
              <Typography variant="body2" component="span" style={{ marginLeft: 5 }}>
                {`${format(new Date(sprint.startDate), 'MMM d')} - ${format(
                  new Date(sprint.endDate),
                  'MMM d'
                )}`}
              </Typography>
            </div>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default SprintTimeline;
