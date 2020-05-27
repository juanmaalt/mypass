import styled from "styled-components";

export const ItemViewStyle = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  padding: 0;
  border-left: 2px solid rgba(255, 255, 255, 0.2);
  padding: 30px 30px;
  width: 60%;
  align-items: center;
`;

export const PasswordStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  svg {
    margin-left: 10px;
    cursor: pointer;
  }
`;
