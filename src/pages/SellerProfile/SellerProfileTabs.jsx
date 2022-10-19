import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import colors from "../../utils/colors";
import styled from "styled-components";
import Portfolios from "./Portfolios";
import { Pagination } from "@mui/material";
import Reviews from "../../components/ReviewsComponent";
import AboutSeller from "../../components/AboutSeller/AboutSeller";
import { miniTablet } from "../../responsive";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SellerProfileTabs({ style }) {
  const [value, setValue] = React.useState(0);
  const [pagination, setPagination] = React.useState(1);
  const [count, setCount] = React.useState(1);
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  React.useEffect(() => {
    setCount(Math.ceil(a.length / 6));
  }, [pagination]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "46rem",
        height: "100%",
      }}
      style={style}
    >
      <Box sx={{ borderBottom: 1, borderColor: colors.becomePartnerGreen }}>
        <CustomTabContainer
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <CustomTab label="Portfolios" {...a11yProps(1)} />
          <CustomTab label="Reviews" {...a11yProps(2)} />
          <CustomTab label="About" sx={{ display: "none" }} {...a11yProps(0)} />
        </CustomTabContainer>
      </Box>

      <TabPanel value={value} index={0}>
        <Box
          id="portfolio"
          mt={{ md: "2rem", xs: 0 }}
          px={{ lg: "4rem", md: "2rem", xs: "0rem" }}
          mb={"2rem"}
        >
          <Portfolios data={a.slice((pagination - 1) * 6, pagination * 6)} />
          <Box
            mt={"4rem"}
            display="flex"
            justifyContent="center"
            alignContent={"center"}
            width="100%"
          >
            <Pagination
              count={count}
              page={pagination}
              onChange={(e, page) => setPagination(page)}
            />
          </Box>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box
          mt={{ md: "2rem", xs: "0rem" }}
          mb={"2rem"}
          px={{ md: "2rem", xs: "0rem" }}
          id="reviews"
        >
          <Reviews />
        </Box>
      </TabPanel>
      <CustomTabPanel value={value} index={2}>
        <Box
          mt={{ md: "2rem", xs: "0rem" }}
          mb={"2rem"}
          px={{ md: "2rem", xs: "0rem" }}
          id="about"
          display={{ md: "none", xs: "flex" }}
        >
          <AboutSeller />
        </Box>
      </CustomTabPanel>
    </Box>
  );
}

const CustomTabContainer = styled(Tabs)`
  .css-1aquho2-MuiTabs-indicator {
    background-color: ${colors.becomePartnerGreen} !important;
  }
  .Mui-selected {
    color: ${colors.becomePartnerGreen} !important;
  }
  min-height: 4rem !important;
  ${miniTablet({ display: "flex", flexDirection: "row-reverse" })}
`;

const CustomTab = styled(Tab)`
  /* background-color: ${colors.lightGrey} !important; */
  padding: 0.5rem 1rem !important;
  font-size: 1rem !important;
  font-weight: bold !important;
  text-transform: none !important;
  min-height: 4rem !important;
  .css-1aquho2-MuiTabs-indicator {
    background-color: ${colors.textGreen} !important;
  }
  ${(props) =>
    props.label === "About" && miniTablet({ display: " flex !important" })}
`;
const SubHeading = styled.h2`
  font-weight: 600;
  font-size: 1.6rem;
  margin-block: 2rem;
`;

const CustomTabPanel = styled(TabPanel)`
  /* display: none;
  padding: 2rem;
  ${miniTablet({
    display: "flex !important",
  })} */
`;
