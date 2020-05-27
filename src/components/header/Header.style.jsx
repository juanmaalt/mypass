import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderStyle = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 20px;
  width: 100%;
  color: #ffffff;
  background-color: #222831;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  height: 10vh;
`;

export const LinkStyle = styled(Link)`
  color: #ffffff;
  font-size: 1.8em;
  margin: 0 10px;
`;

export const InputDivStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  svg {
    font-size: 2em;
  }

  input {
    color: #ffffff;
    font-size: 1em;
    min-width: 100px;
    background: transparent;
    border: none;
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
    transition: border-color 0.5s ease-out;
  }

  input:focus {
    outline: none;
  }
`;
