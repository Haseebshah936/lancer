import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media (max-width: 500px) {
      ${props}
    }
  `;
};

export const tablet = (props) => {
  return css`
    @media (max-width: 768px) {
      ${props}
    }
  `
}

export const miniTablet = (props) => {
  return css`
    @media (max-width: 700px) {
      ${props}
    }
  `
}