import React, { Component } from 'react';
import TripData from './TripData';
import TripForm from './TripForm';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

class Trip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trip: null,
            error: null,
            edit: false,
        };
        this.getTrip = this.getTrip.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.edit = this.edit.bind(this);
        this.setTrip = this.setTrip.bind(this);
        this.calculateTotals = this.calculateTotals.bind(this);
        this.deleteExpense = this.deleteExpense.bind(this);
        this.addExpense = this.addExpense.bind(this);
    }

    componentDidMount() {
        this.getTrip();
    }

    handleChange(key, other_key, index) {
        return (
            event => {
                const value = event.target.value;
                if(other_key) {
                    this.setState(prevState => {
                        let newState = prevState;
                        newState.trip.expenses[index][other_key] =
                            other_key === "cost" ? Number(value) : value;
                        return newState;
                    }, this.calculateTotals);
                } else {
                    this.setState(prevState => {
                        let newState = prevState;
                        newState.trip[key] = value;
                        return newState;
                    });
                }
            }
        );
    }

    getTrip() {
        fetch(`/api/trip/${this.props.match.params.id}`)
            .then(res => {
                return res.json();
            })
            .then(res => {
                if(res.name === "CastError") {
                    this.setState({ error: "trip not found" });
                } else {
                    this.setTrip(res);
                }
            })
            .catch(err => {
                this.setState({ error: err });
            });
    }

    setTrip(trip) {
        let costs = {
            Total: 0,
            Food: 0,
            Transport: 0,
            Shopping: 0
        };
        this.setState({
            trip: Object.assign(trip, { costs }),
            edit: false
        }, this.calculateTotals);
    }

    deleteExpense(index) {
        return () => {
            console.log(index);
            this.setState(prev => {
                let newState = prev;
                newState.trip.expenses.splice(index, 1);
                return newState;
            }, this.calculateTotals);
        };
    }

    addExpense() {
        this.setState(prev => {
            let newState = prev;
            newState.trip.expenses.push({
                cost: 0,
                title: "",
                category: ""
            });
            return newState;
        });
    }

    calculateTotals() {
        let costs = {
            Total: 0,
            Food: 0,
            Transport: 0,
            Shopping: 0
        };
        this.state.trip.expenses.forEach(exp => {
            costs.Total += exp.cost;
            if(exp.category) costs[exp.category] += exp.cost;
        });
        this.setState(prev => {
            prev.trip.costs = costs;
            console.log(prev);
            return prev;
        });
    }

    save() {
        fetch(`/api/trip/${this.props.match.params.id}`,
              {
                  method: 'POST',
                  headers: { 'content-type': 'application/json' },
                  body: JSON.stringify(this.state.trip)
              })
            .then(res => {
                return res.json();
            })
            .then(res => {
                this.setTrip(res);
            })
            .catch(err => console.log(err));
    }

    edit() {
        this.setState({
            edit: true
        });
    }

    getCostList() {
        let CostListItems = Object.keys(this.state.trip.costs).map((cost, i) => {
            if(cost !== "Total") {
                return (
                    <ListItem key={i}>
                      {`${cost}: $${this.state.trip.costs[cost]}`}
                    </ListItem>
                );
            }
            return null;
        });

        CostListItems.push(<Divider key="divider"/>);
        CostListItems.push(
            <ListItem key="total">
              <Typography variant="title">{`Total: $${this.state.trip.costs['Total']}`}</Typography>
            </ListItem>
        );
        return CostListItems;
    }


    render() {
        if(this.state.error) {
            return <div>Error: {this.state.error}</div>;
        }
        if(this.state.trip) {
            const CostListItems = this.getCostList();
            return (
                <Grid container justify="center" spacing={16} direction="row">
                  <Grid item xs={7}>
                    <Paper depth={2} style={{padding: 16 }}>
                      {this.state.edit ?
                          <TripForm trip={this.state.trip}
                                        handleChange={this.handleChange}
                                        save={this.save}
                                        deleteExpense={this.deleteExpense}
                                        addExpense={this.addExpense}/>
                              : <TripData trip={this.state.trip} edit={this.edit}/>
                          }
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
            );
        }
        return <div> loading... </div>;
    }
}

export default Trip;
