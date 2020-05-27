import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { removeDocument } from "../../firebase/firebase.utils";
import { hideItem } from "../../redux/item/item.actions";

import { OptionsBarStyle, OptionsIconsStyle } from "./OptionsBar.style";
import { MdDelete, MdModeEdit } from "react-icons/md";
import ReactTooltip from "react-tooltip";
import swal from "sweetalert";
import "./OptionsBarModal.style.css";

const OptionsBar = ({ id, title, removeDocument, hideItem, currentUser }) => {
  return (
    <OptionsBarStyle>
      <h3 style={{ textAlign: "center" }}>{title}</h3>
      <OptionsIconsStyle>
        <MdDelete
          data-tip
          data-for="deleteIcon"
          onClick={async () => {
            swal({
              title: "Are you sure?",
              text:
                "Once deleted, you will not be able to recover these credentials!",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            }).then(async (willDelete) => {
              if (willDelete) {
                hideItem();
                await removeDocument(id, currentUser.id);
              }
            });
          }}
        />
        <ReactTooltip id="deleteIcon">
          <span>Delete</span>
        </ReactTooltip>
        <Link data-tip data-for="editIcon" to="/edit">
          <MdModeEdit />
        </Link>
        <ReactTooltip id="editIcon">
          <span>Edit</span>
        </ReactTooltip>
      </OptionsIconsStyle>
    </OptionsBarStyle>
  );
};

OptionsBar.propTypes = {
  removeDocument: PropTypes.func.isRequired,
  hideItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  removeDocument: (id, currentUserId) =>
    dispatch(removeDocument(id, currentUserId)),
  hideItem: () => dispatch(hideItem()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionsBar);
