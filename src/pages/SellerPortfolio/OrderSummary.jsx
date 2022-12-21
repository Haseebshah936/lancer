import {
  AddCircleOutlineOutlined,
  RemoveCircleOutlineOutlined,
  StarBorder,
  ExpandMore,
  ExpandLess,
  AccessTime,
  AccessTimeOutlined,
  Check,
  Inventory,
  Inventory2Outlined,
  Square,
  Add,
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
  total,
  gigQuantity,
  IncGigQuantity = () => {},
  DecGigQuantity = () => {},
  features,
  plan,
  delivery,
  checkArr,
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
          <Heading>${total}</Heading>
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
              <Inventory2Outlined
                sx={{
                  fontSize: "2.0rem",
                  cursor: "pointer",
                }}
              />
            </ListItemIcon>
            {gigQuantity > 1 ? (
              <CustomListText
                primary={`${plan} (X${gigQuantity}) `}
                disableTypography={true}
              />
            ) : (
              <CustomListText primary={plan} disableTypography={true} />
            )}{" "}
            {open ? <ExpandLess /> : <ExpandMore />}
          </CustomListItem>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <CustomList sx={{ paddingTop: 0 }}>
              {features?.map((feature) => {
                return (
                  <CustomListItem sx={{ padding: 0, pl: 4 }}>
                    <CustomListText
                      primary={feature.title}
                      disableTypography={true}
                    />
                  </CustomListItem>
                );
              })}

              {checkArr?.map((feature) => {
                if (feature.checked) {
                  return (
                    <CustomListItem sx={{ padding: 0, pl: 4 }}>
                      <ListItemIcon>
                        <Add
                          sx={{
                            fontSize: "2.0rem",
                            cursor: "pointer",
                          }}
                        />
                      </ListItemIcon>

                      {feature.quantity > 1 ? (
                        <CustomListText
                          primary={`${feature.title} (X${feature.quantity})`}
                          disableTypography={true}
                        />
                      ) : (
                        <CustomListText
                          primary={feature.title}
                          disableTypography={true}
                        />
                      )}
                    </CustomListItem>
                  );
                }
              })}
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
              primary={`${delivery}-day delivery`}
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
