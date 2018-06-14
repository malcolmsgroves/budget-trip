import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Delete from '@material-ui/icons/Delete';

const options = [
    'Food',
    'Transport',
    'Shopping'
];

const optionsElements = options.map((option, index) => {
    return <MenuItem key={index} value={option}>{option}</MenuItem>;
});

function TripForm(props) {
    const expenses = props.trip.expenses.map((exp, index) => {
        return (
            <li key={index}>

            </li>
        );
    });

    return (
        <div>
          <div style={{paddingBottom: 20}}>
            <TextField label="Trip Title"
                          value={props.trip.title}
                       onChange={props.handleChange('title')}/>
          </div>
          <div style={{paddingBottom: 20}}>
            <TextField label="Description"
                       value={props.trip.description}
                       multiline
                       onChange={props.handleChange('description')}/>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Expense</TableCell>
                <TableCell>Category</TableCell>
                <TableCell numeric>Cost ($)</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.trip.expenses.map((exp, index) => {
                  return (
                      <TableRow key={index}>
                        <TableCell>
                          <TextField value={exp.title}
                                     onChange={props.handleChange('expenses', 'title', index)}/>
                        </TableCell>
                        <TableCell>
                          <Select value={exp.category}
                                  onChange={props.handleChange('expenses', 'category', index)}>
                            { optionsElements }
                          </Select>
                        </TableCell>
                        <TableCell numeric>
                          <TextField value={exp.cost}
                                     onChange={props.handleChange('expenses', 'cost', index)}/>
                        </TableCell>
                        <TableCell>
                          <Delete onClick={props.deleteExpense(index)}/>
                        </TableCell>
                      </TableRow>
                  );
              })}
        </TableBody>
            </Table>
            <div>
            <Button variant="contained"
        color="secondary"
        onClick={props.addExpense}>
            add expense
        </Button>
            </div>
            <div>
            <Button variant="contained"
        color="primary"
        onClick={props.save}>
            Save
        </Button>
            </div>
        </div>
    );
}

export default TripForm;
