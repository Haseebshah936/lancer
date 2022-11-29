import { useState, useEffect } from "react";
import axios from "axios";
import { Box, CircularProgress } from "@mui/material";
import colors from "../../utils/colors";
import Lottie from "react-lottie";
import { tick } from "../../assets";
import { handleError } from "../../utils/helperFunctions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCustomContext } from "../../Hooks/useCustomContext";

export default function GigLoading({ gig }) {
  const [loading, setLoading] = useState(true);
  const { editGigStatus, gigToBeEditedData, setEditGigStatus } =
    useCustomContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (gig && !editGigStatus) {
      (async () => {
        try {
          const response = await axios.post(
            "http://localhost:3003/api/product/createProduct",
            gig
          );
          gig = {};
          console.log("Response", response.data);
          setEditGigStatus(false);
          toast.success("Product Created Successfully");
          setLoading(false);
          navigate(-1);
        } catch (error) {
          handleError(error);
        }
      })();
    } else if (gig && editGigStatus) {
      (async () => {
        try {
          const response = await axios.put(
            `http://localhost:3003/api/product/updateProduct/${gigToBeEditedData._id}`,
            gig
          );
          gig = {};
          console.log("Response", response.data);
          setEditGigStatus(false);
          toast.success("Product Updated Successfully");
          setLoading(false);
          navigate(-1);
        } catch (error) {
          handleError(error);
        }
      })();
    }
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: tick,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "400px",
          width: "100%",
        }}
      >
        {loading ? (
          <CircularProgress sx={{ color: colors.textGreen }} size={100} />
        ) : (
          <Lottie options={defaultOptions} height={300} width={300} />
        )}
      </Box>
    </>
  );
}
