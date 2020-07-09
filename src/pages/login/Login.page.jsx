import React, { Component } from "react";
const remote = require("electron").remote;
import { auth } from "../../firebase/firebase.utils";

import { CustomButton } from "../../components/customButton/CustomButton.component";
import {
  AppBar,
  Container,
  FormContainer,
  LoginForm,
  InputDivStyle,
} from "./Login.style";
import WithSpinner from "../../components/withSpinner/WithSpinner.component";
import { FaRegWindowMinimize, FaRegWindowClose } from "react-icons/fa";
import { MdAccountBox, MdLock } from "react-icons/md";
import swal from "sweetalert";

const ContainerWithSpinner = WithSpinner(Container);

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isLoading: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  toggleLoading() {
    this.setState({
      isLoading: !this.state.isLoading,
    });
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async onSubmit(event) {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      this.toggleLoading();
      await auth.signInWithEmailAndPassword(email, password);

      this.setState = {
        email: "",
        password: "",
        isLoading: false,
      };
    } catch (error) {
      this.toggleLoading();
      swal({
        title: "Error",
        text: "The email/password entered is not valid",
        icon: "error",
      });
    }
  }

  onCloseWindow() {
    let window = remote.getCurrentWindow();
    window.close();
  }

  onMinimizeWindow() {
    let window = remote.getCurrentWindow();
    window.minimize();
  }

  render() {
    return (
      <ContainerWithSpinner isLoading={this.state.isLoading}>
        <AppBar>
          <FaRegWindowClose onClick={this.onCloseWindow} />
          <FaRegWindowMinimize onClick={this.onMinimizeWindow} />
        </AppBar>
        <FormContainer>
          <h2 style={{ fontSize: "2em" }}>MyPass</h2>
          <LoginForm onSubmit={this.onSubmit}>
            <InputDivStyle>
              <MdAccountBox />
              <input
                name="email"
                type="email"
                label="Email"
                value={this.state.email}
                onChange={this.onChange}
                required
              />
            </InputDivStyle>
            <InputDivStyle>
              <MdLock />
              <input
                name="password"
                type="password"
                label="Password"
                value={this.state.password}
                onChange={this.onChange}
                required
              />
            </InputDivStyle>
            <CustomButton type="submit">Sign in</CustomButton>
          </LoginForm>
          {/*
          <Link to="/register">You don´t have an account? Register</Link>
        */}
        </FormContainer>
      </ContainerWithSpinner>
    );
  }
}

export default Login;
