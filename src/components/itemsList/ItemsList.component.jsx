import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Item from "../item/Item.component";
import { showItem } from "../../redux/item/item.actions";

import { ItemsListStyle } from "./ItemsList.style";

const ItemsList = ({ filteredItems, showItem }) => {
  return (
    <ItemsListStyle>
      {filteredItems.map((item) => (
        <Item
          key={item.id}
          {...item}
          onClick={() => {
            showItem(item);
          }}
        />
      ))}
    </ItemsListStyle>
  );
};

ItemsList.propTypes = {
  showItem: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  showItem: (item) => dispatch(showItem(item)),
});

export default connect(null, mapDispatchToProps)(ItemsList);
