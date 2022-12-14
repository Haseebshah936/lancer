import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import styled from "styled-components";
import CustomIconButton from "../CustomIconButton";
import PackageOfferings from "./PackageOfferings";
import PropTypes from "prop-types";
import { ArrowRightAlt } from "@mui/icons-material";
import { useCustomContext } from "../../Hooks/useCustomContext";
import CartDrawer from "../../pages/SellerPortfolio/CartDrawer";

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

function PackagePlan({ value, index, theme, plan }) {
  const { setSelectedPlan } = useCustomContext();
  const { setCartDrawer } = useCustomContext();
  return (
    <TabPanel value={value} index={index} dir={theme.direction}>
      <Heading>{plan?.name} package</Heading>
      <Price>${plan?.cost}</Price>
      <br />
      <Description>{plan?.details}</Description>
      <br />
      <Heading style={{ marginBottom: "1rem" }}>Package Includes</Heading>
      {plan.features.map((e, i) => {
        return (
          <PackageOfferings
            key={i}
            active={e.active}
            text={`${e?.quantity ? e?.quantity : ""} ${e.title}`}
          />
        );
      })}
      <CustomIconButton
        text="Hire me for your task"
        rightIcon={<ArrowRightAlt />}
        onClick={() => {
          setSelectedPlan(plan);
          setCartDrawer(true);
          console.log("plan", plan);
          console.log("Open Cart", CartDrawer);
        }}
      />
    </TabPanel>
  );
}

export default PackagePlan;

const Heading = styled.h3`
  font-size: 1.3rem;
  font-weight: bold;
`;

const Price = styled.h3`
  font-size: 1.7rem;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 1.2rem;
  text-align: justify;
`;
