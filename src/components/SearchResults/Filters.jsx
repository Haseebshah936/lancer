import * as React from "react";
import colors from "../../utils/colors";
import { Box, Typography } from "@mui/material";
import * as styled2 from "styled-components";
import { miniPc, mobile, tablet } from "../../responsive";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import FilterAccordions from "./FilterAccordions";

const modalstyle = {
  textAlign: "center",
  color: colors.textGreen,
  borderRadius: "15px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: `2px solid ${colors.textGreen}`,
  boxShadow: 24,
  p: 4,
};

const Filters = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    console.log(open);
  };
  const handleClose = () => setOpen(false);
  return (
    <Container>
      <FilterButton>
        <Button
          onclick={handleOpen}
          variant="outlined"
          startIcon={<FilterAltOutlinedIcon />}
          sx={{
            color: colors.textGreen,
            borderColor: colors.textGreen,
          }}
        >
          Filters
        </Button>
      </FilterButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalstyle}>
          {/* <FilterAccordions /> */}
          <p>adssa</p>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Added to List
          </Typography>
        </Box>
      </Modal>
      <Accordions>
        <FilterAccordions />
      </Accordions>
    </Container>
  );
};

export default Filters;

const Container = styled2.default.div`
  margin-right: 30%;
  ${miniPc({ marginRight: "20%" })}
  ${tablet({ marginRight: "0px" })}
`;

const Accordions = styled2.default.div`
${mobile({ display: "none" })}
`;

const FilterButton = styled2.default.div`
display: none;
${mobile({ display: "flex" })}
`;
