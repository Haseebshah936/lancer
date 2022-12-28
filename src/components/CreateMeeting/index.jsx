import React, { useState } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import styled from "styled-components";
import {
  ClickAwayListener,
  createTheme,
  ThemeProvider,
} from "@material-ui/core";
import colors from "../../utils/colors";
import CustomFilledButton from "../CustomFilledButton";
import { Box } from "@mui/system";
import { toast } from "react-toastify";
import Joi from "joi";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import {
  LocalizationProvider,
  MobileDatePicker,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect } from "react";
import { timeFormat } from "../../utils/DateAndTime/TimeFormat";

const schema = Joi.object({
  date: Joi.string().required(),
  time: Joi.string().required(),
  description: Joi.string().max(50),
});

const theme = createTheme({
  components: {
    MuiMobileDateTimePicker: {
      styleOverrides: {
        root: {
          color: colors.textGreen,
          borderColor: colors.textGreen,
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        color: colors.textGreen,
      },
    },
  },
});

function CreateMeeting({
  toggleClose,
  onSubmit,
  loading,
  meetingDetails,
  setMeetingDetails,
}) {
  // const [meetingDetails, setMeetingDetails] = useState({
  //   date: dayjs(new Date()),
  //   time: "",
  //   description: "",
  // });

  const onChange = (e) => {
    const meeting = { ...meetingDetails };
    meeting[e.target.name] = e.target.value;
    setMeetingDetails(meeting);
  };

  useEffect(() => {
    console.log(meetingDetails);
  }, [meetingDetails]);

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Wrap>
          <ClickAwayListener onClickAway={toggleClose}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                const { error } = schema.validate(meetingDetails);
                if (error) {
                  const { details } = error;
                  details.map((e, i) => {
                    toast.error(e.message);
                  });
                }
                onSubmit(meetingDetails);
              }}
            >
              <MobileDateTimePicker
                label="Date&Time picker"
                value={dayjs(meetingDetails.date + meetingDetails.time)}
                onChange={(newValue) => {
                  setMeetingDetails({
                    ...meetingDetails,
                    date: newValue.format("YYYY/MM/DD"),
                    time: timeFormat(newValue.hour(), newValue.minute()),
                  });
                }}
                onError={toast.error}
                minDate={dayjs(new Date())}
                inputFormat="YYYY/MM/DD hh:mm a"
                mask="____/__/__ __:__ _M"
                renderInput={(params) => <TextField {...params} />}
                componentsProps={{
                  tabs: {
                    classes: {
                      root: {
                        ".Mui-selected": {
                          color: colors.textGreen,
                          backgroundColor: colors.textGreen,
                        },
                      },
                    },
                  },
                  actionBar: {
                    sx: {
                      "& .MuiButtonBase-root": {
                        color: colors.textGreen,
                      },
                    },
                  },
                }}
                DialogProps={{
                  PaperProps: {
                    sx: {
                      color: colors.textGreen,
                      borderColor: colors.textGreen,
                      "& .css-3eghsz-PrivatePickersYear-button.Mui-selected": {
                        backgroundColor: colors.textGreen,
                      },
                    },
                  },

                  sx: {
                    "& ..Mui-selected": {
                      backgroundColor: colors.textGreen,
                    },
                    "& .MuiPickersDay-dayWithMargin": {
                      color: colors.textGreen,
                      backgroundColor: "white",
                      ":hover": {
                        backgroundColor: colors.textGreen,
                        color: "white",
                      },
                      ":focus": {
                        backgroundColor: colors.textGreen,
                        color: "white",
                      },
                    },
                    "& .MuiTabs-root": {
                      color: colors.textGreen,
                    },
                    "& .MuiButtonBase-root": {
                      color: colors.textGreen,
                      fontSize: "1.2rem",
                    },
                    "& .css-h2z9v1-MuiButtonBase-root-MuiIconButton-root-MuiClock-amButton":
                      {
                        color: "white",
                        backgroundColor: colors.textGreen,
                      },
                    "& .css-rjqbug-MuiButtonBase-root-MuiIconButton-root-MuiClock-pmButton":
                      {
                        color: "white",
                        backgroundColor: colors.textGreen,
                      },
                    "& .css-rjqbug-MuiButtonBase-root-MuiIconButton-root-MuiClock-pmButton: hover":
                      {
                        color: "white",
                        backgroundColor: colors.textGreen,
                      },

                    "& .MuiTabs-indicator": {
                      backgroundColor: colors.textGreen,
                    },
                    "& .MuiTabs-scroller .MuiSvgIcon-root": {
                      width: "1.5em",
                      height: "1.5em",
                    },

                    "& .MuiClock-pin ": {
                      backgroundColor: colors.textGreen,
                    },
                    "& .MuiClockPointer-root": {
                      backgroundColor: colors.textGreen,
                      " .MuiClockPointer-thumb": {
                        backgroundColor: colors.textGreen,
                        borderColor: colors.textGreen,
                      },
                    },
                    "& .Mui-focused": {
                      color: colors.textGreen,
                    },
                    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: colors.textGreen,
                    },
                  },
                }}
              />
              <TextField
                type="text"
                name="description"
                className="box"
                label="Description"
                color="success"
                sx={{
                  mt: 2,
                }}
                value={meetingDetails.description}
                onChange={(text) => {
                  if (text.target.value.length > 50) {
                    toast.error(
                      "Meeting Detail cannot be more than 50 characters"
                    );
                  }
                  setMeetingDetails({
                    ...meetingDetails,
                    description: text.target.value.slice(0, 50),
                  });
                }}
                multiline
                rows={2}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                {!loading ? (
                  <CustomFilledButton
                    style={{
                      alignSelf: "center",
                      width: "15rem",
                    }}
                    type={"submit"}
                    title={"Create Meeting"}
                  />
                ) : (
                  <CircularProgress
                    style={{
                      color: colors.primaryGreen,
                      fontSize: ".5rem",
                      marginBlock: "2.5rem",
                    }}
                    size={20}
                  />
                )}
              </Box>
            </Form>
          </ClickAwayListener>
        </Wrap>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default CreateMeeting;

const Wrap = styled.div`
  min-height: 100vh !important;
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  label.MuiFormLabel-root {
    color: ${colors.textGreen};
  }
  .Mui-focused {
    color: ${colors.textGreen};
  }
  .Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${colors.textGreen} !important;
  }
`;

const Form = styled.form`
  margin: 2rem;
  padding: 4rem 3rem;
  border-radius: 0.5rem;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  width: 38rem;
  height: auto;
  display: flex;
  flex-direction: column;
`;
