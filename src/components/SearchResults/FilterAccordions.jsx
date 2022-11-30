import { useEffect, useState } from "react";
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

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import NumberFormat, { InputAttributes } from "react-number-format";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import { miniPc, mobile, tablet } from "../../responsive";
import {
  CircularProgress,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import CustomFilledButton from "../CustomFilledButton";
import axios from "axios";
import { MilitaryTechOutlined, PriceChange } from "@mui/icons-material";
import helperFunction from "./helperFunction";
import { useCustomContext } from "../../Hooks/useCustomContext";

const FilterAccordions = ({ toggleFiltersDraw = () => {} }) => {
  const { searchData, setSearchData, terms, setSearchDataLoader } =
    useCustomContext();
  const [Categories, setCategories] = useState([]);
  const [SubCategories, setSubCategories] = useState([]);

  const [expandSubCategory, setExpandSubCategory] = useState(false);

  const [expandCategory, setExpandCategory] = useState(true);

  const [Categoryloading, setCategoryloading] = useState(true);
  const [SubCategoryloading, setSubCategoryloading] = useState(true);

  const [SubCategoryID, setSubCategoryID] = useState("");

  const [price, setPrice] = useState({
    max: "",
    min: "",
  });

  const [Badge, setBadge] = useState("");

  const handleFilters = () => {
    // console.log("I am in Filters");
    helperFunction(
      Badge,
      price,
      SubCategoryID,
      terms,
      setSearchData,
      setSearchDataLoader
    );
  };

  const clearFilters = () => {
    console.log("I am in Filters");
    setPrice({ max: "", min: "" });
    setSubCategoryID("");
    setBadge("");
  };

  const handlePrice = (max, min) => {
    setPrice({ max, min });
    // console.log("Max", max, "Min", min);
  };

  const handleSubCategory = (id) => {
    setSubCategoryID(id);
  };

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        "http://localhost:3003/api/category/categories"
      );
      setCategories(response.data);
      setCategoryloading(false);
    })();
  }, []);

  useEffect(() => {
    // console.log("Badge", Badge);
  }, [Badge]);

  return (
    <>
      <Accordion
        expanded={expandCategory}
        onChange={() => {
          setExpandCategory(!expandCategory);
        }}
      >
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
          {Categoryloading ? (
            <CircularProgress sx={{ color: colors.textGreen }} size={20} />
          ) : (
            Categories.map((c) => (
              <FilterText
                onClick={() => {
                  setExpandSubCategory(true);

                  axios
                    .get(
                      `http://localhost:3003/api/category/subCategories/${c._id}`
                    )
                    .then((response) => {
                      setSubCategories(response.data);
                      setSubCategoryloading(false);
                    });
                }}
              >
                {c.title}
              </FilterText>
            ))
          )}

          <FilterText>
            {" "}
            <Link style={{ color: colors.textGreen }}>View All Categories</Link>
          </FilterText>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expandSubCategory}
        onChange={() => {
          setExpandSubCategory(!expandSubCategory);
        }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              sx={{ color: colors.textGreen, fontSize: "2.0rem !important" }}
            />
          }
          aria-controls="subcategorya-content"
          id="subcategorya-header"
        >
          <TuneOutlinedIcon
            sx={{
              fontSize: "2.0rem",
              color: colors.textGreen,
              marginRight: "10px",
            }}
          />
          <Typography sx={{ fontSize: "1.5rem", fontWeight: "300" }}>
            SubCategory
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {SubCategoryloading ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress sx={{ color: colors.textGreen }} size={20} />
              <Typography variant="body2" sx={{ mt: 2 }}>
                Please select Category
              </Typography>
            </div>
          ) : (
            <FormGroup aria-label="position" sx={{ marginBottom: "5px" }}>
              {SubCategories.map((cat) => (
                <FormControlLabel
                  sx={{ paddingTop: "0px" }}
                  value="end"
                  control={
                    <Checkbox
                      checked={SubCategoryID === cat?._id}
                      onChange={(e) => {
                        e.currentTarget.value && handleSubCategory(cat._id);
                      }}
                      sx={{
                        color: colors.textGreen,
                        "&.Mui-checked": {
                          color: colors.textGreen,
                        },
                      }}
                    />
                  }
                  label={cat.title}
                  labelPlacement="End"
                />
              ))}
            </FormGroup>
          )}
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
                  aria-labelledby="Price-group"
                  defaultValue="100"
                  name="Price-group"
                  value={price.max}
                  onChange={(event) =>
                    handlePrice(
                      event.target.value,
                      (+event.target.value - 100).toString()
                    )
                  }
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
                    onChange={(event) => {
                      handlePrice(price.max, event.target.value);
                    }}
                    value={price.min}
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
                    onChange={(event) => {
                      handlePrice(event.target.value, price.min);
                    }}
                    value={price.max}
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
          <MilitaryTechOutlined
            sx={{
              fontSize: "2.0rem",
              color: colors.textGreen,
              marginRight: "10px",
            }}
          />
          <Typography sx={{ fontSize: "1.5rem", fontWeight: "300" }}>
            Seller Badge
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" column>
                <RadioGroup
                  aria-labelledby="Seller-group"
                  defaultValue="Newbie"
                  name="Seller-group"
                  value={Badge}
                  onChange={(event) => {
                    setBadge(event.target.value);
                  }}
                >
                  <FormControlLabel
                    value="Newbie"
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
                    label="Newbie"
                  />
                  <FormControlLabel
                    value="Pro"
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
                    label="Pro"
                  />
                  <FormControlLabel
                    value="Verified Pro"
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
                    label="Verified Pro"
                  />
                </RadioGroup>
              </FormGroup>
            </FormControl>
          </>
        </AccordionDetails>
      </Accordion>
      <FilterButtons>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <CustomFilledButton
            onClick={handleFilters}
            title={"Apply Filters"}
            style={{ margin: "15px 0px 0px 0px" }}
          ></CustomFilledButton>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <CustomFilledButton
            onClick={clearFilters}
            title={"Clear Filters"}
            style={{ margin: "15px 0px 0px 0px" }}
          ></CustomFilledButton>
        </div>
      </FilterButtons>
      <DrawerButtons>
        <CustomFilledButton
          onClick={() => {
            handleFilters();
            toggleFiltersDraw(false);
          }}
          title={"Apply Filters"}
          style={{ margin: "15px 0px 0px 0px", width: "100%" }}
        ></CustomFilledButton>
        <CustomFilledButton
          onClick={clearFilters}
          title={"Clear Filters"}
          style={{ margin: "15px 0px 0px 0px", width: "100%" }}
        ></CustomFilledButton>
      </DrawerButtons>
      {/* <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <CustomFilledButton
          onClick={toggleFiltersDraw(false)}
          title={"Close Filter Draw"}
          style={{ margin: "10px 0px 0px 0px" }}
        ></CustomFilledButton>
      </div> */}
      {/* <FormGroup style={{ marginLeft: 10 }}>
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
      </FormGroup> */}
    </>
  );
};

export default FilterAccordions;

const FilterText = styled.div`
  font-size: 1.2rem;
  margin-bottom: 8px;
  cursor: pointer;
  text-decoration: none !important;
  font-size: 1.2rem !important;
  :hover {
    color: ${colors.textGreen} !important;
  }
  :active {
    color: ${colors.textGreen} !important;
    font-weight: 300;
  }
  a: {
    text-decoration: none !important;
  }
`;

const NumberField = styled.div`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const DrawerButtons = styled.div`
  display: none;

  ${mobile({
    display: "flex",
    flexDirection: "column",
  })}
`;

const FilterButtons = styled.div`
  ${mobile({
    display: "none",
  })}
`;
