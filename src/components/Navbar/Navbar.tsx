import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { NavLink } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";

const navItems = [
  { label: "Profile", to: "/profile", icon: <PersonIcon /> },
  { label: "Messages", to: "/dialogs", icon: <ForumOutlinedIcon /> },
  { label: "Find users", to: "/users", icon: <GroupOutlinedIcon /> },
];

type PropsType = {
  variant?: string;
  open?: boolean;
  onClose?: () => void;
};
const Navbar: React.FC<PropsType> = ({
  variant = "permanent",
  open = true,
  onClose,
}) => {

  const drawerContent = (
    <List>
      {navItems.map((item) => (
        <ListItemButton
          key={item.label}
          component={NavLink}
          to={item.to}
          onClick={onClose}
          sx={{
            borderRadius: 1,
            mb: 1,
            px: 2,
            color: "text.primary",
            "&.active": {
              bgcolor: "action.hover",
            },
            "&:hover": {
              bgcolor: "action.hover",
            },
            "& .MuiSvgIcon-root": {
              color: "primary.main",
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemButton>
      ))}
    </List>
  );

  return variant === "temporary" ? (
    <Drawer open={open} onClose={onClose}>
      {drawerContent}
    </Drawer>
  ) : (
    <Box
      boxShadow={2}
      borderRadius={1}
      sx={{
        width: "100%",
        height: "100%",
        p: 2,
        display: { xs: "none", md: "block" },
      }}
    >
      <Box component="nav">{drawerContent}</Box>
    </Box>
  );
};

export default Navbar;
