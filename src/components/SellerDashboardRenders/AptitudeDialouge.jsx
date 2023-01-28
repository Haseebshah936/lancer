import React, { useEffect, useState } from "react";
import Styled from "styled-components";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import colors from "../../utils/colors";
import DropDownInputComp from "./DropDownInputComp";
import { requestMethod } from "../../requestMethod";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Grid, TextField } from "@mui/material";
import axios from "axios";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { useRealmContext } from "../../db/RealmContext";
import { handleError } from "../../utils/helperFunctions";
import { useCustomContext } from "../../Hooks/useCustomContext";

export default function AptitudeDialouge({ setOpen, open }) {
  const { user } = useRealmContext();
  const [categoriesArr, setCategoriesArr] = useState([]);
  const [subCategoriesArr, setSubCategoriesArr] = useState([]);
  const [categoryValue, setCategoryValue] = useState("");
  const [subCategoryValue, setSubCategoryValue] = useState("");
  const [reasonVar, setReasonVar] = useState("");
  const { aptitudeOpen, setAptitudeOpen } = useCustomContext();

  const handleChangeCate = (event) => {
    setCategoryValue(event.target.value);
    console.log("categoryValue x", categoryValue);
  };
  const handleChangeSubCate = (event) => {
    setSubCategoryValue(event.target.value);
  };

  const handleClickOpen = () => {
    setAptitudeOpen(true);
  };

  const handleClose = () => {
    setAptitudeOpen(false);
    setCategoryValue("");
    setSubCategoryValue("");
    setReasonVar("");
  };

  useEffect(() => {
    requestMethod.get("category/categories").then((response) => {
      setCategoriesArr(response.data);
      console.log(categoriesArr);
    });
  }, []);

  useEffect(() => {
    console.log("categoryValue xx", categoryValue);
    requestMethod
      .get(`category/subCategories/` + categoryValue)
      .then((response) => {
        setSubCategoriesArr(response.data);
        console.log(response.data);
      });
  }, [categoryValue]);
  const [errors, setErrors] = useState({});
  const Schema = {
    categoryValue: Joi.string().required().label("Category"),
    subCategoryValue: Joi.string().required().label("Subcategory"),
    reasonVar: Joi.string().required().min(10).label("Reason"),
  };
  const validate = () => {
    const result = Joi.validate(
      { categoryValue, subCategoryValue, reasonVar },
      Schema,
      { abortEarly: false }
    );
    if (!result.error) {
      setErrors({});
      return null;
    }
    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    setErrors(errors);
    return errors;
  };

  return (
    <div>
      <Dialog
        open={aptitudeOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Apply for the aptitude test"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You can apply for the aptitide test only after 6 months so apply if
            you think you are are ready and select the category you want to
            apply. We wish you a good luck.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container>
            <Grid item xs={12} my={1}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={categoryValue}
                  label="Category"
                  onChange={handleChangeCate}
                >
                  {categoriesArr?.map((c) => (
                    <MenuItem value={c._id}>{c.title}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} my={1}>
              {categoryValue ? (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Subcategory
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={subCategoryValue}
                    label="Category"
                    onChange={handleChangeSubCate}
                  >
                    {subCategoriesArr?.map((c) => (
                      <MenuItem value={c._id}>{c.title}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : null}
            </Grid>
            <Grid items xs={12}>
              <GreenBorderTextField
                label="Reason"
                fullWidth
                multiline
                rows={4}
                value={reasonVar}
                onChange={(e) => {
                  setReasonVar(e.target.value);
                }}
              ></GreenBorderTextField>
            </Grid>
            <Grid item xs={12} display={"flex"} justifyContent={"center"}>
              <Button
                // onClick={handleClose}
                autoFocus
                sx={{
                  backgroundColor: colors.becomePartnerButtonGreen,
                  color: "white",
                  "&:hover": {
                    backgroundColor: colors.becomePartnerButtonGreen,
                    color: "white",
                  },
                }}
                onClick={() => {
                  const v = validate();
                  if (v) {
                    if (v.categoryValue) {
                      toast.error("Kindly Select Category");
                    }
                    if (v.subCategoryValue) {
                      toast.error("Kindly Select Sub Category");
                    }
                    if (v.reasonVar) {
                      toast.error(v.reasonVar);
                    }
                    console.log("error", v);
                  } else {
                    console.log({
                      creatorId: user._id,
                      categoryId: subCategoryValue,
                      disputeReason: reasonVar,
                    });
                    requestMethod
                      .post("customerSupport/aptitudeTest", {
                        creatorId: user._id,
                        categoryId: subCategoryValue,
                        disputeReason: reasonVar,
                      })
                      .then((response) => {
                        console.log(response);
                        if (response.data) {
                          toast.success("Applied Successfully");
                          handleClose();
                        }
                      })
                      .catch((err) => {
                        handleError(err);
                      });
                  }
                }}
              >
                Apply
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const GreenBorderTextField = Styled(TextField)`
    & label.Mui-focused {
      color: ${colors.becomePartnerGreen};
    }
    & .MuiOutlinedInput-root {
      &.Mui-focused fieldset {
        border-color: ${colors.becomePartnerGreen};
      }
    }
  `;
