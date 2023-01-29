import { Divider, Paper, Typography, styled, IconButton } from "@mui/material";
import colors from "../../utils/colors";
import * as styled2 from "styled-components";
import EastIcon from "@mui/icons-material/East";
import { useNavigate } from "react-router";
import { useContext } from "react";

const StatCardWidget = ({ Heading, Value, link, tabValue }) => {
  const navigate = useNavigate();

  return (
    <>
      <Paper
        elevation={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          p: 2,

          margin: "auto",
          maxWidth: "100%",
        }}
      >
        <CardHeading>{Heading}</CardHeading>
        <CardValue>{Value}</CardValue>
        <Divider sx={{ mx: -2 }} />
        <FooterWrapper>
          <CardFooterText>View Details</CardFooterText>
          <IconButton
            disableRipple
            onClick={() => {
              if (link) {
                navigate(link, {
                  state: {
                    value: tabValue,
                  },
                });
              }
            }}
          >
            <EastIcon
              sx={{
                fontSize: "2.0rem",
                color: colors.black,
                cursor: "pointer",
                ":hover": {
                  color: colors.textGreen,
                },
              }}
            />
          </IconButton>
        </FooterWrapper>
      </Paper>
    </>
  );
};

export default StatCardWidget;

const FooterWrapper = styled2.default.div`
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  align-items:center;
  margin-top:15px;
`;

const CardHeading = styled(Typography)({
  color: colors.black,
  fontWeight: "500",
  fontSize: "1.8rem",
  paddingBottom: 3,
});

const CardValue = styled(Typography)({
  color: colors.textGreen,
  fontWeight: "600",
  fontSize: "2.0rem",

  paddingBottom: 12,
});

const CardFooterText = styled(Typography)({
  color: colors.black,
  fontWeight: "400",
  fontSize: "1.5rem",
  cursor: "pointer",
  ":hover": {
    color: colors.textGreen,
  },
});
