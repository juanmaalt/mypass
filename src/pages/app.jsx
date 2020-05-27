import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { auth, createUserProfileDocument } from "../firebase/firebase.utils";
import { setCurrentUser } from "../redux/user/user.actions";
import { selectCurrentUser } from "../redux/user/user.selector";

import Login from "./login/Login.page";
import Home from "./home/Home.page";
import Register from "./register/Register.page";
import New from "./new/New.page";
import Edit from "./edit/Edit.page";

class App extends Component {
  constructor() {
    super();

    let unsuscribeFromAuth = undefined;
  }

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsuscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsuscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              this.props.currentUser ? <Redirect to="/home" /> : <Login />
            }
          />
          <Route exact path="/home" component={Home} />
          <Route exact path="/new" component={New} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/edit" component={Edit} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
