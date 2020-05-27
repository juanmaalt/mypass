import styled from "styled-components";
import { Link } from "react-router-dom";

export const ItemEditStyle = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #222831;
  color: #ffffff;
  height: 100vh;
`;

export const CancelBarStyle = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  height: 10vh;
`;

export const CancelStyle = styled(Link)`
  color: #ffffff;
  font-size: 1.5em;
`;

export const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  margin-top: 100px;
`;

export const InputDivStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 20px;
  width: 300px;

  svg {
    font-size: 2em;
    margin-right: 5px;
  }

  input {
    color: #ffffff;
    font-size: 1em;
    min-width: 200px;
    min-height: 30px;
    background: transparent;
    border: none;
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
    transition: border-color 0.5s ease-out;
  }

  input:focus {
    outline: none;
  }
`;
