import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import * as styled2 from "styled-components";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";
import colors from "../../utils/colors";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { borderBottom } from "@mui/system";
import { mobile } from "../../responsive";
import { Avatar } from "@mui/material";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

const Suggest = [
  { title: "Web Dev" },
  { title: "App Dev" },
  { title: "App Dev" },
  { title: "App Dev" },
  { title: "App Dev" },
  { title: "App Dev" },
  { title: "UI/UX Dev" },
  { title: "SEO" },
];

const Header = ({
  img = "https://res.cloudinary.com/dj46ttbl8/image/upload/v1655322066/lancer/WhatsApp_Image_2021-05-11_at_10.42.43_PM-removebg-preview_1_pptrzr.jpg",
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    console.log(result);
  };

  const handleOnSelect = (item) => {
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          {item.title}
        </span>
      </>
    );
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailOutlineIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsOutlinedIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          avatar={<Avatar aria-label="recipe" src={img}></Avatar>}
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, marginBottom: "5rem" }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: colors.white,
          paddingInline: "5%",
          boxShadow: "0",
          // borderBottom: `1px solid ${colors.textGreen}`,
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{
              mr: 2,
              color: colors.textGreen,
              display: "none",
              "@media (max-width: 786px)": {
                display: "flex",
              },
            }}
          >
            <MenuIcon sx={{ fontSize: "2.5rem" }} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: {
                xs: "none",
                sm: "block",
                color: colors.textGreen,
              },
            }}
          >
            <Link to="/">
              {" "}
              <img src={logo} style={{ width: "6rem", height: "2.5rem" }} />
            </Link>
          </Typography>

          <SearchBoxContainer
            style={{ marginLeft: "30px", width: "55ch", zIndex: "5" }}
          >
            <ReactSearchAutocomplete
              fuseOptions={{ keys: ["title"] }}
              placeholder="What Services do you want?"
              resultStringKeyName="title"
              items={Suggest}
              styling={{ height: "40px", fontSize: "1.5rem" }}
              onSearch={handleOnSearch}
              onHover={handleOnHover}
              onSelect={handleOnSelect}
              onFocus={handleOnFocus}
              autoFocus
              formatResult={formatResult}
            />
          </SearchBoxContainer>

          <Box sx={{ flexGrow: 1 }} />

          <NavLinkContainer>
            <NavLink to="/home">Your&nbsp;Orders</NavLink>
            <NavLink to="/about">Seller&nbsp;Mode</NavLink>
          </NavLinkContainer>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              sx={{ color: colors.textGreen }}
            >
              <Badge variant="dot" color="error">
                <MailOutlineIcon sx={{ fontSize: "2.5rem" }} />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              sx={{ color: colors.textGreen }}
            >
              <Badge variant="dot" color="error">
                <NotificationsOutlinedIcon sx={{ fontSize: "2.5rem" }} />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{ color: colors.textGreen }}
            >
              <Avatar aria-label="avatar" src={img}></Avatar>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};
export default Header;

const NavLinkContainer = styled2.default.div`
width:20%;
display:flex;

${mobile({ display: "none" })};
a:hover{color:${colors.textGreen} !important};
a{text-decoration: none !important;
  font-size: 1.5rem !important;
  margin-right: 2.5rem !important};


`;

const SearchBoxContainer = styled2.default.div`
`;
