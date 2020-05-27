import styled from "styled-components";

export const OptionsBarStyle = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  height: 10%;
  padding: 0 10px;
`;

export const OptionsIconsStyle = styled.div`
  a {
    color: #ffffff;
  }

  svg {
    margin-left: 20px;
    font-size: 1.5em;
    cursor: pointer;
  }
`;
