import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateDocument } from "../../firebase/firebase.utils";
import { Code } from "../../components/code/Code";

import { CustomButton } from "../../components/customButton/CustomButton.component";
import {
  ItemFormStyle,
  CancelBarStyle,
  CancelStyle,
  FormStyle,
  InputDivStyle,
} from "./New.style";
import {
  MdClear,
  MdDevicesOther,
  MdEmail,
  MdAccountBox,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";

class New extends Component {
  constructor() {
    super();

    this.state = {
      title: "",
      email: "",
      user: "",
      password: "",
      isVisible: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onView = this.onView.bind(this);
  }

  onView() {
    let input = document.getElementById("password");
    if (input.type === "password") {
      this.setState({ isVisible: true });
      input.type = "text";
    } else {
      this.setState({ isVisible: false });
      input.type = "password";
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit() {
    event.preventDefault();
    const { title, email, user, password } = this.state;
    const { currentUser } = this.props;

    const newDoc = {
      id: undefined,
      title: title,
      email: Code(email, 1),
      user: Code(user, 2),
      password: Code(password, 3),
    };

    updateDocument(newDoc, currentUser.id);
    this.props.history.push("/home");
  }

  render() {
    return (
      <ItemFormStyle>
        <CancelBarStyle>
          <h2>New credentials</h2>
          <CancelStyle to="/home">
            <MdClear />
          </CancelStyle>
        </CancelBarStyle>
        <FormStyle onSubmit={this.onSubmit}>
          <InputDivStyle>
            <MdDevicesOther />
            <input
              type="text"
              name="title"
              onChange={this.onChange}
              placeholder="Account title"
              maxLength="30"
              required
            />
          </InputDivStyle>
          <InputDivStyle>
            <MdEmail />
            <input
              type="email"
              name="email"
              onChange={this.onChange}
              placeholder="email"
              maxLength="30"
              required
            />
          </InputDivStyle>
          <InputDivStyle>
            <MdAccountBox />
            <input
              type="text"
              name="user"
              onChange={this.onChange}
              placeholder="User"
              maxLength="30"
              required
            />
          </InputDivStyle>
          <InputDivStyle>
            <MdLock />
            <input
              id="password"
              type="password"
              name="password"
              onChange={this.onChange}
              placeholder="Password"
              maxLength="30"
              required
            />
            {this.state.isVisible ? (
              <MdVisibilityOff
                style={{ fontSize: "1.2em" }}
                onClick={this.onView}
              />
            ) : (
              <MdVisibility
                style={{ fontSize: "1.2em" }}
                onClick={this.onView}
              />
            )}
          </InputDivStyle>
          <CustomButton type="submit">Submit</CustomButton>
        </FormStyle>
      </ItemFormStyle>
    );
  }
}

New.propTypes = {
  currentUser: PropTypes.object.isRequired,
  updateDocument: PropTypes.func.isRequired,
  updateCollection: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  updateDocument: (objectToAdd, collectionId) =>
    dispatch(updateDocument(objectToAdd, collectionId)),
  updateCollection: (collectionMap) =>
    dispatch(updateCollection(collectionMap)),
});

export default connect(mapStateToProps, mapDispatchToProps)(New);
