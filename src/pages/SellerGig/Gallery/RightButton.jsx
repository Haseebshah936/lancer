import { Button } from '@mui/material';
import React from 'react';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import colors from '../../../utils/colors';

function RightButton({variant="outlined", style, onClick=() => {}}) {
    return (
        <Button
              variant={variant}
              style={style}
              sx={{
                color: "white",
                borderRadius: "2rem",
                marginLeft: "1rem",
                fontSize: "1rem",
                padding: ".7rem 2rem",
                minWidth: "1rem",
                background: ` linear-gradient(130deg, #172f33, ${colors.primaryGreen}) border-box`,
                textTransform: "capitalize",
              }}
              onClick={onClick}
            >
              <ArrowForwardIcon fontSize="medium" />
            </Button>
    );
}

export default RightButton;