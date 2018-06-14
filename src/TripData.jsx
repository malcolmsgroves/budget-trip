import React from 'react';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function TripData(props) {

    return (
        <div>
          <Typography variant="headline" color="inherit">
            {props.trip.title}
          </Typography>
          <Typography variant="body1">
            {props.trip.description}
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Expense</TableCell>
                <TableCell>Category</TableCell>
                <TableCell numeric>Cost ($)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.trip.expenses.map((n, i) => {
                  return (
                      <TableRow key={i}>
                        <TableCell>
                          {n.title}
                        </TableCell>
                        <TableCell>{n.category}</TableCell>
                        <TableCell numeric>{n.cost}</TableCell>
                      </TableRow>
                  );
              })}
        </TableBody>
            </Table>
          <Button variant="contained"
                  color="primary"
                  onClick={props.edit}>
            Edit
          </Button>
        </div>
    );
}

export default TripData;
