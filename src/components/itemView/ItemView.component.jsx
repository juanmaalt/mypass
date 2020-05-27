import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Decode } from "../code/Code";
import { CopyToClipboard } from "react-copy-to-clipboard";

import OptionsBar from "../optionsBar/OptionsBar.component";

import { ItemViewStyle, PasswordStyle } from "./ItemView.style";
import { MdContentCopy, MdVisibility, MdVisibilityOff } from "react-icons/md";

class ItemView extends Component {
  constructor() {
    super();

    this.state = {
      isVisible: false,
    };

    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  toggleVisibility() {
    this.setState((prevState) => ({
      isVisible: !prevState.isVisible,
    }));
  }

  render() {
    const { id, title, email, user, password, hidden } = this.props;

    return (
      <ItemViewStyle key={id}>
        {!hidden ? (
          <>
            <OptionsBar id={id} title={title} />
            <div>
              <p>Email: {Decode(email, 1)}</p>
              <p>User: {Decode(user, 2)}</p>
              <PasswordStyle>
                <p>
                  Password:{" "}
                  {this.state.isVisible ? Decode(password, 3) : "******"}
                </p>
                <CopyToClipboard text={Decode(password, 3)}>
                  <MdContentCopy />
                </CopyToClipboard>
                {this.state.isVisible ? (
                  <MdVisibilityOff onClick={this.toggleVisibility} />
                ) : (
                  <MdVisibility onClick={this.toggleVisibility} />
                )}
              </PasswordStyle>
            </div>
          </>
        ) : (
          <div />
        )}
      </ItemViewStyle>
    );
  }
}

ItemView.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  hidden: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  id: state.item.id,
  title: state.item.title,
  email: state.item.email,
  user: state.item.user,
  password: state.item.password,
  hidden: state.item.hidden,
});

export default connect(mapStateToProps, null)(ItemView);
