import React from "react";
import styled from "styled-components";
import colors from "../../utils/colors";

export default function ActivePageMarker() {
  return (
    <div>
      <Div></Div>
    </div>
  );
}

const Div = styled.div`
  width: 0.23rem;
  height: 2.8rem;
  background-color: ${colors.becomePartnerGreen};
  margin-right: 1.5rem;
`;
