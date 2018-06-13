import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

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
              <TextField label="Title"
                         value={exp.title}
                         onChange={props.handleChange('expenses', 'title', index)}/>
              <Select value={exp.category}
                       onChange={props.handleChange('expenses', 'category', index)}>
                { optionsElements }
              </Select>
              <TextField label="Cost"
                         value={exp.cost}
                         onChange={props.handleChange('expenses', 'cost', index)}/>
            </li>
        );
    });

    return (
        <div>
          <div><TextField label="Trip Title"
                          value={props.trip.title}
                          onChange={props.handleChange('title')}/></div>
          <div><TextField label="Description"
                          value={props.trip.description}
                          multiline
                          onChange={props.handleChange('description')}/></div>
          <ul>{ expenses }</ul>
          <Button variant="contained"
                  color="primary"
                  onClick={props.save}>
            Save
          </Button>
        </div>
    );
}

export default TripForm;
