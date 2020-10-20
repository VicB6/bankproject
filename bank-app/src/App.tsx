import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import Login from "./components/Login"

import PrivateRoute from './components/PrivateRoute';
//import {initUser} from "./services/users";
import {MyAccount} from  "./components/MyAccount";
import {Homepage} from "./components/Homepage";

function App() {  
  return (
    <Router>
      <div className="App-header">
        <nav>
          <ul>
            <li>
              <Link to="/">Homepage</Link>
            </li>
            <li>
              <Link to="/admin">My account</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="App-body">
      <Switch>
        <Route exact path="/">
            <p className="app-body">
              <Homepage />
            </p>
          </Route>
      <Route exact path="/login" component={Login} /> // Route publique
      <PrivateRoute exact path="/admin" component={MyAccount} /> // Route protégée
      </Switch>
      </div>
    </Router>
  );
}

export default App;