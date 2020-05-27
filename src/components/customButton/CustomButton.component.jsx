import React from "react";

import { CustomButtonContainer } from "./CustomButton.style";

export const CustomButton = ({ children, ...props }) => (
  <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
);
