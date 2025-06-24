import { Box, Container } from "@mui/material";
import HeaderWrapper from "./components/Header/HeaderWrapper";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        bgcolor: "background.default",
        py: 2
      }}
    >
      <Box
        sx={{
          display: "grid",
          width: "100%",
          maxWidth: "1200px",
          gridTemplateAreas: `
            "header header"
            "nav main"`,
          gridTemplateColumns: { xs: "1fr", md: "250px 1fr" },
          gridTemplateRows: "64px 1fr",
          gap: 2,
          minHeight: "100vh",
        }}
      >
        <Box gridArea="header">
          <HeaderWrapper />
        </Box>
        <Box
          gridArea="nav"
        >
            <Navbar />
        </Box>
        <Box
          gridArea="main"
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            minHeight: "100vh",
          }}
        >
          <Container maxWidth="lg" disableGutters sx={{ flexGrow: 1 }}>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
