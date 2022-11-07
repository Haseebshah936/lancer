import { toast } from "react-toastify";

export const handleAuthError = (error) => {
  console.log(error);
  if (error.status != 500) {
    toast.error(error.data);
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
