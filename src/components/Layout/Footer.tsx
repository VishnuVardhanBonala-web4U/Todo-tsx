import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            All Rights are Reserved &copy; 2024
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Footer;
