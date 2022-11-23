import { useState, useEffect } from "react";
import axios from "axios";
import { Box, CircularProgress } from "@mui/material";
import colors from "../../utils/colors";
import Lottie from "react-lottie";
import { tick } from "../../assets";

export default function GigLoading({ Gig }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await axios.post(
        "http://localhost:3003/api/product/createProduct",
        Gig
      );
      console.log("Response", response.data);
      setLoading(false);
    })();
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
