import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import colors from "../../utils/colors";
import styled from "styled-components";
import PackagePlan from "./PackagePlan";
import { miniMobile, miniTablet, mobile } from "../../responsive";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function PricingPlan({pakages=[]}) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const activeStyle = {
    backgroundColor: `${colors.white} !important`,
    marginBottom: "-1px",
  };

  return (
    <CustomBox>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor={colors.black}
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        {
          pakages.map((e,i) => {
            return <CustomTab key={i} id={i}
          sx={value === i && activeStyle}
          label={e.name}
          {...a11yProps(0)}
        />
          })
        }
        
      </Tabs>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {
          pakages.map((e, i) => {
            return <PackagePlan key={i} value={value} index={i} theme={theme} plan={e}/>
          })
        }
      </SwipeableViews>
    </CustomBox>
  );
}

export default PricingPlan;

const CustomBox = styled(Box)`
  background-color: ${colors.white};
  width: 100%;
  margin-bottom: 10rem;
  ${miniTablet({
    marginBottom: 0,
    
  })}
  ${mobile({
    marginBottom: "5rem",
  })}
  min-height: 50rem;
  box-shadow: 3px 2px 16px 5px rgba(240, 240, 240, 0.75);
  -webkit-box-shadow: 3px 2px 16px 5px rgba(240, 240, 240, 0.75);
  -moz-box-shadow: 3px 2px 16px 5px rgba(240, 240, 240, 0.75);
`;

const CustomTab = styled(Tab)`
  background-color: ${colors.lightGrey} !important;
  padding: 0.5rem 1rem !important;
  font-size: 1rem !important;
  font-weight: bold !important;
`;
