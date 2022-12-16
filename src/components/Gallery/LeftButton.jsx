import { Button } from '@mui/material';
import React from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function LeftButton({variant="outlined", style, onClick=() => {}, rem}) {
    return (
        <Button
            variant={variant}
            style={style}
            sx={{
              borderRadius: "2rem",
              color: "black",
              borderColor: "#0000009e",
              "&:hover": {
                backgroundColor: "transparent",
                borderColor: "#0000009e",
              },
              marginLeft: "1rem",
              fontSize: "1rem",
              padding: ".7rem 2rem",
              minWidth: "1rem",
              textTransform: "capitalize",
              minWidth: "1rem",
              marginBottom: ".5rem"
            }}
            onClick={onClick}
          >
            <ArrowBackIcon fontSize="medium" />
          </Button>
    );
}

export default LeftButton;