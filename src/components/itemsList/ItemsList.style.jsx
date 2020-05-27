import styled from "styled-components";

export const ItemsListStyle = styled.ul`
  background-color: #222831;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 40%;
  overflow-y: scroll;
  margin: 0px;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
