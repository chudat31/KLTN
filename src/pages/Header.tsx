import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box } from "@mui/material";

const Header = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            style={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}
          >
            QUICK TRANSALATION
          </Typography>
          {/* <Button color="inherit" component={Link} to="/">
            Trang chủ
          </Button>
          <Button color="inherit" component={Link} to="/introduction">
            Về chúng tôi
          </Button> */}
          {/* <Button color="inherit" component={Link} to="/search">
            Tìm kiếm sản phẩm
          </Button> */}
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", flexGrow: 1 }}
          >
            <Button color="inherit">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/login"
              >
                Login
              </Link>
            </Button>
            <Button color="inherit">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/register"
              >
                Register
              </Link>
            </Button>
            <Button color="inherit">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/user"
              >
                User Profile
              </Link>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
