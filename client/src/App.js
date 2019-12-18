import React, { Component } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./Components/nav";
import Home from "./pages/home";
import Register from "./Components/auth/Register";
import { connect } from "react-redux";
import { loadUser, loginAdmin } from "./actions/auth-actions";
import { clearErrors } from "./actions/error-actions";
import studentSearch from "./pages/student-search";
import PropTypes from "prop-types";

class App extends Component {
  state = {
    user: "",
    password: ""
  };
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}
  componentDidMount() {
    this.props.loadUser();
  }
  handleInputChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  loginSubmit = event => {
    event.preventDefault();
    const userData = {
      user: this.state.user,
      password: this.state.password
    };

    this.props.loginAdmin(userData);
  };
  render() {
    return (
      <Router>
        <div>
          <Navigation handleInputChange={this.handleInputChange} loginSubmit={this.loginSubmit} clearErrors={this.props.clearErrors} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/students" component={studentSearch} />
            {/* <Route component={ErrorC} /> */}
          </Switch>
        </div>
      </Router>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  error: state.error
})
export default connect(mapStateToProps,
  { clearErrors, loginAdmin, loadUser }
)(App);
