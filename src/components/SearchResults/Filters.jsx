import { useState } from "react";
import colors from "../../utils/colors";
import { Box, Drawer, IconButton, Typography } from "@mui/material";
import * as styled2 from "styled-components";
import { miniPc, mobile, tablet } from "../../responsive";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import FilterAccordions from "./FilterAccordions";
import PortfolioCardMobile from "../PortfolioCardMobile";
import { teamImg } from "../../assets";
import { CancelOutlined, SortOutlined } from "@mui/icons-material";

const Filters = ({}) => {
  const [filterdraw, setFilterdraw] = useState(false);
  const toggleFiltersDraw = (open) => (event) => {
    console.log("asdsad");

    setFilterdraw(open);
  };

  return (
    <Container>
      <FilterButton>
        <Button
          onClick={toggleFiltersDraw(true)}
          variant="outlined"
          startIcon={<FilterAltOutlinedIcon />}
          sx={{
            color: colors.textGreen,
            "&.MuiButton-outlined": {
              borderColor: colors.textGreen,
            },

            width: "100%",
            mb: 1,
          }}
        >
          Filters
        </Button>
        <Drawer
          anchor="bottom"
          open={filterdraw}
          onClose={toggleFiltersDraw(false)}
        >
          <Box
            sx={{
              height: "100vh",
              width: "auto",
              backgroundColor: "white",
              p: 2,
            }}
            role="presentation"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                onClick={toggleFiltersDraw(false)}
                sx={{ m: 0, p: 0 }}
              >
                <CancelOutlined
                  fontSize="large"
                  sx={{ color: colors.textGreen, m: 0, p: 0 }}
                />
              </IconButton>
            </div>
            <FilterAccordions toggleFiltersDraw={toggleFiltersDraw} />
          </Box>
        </Drawer>
        {/* <Button
          variant="outlined"
          startIcon={<SortOutlined />}
          sx={{
            "&.MuiButton-outlined": {
              borderColor: colors.textGreen,
            },

            width: "50%",
            color: colors.textGreen,
          }}
        >
          Sort
        </Button> */}
      </FilterButton>

      <Accordions>
        <FilterAccordions />
      </Accordions>
    </Container>
  );
};

export default Filters;

const Container = styled2.default.div`
  margin-right: 30%;
  ${miniPc({ marginRight: "20%" })}
  ${tablet({ marginRight: "0px" })}
`;

const Accordions = styled2.default.div`
${mobile({ display: "none" })}
`;

const FilterButton = styled2.default.div`
display: none;
${mobile({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "20px",
})}
`;
