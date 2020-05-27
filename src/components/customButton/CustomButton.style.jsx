import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const lightblueStyle = css`
  box-shadow: 0px 10px 14px -7px #276873;
  background: linear-gradient(to bottom, #599bb3 5%, #408c99 100%);
  background-color: #599bb3;
  color: #ffffff;

  &:hover {
    background: linear-gradient(to bottom, #408c99 5%, #599bb3 100%);
    background-color: #408c99;
  }

  &:active {
    position: relative;
    top: 1px;
  }
`;

const commonStyle = css`
  box-shadow: 0px 10px 14px -7px #000000;
  background: linear-gradient(to bottom, #000000 5%, #000000 100%);
  background-color: #000000;
  color: #ffffff;

  &:hover {
    background: linear-gradient(to bottom, #000000 5%, #000000 100%);
    background-color: #000000;
  }

  &:active {
    position: relative;
    top: 1px;
  }
`;

const getButtonStyle = (props) => {
  if (props.lightblue) {
    return lightblueStyle;
  } else {
    return commonStyle;
  }
};

export const CustomButtonContainer = styled.button`
    border-radius:8px;
    display:inline-block;
    cursor:pointer;
    font-size:15px;
    font-weight:bold;
    padding:10px 65px;
    text-decoration:none;
    text-shadow:0px 1px 0px #3d768a;
    margin: 20px 0;
    border: none;
    }

    ${getButtonStyle}
`;
