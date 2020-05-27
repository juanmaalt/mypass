import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #222831;
  color: white;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const InputDivStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 20px;

  svg{
    font-size: 2em;
    margin-right: 5px;
  }

  input {
    color: #FFFFFF;
    font-size: 1em;
    min-width: 100px;
    min-height: 30px;
    background: transparent;
    border: none;
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
    transition: border-color 0.5s ease-out;
  }

  input:focus{
    outline: none;
  }
`