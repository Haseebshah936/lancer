import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import colors from "../../utils/colors";
import { bgcolor } from "@mui/system";
import { BorderBottom } from "@mui/icons-material";

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

function GigPricePlanMini(props) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const activeStyle = {
    backgroundColor: colors.white,
    marginBottom: "-1px",
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        width: "100%",
        height: "100%",
        minHeight: "40rem",
        border: "1px solid rgba(0,0,0,0.2)",
      }}
    >
      {/* <AppBar position="static"> */}
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor={colors.black}
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab
          sx={[
            {
              border: ".5px solid rgba(0,0,0,0.2)",
              marginLeft: "-1px",
              bgcolor: colors.lightGrey,
              padding: ".8rem 1rem"
            },
            value === 0 && activeStyle,
          ]}
          label="Item One"
          {...a11yProps(0)}
        />
        <Tab
          sx={[
            {
              border: ".5px solid rgba(0,0,0,0.2)",
              marginLeft: "-1px",
              bgcolor: colors.lightGrey,padding: ".8rem 1rem"
            },
            value === 1 && activeStyle,
          ]}
          label="Item Two"
          {...a11yProps(1)}
        />
        <Tab
          sx={[
            {
              border: ".5px solid rgba(0,0,0,0.2)",
              marginLeft: "-1px",
              marginRight: "-1px",
              bgcolor: colors.lightGrey,padding: ".8rem 1rem"
            },
            value === 2 && activeStyle,
          ]}
          label="Item Three"
          {...a11yProps(2)}
        />
      </Tabs>
      {/* </AppBar> */}
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}

export default GigPricePlanMini;
