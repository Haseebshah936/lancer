import { IconButton, Paper, Typography, styled } from "@mui/material";
import colors from "../../utils/colors";
import * as styled2 from "styled-components";
import { CancelOutlined } from "@mui/icons-material";

export default function FeatureCard({
  name = "Deployment",
  type = "Quantity",
  handleDelete = () => {},
}) {
  return (
    <>
      <Paper
        elevation={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          borderRadius: "15px",
          border: "2px solid",
          borderColor: colors.textGreen,
          margin: "auto",

          minWidth: "150px",
          mr: 1,
          mb: 1,
        }}
      >
        <CrossWrapper>
          <IconButton
            sx={{ p: 0 }}
            disableRipple
            onClick={() => handleDelete(name)}
          >
            <CancelOutlined
              sx={{
                color: colors.textGreen,
                fontSize: "1.9rem",
                cursor: "pointer",
              }}
            />
          </IconButton>
        </CrossWrapper>
        <Content>
          <Name>{name}</Name>
          <Wrapper>
            <TypeText>Type: </TypeText>
            <Type>{type === "" ? "simple" : type}</Type>
          </Wrapper>
        </Content>
      </Paper>
    </>
  );
}

const Name = styled(Typography)({
  color: colors.black,
  fontWeight: "500",
  fontSize: "1.4rem",
});

const Type = styled(Typography)({
  color: colors.textGreen,
  fontWeight: "600",
  fontSize: "1.3rem",
  paddingLeft: "5px",
});

const TypeText = styled(Typography)({
  color: colors.black,
  fontWeight: "500",
  fontSize: "1.3rem",
});

const Wrapper = styled2.default.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 5px;
`;

const CrossWrapper = styled2.default.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-top: 5px;
  padding-right: 5px;
`;

const Content = styled2.default.div`
  padding: 0px 10px 10px 10px;
`;
