import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import "./App.css";
import Users from "./users/Users";

class App extends React.Component {
  homepage = () => {
    return <h1> Homepage </h1>;
  };

  render() {
    return (
      <div className="App">
        <nav>
          <Link to="/users/new">Register</Link> {" . "}
          <Link to="/users/login">Log In</Link>
          {" . "}
          <Link to="/users/scores"> My Scores </Link>
        </nav>

        <Route exact path="/" render={this.homepage} />
        <Route path="/users" component={Users} />
      </div>
    );
  }
}

export default App;
