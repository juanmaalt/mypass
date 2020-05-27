import styled from "styled-components";

export const ItemStyle = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  box-sizing: border-box;
  cursor: pointer;

  & + div {
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }
`;
