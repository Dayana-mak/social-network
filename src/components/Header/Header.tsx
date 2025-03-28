import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import LogoutIcon from "@mui/icons-material/Logout";
import defaultAvatar from "../../assets/images/default-avatar.svg";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Navbar from "../Navbar/Navbar";

type PropsType = {
  logout: () => void;
  isAuth: boolean;
  login: string | null;
  profileAvatar: string | null | undefined;
};
const Header: React.FC<PropsType> = ({
  logout,
  isAuth,
  login,
  profileAvatar,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };
  return (
    <AppBar position="static" elevation={0} sx={{ borderRadius: "12px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setDrawerOpen(true)}
          sx={{ display: { md: "none" }, mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Diversity2Icon fontSize="large" />
          <Typography variant="h6" noWrap>
            It-net
          </Typography>
        </Box>
        <Box>
          {isAuth ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar
                alt="user-avatar"
                sx={{ width: 34, height: 34 }}
                src={profileAvatar ? profileAvatar : defaultAvatar}
              />
              <Typography>{login}</Typography>
              <IconButton
                aria-label="logout"
                color="inherit"
                onClick={handleLogout}
              >
                <LogoutIcon />
              </IconButton>
            </Box>
          ) : (
            <Button
              variant="outlined"
              color="inherit"
              component={NavLink}
              to={"/login"}
            >
              Login
            </Button>
          )}
        </Box>
          <Navbar
            variant="temporary"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
