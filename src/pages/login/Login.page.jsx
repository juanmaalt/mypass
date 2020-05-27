import React, { Component } from "react";

import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

import { CustomButton } from "../../components/customButton/CustomButton.component";
import { Container, LoginForm, InputDivStyle } from "./Login.style";
import WithSpinner from "../../components/withSpinner/WithSpinner.component";
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
      swal({
        title: "Error",
        text: "The email/password entered is not valid",
        icon: "error",
      });
    }
  }

  render() {
    return (
      <ContainerWithSpinner isLoading={this.state.isLoading}>
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
          <CustomButton onClick={signInWithGoogle}>Sign with Google</CustomButton>
          <Link to="/register">You don´t have an account? Register</Link>
        */}
      </ContainerWithSpinner>
    );
  }
}

export default Login;
