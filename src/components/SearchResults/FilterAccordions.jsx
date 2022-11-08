import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import colors from "../../utils/colors";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import NumberFormat, { InputAttributes } from "react-number-format";
import Typography from "@mui/material/Typography";
import * as styled2 from "styled-components";
import { miniPc, mobile, tablet } from "../../responsive";
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import CustomFilledButton from "../CustomFilledButton";

const RelatedCategories = [
  { id: 1, title: "Wordpress Creation" },
  { id: 2, title: "Web Application Development" },
  { id: 3, title: "Web Programming" },
  { id: 4, title: "CMS" },
  { id: 5, title: "Mobile Apps" },
  { id: 6, title: "Mobile Apps Creation" },
  { id: 7, title: "Game Development" },
  { id: 8, title: "Web Design" },
];

const ServiceOptions = [
  {
    id: 1,
    service: "Specialization",
    options: [
      { id: 1, title: "Blog" },
      { id: 2, title: "Business" },
      { id: 3, title: "Education" },
      { id: 4, title: "Portfolio" },
    ],
  },
  {
    id: 2,
    service: "Supported Plugins",
    options: [
      { id: 1, title: "Social Media" },
      { id: 2, title: "Marketing" },
      { id: 3, title: "Payment" },
      { id: 4, title: "Gallery" },
    ],
  },
  {
    id: 3,
    service: "Service Includes",
    options: [
      { id: 1, title: "Functional Website" },
      { id: 2, title: "Responsive Design" },
      { id: 3, title: "Design Customization" },
      { id: 4, title: "Content Upload" },
    ],
  },
];

const SellerDetails = [
  {
    id: 1,
    detail: "Seller Level",
    options: [
      { id: 1, title: "Top Rated Seller" },
      { id: 2, title: "Level Two" },
      { id: 3, title: "Level One" },
      { id: 4, title: "New Seller" },
    ],
  },
  {
    id: 2,
    detail: "Seller Speaks",
    options: [
      { id: 1, title: "English" },
      { id: 2, title: "Urdu" },
      { id: 3, title: "Hindi" },
      { id: 4, title: "French" },
    ],
  },
  {
    id: 3,
    detail: "Seller Lives in",
    options: [
      { id: 1, title: "Pakistan" },
      { id: 2, title: "India" },
      { id: 3, title: "United States" },
      { id: 4, title: "Canada" },
    ],
  },
];
const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,

  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: colors.textGreen,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

const FilterAccordions = ({
  handleAvail,
  handlePro,
  handleLocal,
  local,
  pro,
  avail,
}) => {
  return (
    <>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              sx={{ color: colors.textGreen, fontSize: "2.0rem !important" }}
            />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <CategoryOutlinedIcon
            sx={{
              fontSize: "2.0rem",
              color: colors.textGreen,
              marginRight: "10px",
            }}
          />
          <Typography sx={{ fontSize: "1.5rem", fontWeight: "300" }}>
            Categories
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {RelatedCategories.map((c) => (
            <FilterText>
              <Link>{c.title}</Link>
            </FilterText>
          ))}
          <FilterText>
            {" "}
            <Link style={{ color: colors.textGreen }}>View All Categories</Link>
          </FilterText>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              sx={{ color: colors.textGreen, fontSize: "2.0rem !important" }}
            />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <TuneOutlinedIcon
            sx={{
              fontSize: "2.0rem",
              color: colors.textGreen,
              marginRight: "10px",
            }}
          />
          <Typography sx={{ fontSize: "1.5rem", fontWeight: "300" }}>
            Service&nbsp;Options
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl component="fieldset">
            {ServiceOptions.map((sarray) => (
              <>
                <FormLabel
                  component="legend"
                  sx={{
                    fontSize: "1.3rem",
                    fontWeight: "500",
                    color: colors.black,
                  }}
                >
                  {sarray.service}
                </FormLabel>
                <FormGroup aria-label="position" sx={{ marginBottom: "5px" }}>
                  {sarray.options.map((checkbox) => (
                    <FormControlLabel
                      sx={{ paddingTop: "0px" }}
                      value="end"
                      control={
                        <Checkbox
                          sx={{
                            color: colors.textGreen,
                            "&.Mui-checked": {
                              color: colors.textGreen,
                            },
                          }}
                        />
                      }
                      label={checkbox.title}
                      labelPlacement="End"
                    />
                  ))}
                </FormGroup>
              </>
            ))}
          </FormControl>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <CustomFilledButton
              title={"Apply"}
              style={{ margin: "5px 0px 0px 0px" }}
            ></CustomFilledButton>
          </div>
        </AccordionDetails>
      </Accordion>{" "}
      <Accordion>
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              sx={{ color: colors.textGreen, fontSize: "2.0rem !important" }}
            />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <PersonSearchOutlinedIcon
            sx={{
              fontSize: "2.0rem",
              color: colors.textGreen,
              marginRight: "10px",
            }}
          />
          <Typography sx={{ fontSize: "1.5rem", fontWeight: "300" }}>
            Seller&nbsp;Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl component="fieldset">
            {SellerDetails.map((sarray) => (
              <>
                <FormLabel
                  component="legend"
                  sx={{
                    fontSize: "1.3rem",
                    fontWeight: "500",
                    color: colors.black,
                  }}
                >
                  {sarray.detail}
                </FormLabel>
                <FormGroup aria-label="position" sx={{ marginBottom: "5px" }}>
                  {sarray.options.map((checkbox) => (
                    <FormControlLabel
                      sx={{ paddingTop: "0px" }}
                      value="end"
                      control={
                        <Checkbox
                          sx={{
                            color: colors.textGreen,
                            "&.Mui-checked": {
                              color: colors.textGreen,
                            },
                          }}
                        />
                      }
                      label={checkbox.title}
                      labelPlacement="End"
                    />
                  ))}
                </FormGroup>
              </>
            ))}
          </FormControl>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <CustomFilledButton
              title={"Apply"}
              style={{ margin: "5px 0px 0px 0px" }}
            ></CustomFilledButton>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              sx={{ color: colors.textGreen, fontSize: "2.0rem !important" }}
            />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <AttachMoneyIcon
            sx={{
              fontSize: "2.0rem",
              color: colors.textGreen,
              marginRight: "10px",
            }}
          />
          <Typography sx={{ fontSize: "1.5rem", fontWeight: "300" }}>
            Budget
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" column>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="100"
                    control={
                      <Radio
                        sx={{
                          color: colors.textGreen,
                          "&.Mui-checked": {
                            color: colors.textGreen,
                          },
                        }}
                      />
                    }
                    label="Under $100"
                  />
                  <FormControlLabel
                    value="200"
                    control={
                      <Radio
                        sx={{
                          color: colors.textGreen,
                          "&.Mui-checked": {
                            color: colors.textGreen,
                          },
                        }}
                      />
                    }
                    label="Between $100 - $200"
                  />
                  <FormControlLabel
                    value="300"
                    control={
                      <Radio
                        sx={{
                          color: colors.textGreen,
                          "&.Mui-checked": {
                            color: colors.textGreen,
                          },
                        }}
                      />
                    }
                    label="Between $200 - $300"
                  />
                </RadioGroup>
                <FilterText style={{ marginTop: "10px" }}> Custom </FilterText>
                <NumberField>
                  <TextField
                    sx={{
                      marginTop: "10px",
                      "& label.Mui-focused": {
                        color: colors.textGreen,
                      },
                      "& .MuiInput-underline:after": {
                        borderBottomColor: colors.textGreen,
                      },
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: colors.textGreen,
                        },
                      },
                    }}
                    id="outlined-number"
                    label="Minimum Ammount $"
                    type="number"
                  />
                </NumberField>
                <NumberField>
                  <TextField
                    sx={{
                      marginTop: "10px",
                      "& label.Mui-focused": {
                        color: colors.textGreen,
                      },
                      "& .MuiInput-underline:after": {
                        borderBottomColor: colors.textGreen,
                      },
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: colors.textGreen,
                        },
                      },
                    }}
                    id="outlined-number"
                    label="Maximum Ammount $"
                    type="number"
                  />
                </NumberField>
              </FormGroup>
            </FormControl>

            <CustomFilledButton
              title={"Apply"}
              style={{ marginTop: "10px", margin: "5px 0px 0px 0px" }}
            ></CustomFilledButton>
          </>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              sx={{ color: colors.textGreen, fontSize: "2.0rem !important" }}
            />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <TimerOutlinedIcon
            sx={{
              fontSize: "2.0rem",
              color: colors.textGreen,
              marginRight: "10px",
            }}
          />
          <Typography sx={{ fontSize: "1.5rem", fontWeight: "300" }}>
            Delivery&nbsp;Time
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <>
            <FormControl component="fieldset">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="24H"
                  control={
                    <Radio
                      sx={{
                        color: colors.textGreen,
                        "&.Mui-checked": {
                          color: colors.textGreen,
                        },
                      }}
                    />
                  }
                  label="Urgent: 24H"
                />
                <FormControlLabel
                  value="3"
                  control={
                    <Radio
                      sx={{
                        color: colors.textGreen,
                        "&.Mui-checked": {
                          color: colors.textGreen,
                        },
                      }}
                    />
                  }
                  label="Quick: within 3 days"
                />
                <FormControlLabel
                  value="7"
                  control={
                    <Radio
                      sx={{
                        color: colors.textGreen,
                        "&.Mui-checked": {
                          color: colors.textGreen,
                        },
                      }}
                    />
                  }
                  label="Standard: Within 7 days"
                />
                <FormControlLabel
                  value="anytime"
                  control={
                    <Radio
                      sx={{
                        color: colors.textGreen,
                        "&.Mui-checked": {
                          color: colors.textGreen,
                        },
                      }}
                    />
                  }
                  label="Anytime"
                />
              </RadioGroup>
            </FormControl>
          </>
        </AccordionDetails>
      </Accordion>
      <FormGroup style={{ marginLeft: 10 }}>
        <FormControlLabel
          style={{ marginTop: 10 }}
          control={
            <AntSwitch
              sx={{ marginRight: "5px" }}
              defaultChecked={false}
              checked={pro}
              onChange={handlePro}
            />
          }
          label="Rana&nbsp;Pro&nbsp;Services"
        />
        <FormControlLabel
          style={{ marginTop: 10 }}
          control={
            <AntSwitch
              sx={{ marginRight: "5px" }}
              defaultChecked={false}
              checked={local}
              onChange={handleLocal}
            />
          }
          label="Local&nbsp;Sellers"
        />
        <FormControlLabel
          style={{ marginTop: 10 }}
          control={
            <AntSwitch
              sx={{ marginRight: "5px" }}
              defaultChecked={false}
              checked={avail}
              onchange={handleAvail}
            />
          }
          label="Availabe&nbsp;Now"
        />
      </FormGroup>
    </>
  );
};

export default FilterAccordions;

const FilterText = styled2.default.div`
    font-size:1.2rem;
    margin-bottom:8px;
    a:hover{
      color:${colors.textGreen} !important
    };
    a{
      text-decoration: none !important;
      font-size: 1.2rem !important;
    };
    a:active{
      color:${colors.textGreen} !important;
      font-weight:300;
    };
`;

const NumberField = styled2.default.div`
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
`;
