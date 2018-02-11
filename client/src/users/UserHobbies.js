import React from "react";
import axios from "axios";

class UserScores extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      scores: ""
    };
  }

  componentDidMount() {
    console.log("user scores mounted");
    console.log(`http://localhost:3100/users/${this.props.id}/scores`);
    axios
      .get(`/users/scores`)
      .then(res => {
        console.log("got scores:", res);
        this.setState({
          scores: res.data.scores
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  switchMode = () => {
    this.setState({
      editing: !this.state.editing
    });
  };

  submitForm = e => {
    e.preventDefault();
    axios
      .patch(`/users/scores`, {
        id: this.props.id,
        scores: this.state.scores
      })
      .then(() => {
        this.switchMode();
      })
      .catch(err => {
        console.log(err);
      });
  };


  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { editing, scores } = this.state;
    console.log("user scores, ", this.state);

    if (!editing) {
      return (
        <div>
          <h3> {scores} </h3>
          <button onClick={this.switchMode}> Edit </button>
        </div>
      );
    } else {
      return (
        <div>
          <form onSubmit={this.submitForm}>
            <label>
              New Scores:
              <input
                value={scores}
                type="text"
                name="scores"
                onChange={this.handleChange}
              />
            </label>

            <input type="submit" value="Submit" />
          </form>

          <button onClick={this.switchMode}> Cancel </button>
        </div>
      );
    }
  }
}

export default UserScores;
