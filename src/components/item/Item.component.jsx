import React from "react";

import { ItemStyle } from "./Item.style";

const Item = ({ id, title, onClick }) => {
  return (
    <ItemStyle key={id} onClick={onClick}>
      {title}
    </ItemStyle>
  );
};

export default Item;
