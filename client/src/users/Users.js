import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";

import NewUser from "./NewUser";
import LoginUser from "./LoginUser";
import UserScores from "./UserScores";

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    // try to get user
  }
  setUser = user => {
    this.setState({ user: user });
  };

  renderLogin = () => {
    return <LoginUser setUser={this.setUser} />;
  };

  renderUserScores = props => {
    const { user } = this.state;
    if (!user) {
      return <div> must log in first </div>;
    }
    return <UserScores id={user.id} />;
  };




  render() {
    console.log("users: ", this.state);
    const { user } = this.state;
    return (
      <div className="App">
        {user ? `welcome, ${user.username}` : ""}
        <Route path="/users/new" component={NewUser} />
        <Route path="/users/login" render={this.renderLogin} />
        <Route path="/users/scores" render={this.renderUserScores} />
      </div>
    );
  }
}

export default Users;
