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
    const { id, title, email, user, password, hidden, params } = this.props;
    const general = params.TYPE_X;

    return (
      <ItemViewStyle key={id}>
        {!hidden ? (
          <>
            <OptionsBar id={id} title={title} />
            <div>
              <p>Email: {Decode(email, general, params.TYPE_A)}</p>
              <p>User: {Decode(user, general, params.TYPE_B)}</p>
              <PasswordStyle>
                <p>
                  Password:{" "}
                  {this.state.isVisible ? Decode(password, general, params.TYPE_C) : "******"}
                </p>
                <CopyToClipboard text={Decode(password, general, params.TYPE_C)}>
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
  params: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  id: state.item.id,
  title: state.item.title,
  email: state.item.email,
  user: state.item.user,
  password: state.item.password,
  hidden: state.item.hidden,
  params: state.keys,
});

export default connect(mapStateToProps, null)(ItemView);
