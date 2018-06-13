import React, { Component } from 'react';
import TripData from './TripData';
import TripForm from './TripForm';

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
                        newState.trip.expenses[index][other_key] = value;
                        return newState;
                    });
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
                    this.setState({ error: "Error: trip not found" });
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
            trip: Object.assign(trip, { costs })
        }, this.calculateTotals);
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
            costs[exp.category] += exp.cost;
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
                this.setState({
                    trip: res,
                    edit: false
                });
            })
            .catch(err => console.log(err));
    }

    edit() {
        this.setState({
            edit: true
        });
    }

    currentElement() {
        if(this.state.error) {
            return <div>{this.state.error}</div>;
        }
        if(this.state.trip && this.state.edit) {
            return (
                <TripForm trip={this.state.trip}
                          handleChange={this.handleChange}
                          save={this.save}/>
            );
        }
        if(this.state.trip) {
            return <TripData trip={this.state.trip} edit={this.edit}/>;
        }
        return <div> loading... </div>;
    }

    render() {
        const element = this.currentElement();
        return (
            <div>{ element }</div>
        );
    }
}

export default Trip;
