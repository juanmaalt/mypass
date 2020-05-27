import React, { Component } from "react";

import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

import { CustomButton } from "../../components/customButton/CustomButton.component";
import { Container, LoginForm, InputDivStyle } from "./Login.style";
import { MdAccountBox, MdLock } from "react-icons/md";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async onSubmit(event) {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);

      this.setState = {
        email: "",
        password: "",
      };
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Container>
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
      </Container>
    );
  }
}

export default Login;
