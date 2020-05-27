import React from "react";

import { HeaderStyle, LinkStyle, InputDivStyle } from "./Header.style";

import { MdLibraryAdd, MdExitToApp, MdSearch } from "react-icons/md";
import ReactTooltip from "react-tooltip";

const Header = ({ onChange, onClick }) => {
  return (
    <HeaderStyle>
      <h2>MyPass</h2>
      <InputDivStyle>
        <MdSearch />
        <input type="text" placeholder=" Search" onChange={onChange} />
      </InputDivStyle>
      <div>
        <LinkStyle data-tip data-for="newIcon" to="/new">
          <MdLibraryAdd />
        </LinkStyle>
        <ReactTooltip id="newIcon" place="bottom">
          <span>New credentials</span>
        </ReactTooltip>
        <MdExitToApp
          data-tip
          data-for="signOutIcon"
          style={{ fontSize: "1.8em", cursor: "pointer" }}
          onClick={onClick}
        />
        <ReactTooltip id="signOutIcon" place="bottom">
          <span>Sign out</span>
        </ReactTooltip>
      </div>
    </HeaderStyle>
  );
};

export default Header;
