import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateDocument } from "../../firebase/firebase.utils";
import { Code, Decode } from "../../components/code/Code";

import { CustomButton } from "../../components/customButton/CustomButton.component";
import ReactTooltip from "react-tooltip";
import {
  ItemEditStyle,
  CancelBarStyle,
  CancelStyle,
  FormStyle,
  InputDivStyle,
} from "./Edit.style";
import {
  MdClear,
  MdDevicesOther,
  MdEmail,
  MdAccountBox,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";

class Edit extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      title: "",
      email: "",
      user: "",
      password: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onView = this.onView.bind(this);
  }

  componentDidMount() {
    const { id, title, email, user, password, params } = this.props;
    const general = params.TYPE_X;

    this.setState({
      id: id,
      title: title,
      email: Decode(email, general, params.TYPE_A),
      user: Decode(user, general, params.TYPE_B),
      password: Decode(password, general, params.TYPE_C),
    });
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

  async onSubmit() {
    event.preventDefault();
    const { id, title, email, user, password } = this.state;
    const { currentUser, params } = this.props;
    const general = params.TYPE_X;

    const updatedDoc = {
      id: id,
      title: title,
      email: Code(email, general, params.TYPE_A),
      user: Code(user, general, params.TYPE_B),
      password: Code(password, general, params.TYPE_C),
    };

    await updateDocument(updatedDoc, currentUser.id);
    this.props.history.push("/home");
  }

  render() {
    const { title, email, user } = this.state;

    return (
      <ItemEditStyle>
        <CancelBarStyle>
          <h2>Edit credentials</h2>
          <CancelStyle to="/home">
            <MdClear />
          </CancelStyle>
        </CancelBarStyle>
        <FormStyle onSubmit={this.onSubmit}>
          <InputDivStyle data-tip data-for="titleInput">
            <MdDevicesOther />
            <input
              type="text"
              name="title"
              onChange={this.onChange}
              placeholder={title}
              maxLength="30"
            />
            <ReactTooltip id="titleInput" place="right">
              <span>Account name</span>
            </ReactTooltip>
          </InputDivStyle>
          <InputDivStyle data-tip data-for="emailInput">
            <MdEmail />
            <input
              type="email"
              name="email"
              onChange={this.onChange}
              placeholder={email}
              maxLength="30"
            />
            <ReactTooltip id="emailInput" place="right">
              <span>Email</span>
            </ReactTooltip>
          </InputDivStyle>
          <InputDivStyle data-tip data-for="userInput">
            <MdAccountBox />
            <input
              type="text"
              name="user"
              onChange={this.onChange}
              placeholder={user}
              maxLength="30"
            />
            <ReactTooltip id="userInput" place="right">
              <span>User</span>
            </ReactTooltip>
          </InputDivStyle>
          <InputDivStyle data-tip data-for="passInput">
            <MdLock />
            <input
              id="password"
              type="password"
              name="password"
              onChange={this.onChange}
              placeholder="******"
              maxLength="30"
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
            <ReactTooltip id="passInput" place="right">
              <span>Password</span>
            </ReactTooltip>
          </InputDivStyle>
          <CustomButton type="submit">Submit</CustomButton>
        </FormStyle>
      </ItemEditStyle>
    );
  }
}

Edit.propTypes = {
  currentUser: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  updateDocument: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  id: state.item.id,
  title: state.item.title,
  email: state.item.email,
  user: state.item.user,
  password: state.item.password,
  params: state.keys,
});

const mapDispatchToProps = (dispatch) => ({
  updateDocument: (objectToUpdate, collectionId) =>
    dispatch(updateDocument(objectToUpdate, collectionId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
