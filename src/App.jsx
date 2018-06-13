import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Trip from './Trip';
import Home from './Home';
import './App.css';

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>

            <hr />

            <Route path="/trip/:id" component={Trip} />
            <Route exact path="/" component={Home} />
          </div>
        </Router>
    );
  }
}

export default App;
