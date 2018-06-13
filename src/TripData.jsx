import React from 'react';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

function TripData(props) {
    const expenses = props.trip.expenses.map((exp, index) => {
        return (
            <li key={index}>
              <h3>{exp.title}</h3>
              <span> {exp.category} </span>
              <span> ${exp.cost} </span>
            </li>
        );
    });

    let CostListItems = Object.keys(props.trip.costs).map((cost, i) => {
        if(cost !== "Total") {
            return (
                <ListItem key={i}>
                  {`${cost}: $${props.trip.costs[cost]}`}
                </ListItem>
            );
        }
        return null;
    });

    CostListItems.push(<Divider key="divider"/>);
    CostListItems.push(
        <ListItem key="total">
          <Typography variant="title">{`Total: $${props.trip.costs['Total']}`}</Typography>
        </ListItem>
    );

    
    return (
        <div>
          <Grid container justify="center" spacing={16} direction="row">
            <Grid item xs={7}>
              <Paper depth={2} style={{padding: 16 }}>
                <Typography variant="title" color="inherit">
                  {props.trip.title}
                </Typography>
                <Typography>
                  {props.trip.description}
                </Typography>
                <ul>{expenses}</ul>
                <Button variant="contained"
                        color="primary"
                        onClick={props.edit}>
                  Edit
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper depth={2}>
                <List>
                  { CostListItems }
                </List>
              </Paper>
            </Grid>
          </Grid>
        </div>
    );
}

export default TripData;
