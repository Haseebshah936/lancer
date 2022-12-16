import { toast } from "react-toastify";

export const handleAuthError = (error) => {
  console.log(error);
  if (error?.response?.status != 500 && error.code !== "ERR_NETWORK") {
    toast.error(error?.response?.data);
  } else if (error.code == "ERR_NETWORK") {
    toast.error(error.message);
  } else {
    console.log(error);
    toast.error("Internal server issue");
  }
};

export const handleRealmError = (error) => {
  const { message } = error;
  const msg = message.split(":");
  // console.log(msg[msg.length - 1]);
  toast.error(msg[msg.length - 1].split("(")[0]);
};

export const handleError = (error) => {
  if (error?.response?.status != 500 && error.code !== "ERR_NETWORK") {
    toast.error(error?.response?.data);
  } else if (error.code == "ERR_NETWORK") {
    toast.error(error.message);
  } else {
    toast.error("Internal server issue");
  }
};
