import { Button } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import colors from '../../utils/colors';

function CustomButton({style,leftIcon, text, rightIcon}) {
    return (
        <CustomIconButton style={style} variant="contained">
            {leftIcon}
        &nbsp;&nbsp;{text}
        {rightIcon}
      </CustomIconButton>
    );
}

export default CustomButton;

const CustomIconButton = styled(Button)`
  align-self: center;
  margin-top: 2rem !important;
  margin-bottom: 2.5rem !important;
  color: ${colors.white} !important;
  background-color: ${colors.textGreen} !important;
  width: 100%;
  padding-block: 1rem !important;
  text-transform: none !important;
  font-weight: bold !important;
`