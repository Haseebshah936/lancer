import {
  AddCircleOutlineOutlined,
  RemoveCircleOutlineOutlined,
  StarBorder,
  ExpandMore,
  ExpandLess,
  AccessTime,
  AccessTimeOutlined,
} from "@mui/icons-material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import {
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import React, { useState } from "react";
import colors from "../../utils/colors";

export default function OrderSummary({
  gigQuantity,
  IncGigQuantity = () => {},
  DecGigQuantity = () => {},
  check,
}) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Paper
        variant="outlined"
        elevation={0}
        sx={{
          p: 3,
          borderRadius: "10px",
          backgroundColor: "#F5F5F5",
          display: "flex",
          flexDirection: "column",
          color: "#404145",
        }}
      >
        <Header>
          <Heading>$1200</Heading>
          <Order>
            Single Order{" "}
            {gigQuantity > 1 && (
              <Order sx={{ display: "inline" }}>(X{gigQuantity})</Order>
            )}{" "}
          </Order>
        </Header>
        <Divider
          sx={{
            my: 2,
            borderBottomWidth: "2px",
            "&.MuiDivider-root": {
              backgroundColor: "##DDDEDF",
            },
          }}
        />

        <CustomList sx={{ py: 0 }}>
          <CustomListItem sx={{ padding: 0 }} onClick={handleClick}>
            <ListItemIcon>
              <AccessTimeOutlined
                sx={{
                  fontSize: "2.0rem",
                  cursor: "pointer",
                }}
              />
            </ListItemIcon>
            {gigQuantity > 1 ? (
              <CustomListText
                primary={`Inbox (X${gigQuantity})`}
                disableTypography={true}
              />
            ) : (
              <CustomListText primary="Inbox" disableTypography={true} />
            )}{" "}
            {open ? <ExpandLess /> : <ExpandMore />}
          </CustomListItem>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <CustomList sx={{ paddingTop: 0 }}>
              <CustomListText
                sx={{ pl: 4 }}
                primary="Responsive Design"
                disableTypography={true}
              />
            </CustomList>
          </Collapse>
        </CustomList>

        <CustomList sx={{ py: 0 }}>
          <CustomListItem sx={{ padding: 0 }}>
            <ListItemIcon>
              <AccessTimeOutlined
                sx={{
                  fontSize: "2.0rem",
                  cursor: "pointer",
                }}
              />
            </ListItemIcon>
            <CustomListText
              primary="14-day-delivery"
              disableTypography={true}
            />
          </CustomListItem>

          <CustomListItem sx={{ padding: 0 }}>
            <ListItemIcon>
              <AccessTimeOutlined
                sx={{
                  fontSize: "2.0rem",
                  cursor: "pointer",
                }}
              />
            </ListItemIcon>
            <CustomListText
              primary="14-day-delivery"
              disableTypography={true}
            />
          </CustomListItem>
        </CustomList>

        <Divider
          sx={{
            my: 2,
            borderBottomWidth: "2px",
            "&.MuiDivider-root": {
              backgroundColor: "##DDDEDF",
            },
          }}
        />

        <Footer>
          <GigQuantity>Gig Quantity</GigQuantity>

          <IncrementContainer>
            <IconButton disableRipple onClick={IncGigQuantity}>
              <AddCircleOutlineOutlined
                sx={{
                  color: colors.textGreen,
                  "&.MuiSvgIcon-root": {
                    fontSize: "2.5rem",
                  },
                }}
              />
            </IconButton>
            <Quantity sx={{ pl: 0 }}>{gigQuantity}</Quantity>
            <IconButton disableRipple onClick={DecGigQuantity}>
              <RemoveCircleOutlineOutlined
                sx={{
                  color: colors.textGreen,
                  "&.MuiSvgIcon-root": {
                    fontSize: "2.5rem",
                  },
                }}
              />
            </IconButton>
          </IncrementContainer>
        </Footer>
      </Paper>
    </>
  );
}

const Header = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  justifyContent: "space-evenly",
});

const Heading = styled(Typography)({
  fontSize: "4.0rem",
  fontWeight: "600",
});

const Order = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: "500",
  color: colors.black,
});

const Body = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  justifyContent: "space-evenly",
});

const Footer = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "space-between",
  flex: 1,
});

const IncrementContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
  flex: "0.4",
});

const GigQuantity = styled(Typography)({
  fontSize: "1.8rem",
  fontWeight: "600",
});

const Quantity = styled(Typography)({
  paddingLeft: "5px",
  fontSize: "1.7rem",
  fontWeight: "500",
  color: colors.gray,
});

const CustomList = styled(List)({
  color: colors.black,
  fontSize: "1.6rem !important",
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: "10px",
  },
});

const CustomListText = styled(ListItemText)({
  fontSize: "1.5rem",
  fontWeight: "400",
  color: "#404145",
});

const CustomListItem = styled(ListItem)({
  marginBottom: "5px",
  color: "#404145",
});
