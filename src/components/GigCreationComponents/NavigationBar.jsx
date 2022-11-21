import { KeyboardBackspaceOutlined } from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import colors from "../../utils/colors";

export default function NavigationBar({ handleStep, handleBack, activeStep }) {
  return (
    <>
      <Grid container direction="row" sx={{ marginTop: "15px" }}>
        <Grid item container mobile={12} direction="row">
          {" "}
          <Paper
            elevation={2}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              px: 2,
              py: 5,
              borderRadius: "15px",
              backgroundColor: colors.textGreen,
              color: colors.white,
              maxWidth: "100%",
              minWidth: "100%",
            }}
          >
            {" "}
            <Grid item container justifyContent="space-between" mobile={4}>
              <IconWrapper>
                <Tooltip title="Go back to Edit" placement="top">
                  <IconButton
                    sx={{ my: -5, color: colors.white }}
                    onClick={handleBack}
                  >
                    <KeyboardBackspaceOutlined
                      sx={{ fontSize: "2rem !important" }}
                    />
                  </IconButton>
                </Tooltip>
              </IconWrapper>
              <Typography variant="h4">Add/Edit Service</Typography>
            </Grid>
            <Grid item container justifyContent="flex-end" mobile={6}>
              <Typography variant="h5">
                {" "}
                Click "Save & continue" to add latest changes <br /> made by
                you.{" "}
              </Typography>
            </Grid>
            <Grid item container justifyContent="center" mobile={2}>
              <button
                type="button"
                class="btn"
                style={{
                  backgroundColor: colors.textGreen,
                  color: colors.white,
                  ".btn:hover": {
                    backgroundColor: colors.white,
                    color: colors.textGreen,
                  },
                  padding: "8px 5px 5px 8px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                }}
                onClick={handleStep(activeStep + 1)}
              >
                Save & Continue
              </button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
const IconWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;
