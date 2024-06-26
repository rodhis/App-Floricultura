/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, MenuItem, Button } from "@mui/material";

import Nav from "../UI/Nav/Nav";
import LogoutModal from "../LogoutModal/LogoutModal";
import styles from "./Header.module.css";

import logo from "../../assets/HeaderImg/logo.svg";
import profile from "../../assets/HeaderImg/profileLogo.svg";

import "./GlobalMenu.css";

const Header = () => {
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [showDialog, setShowDialog] = useState(false);

  const currentLoginStorage = localStorage.getItem("isLogado");

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleHome = () => {
    navigate("/");
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  const handleLog = () => {
    setShowDialog((prevState) => !prevState);
  };

  useEffect(() => {
    const handleWindowsResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowsResize);

    return () => {
      window.removeEventListener("resize", handleWindowsResize);
    };
  }, []);

  let mobileBreakPoint = false;
  if (windowSize <= 768) {
    mobileBreakPoint = true;
  }

  return (
    <div className={styles.container}>
      <header className={styles.headerContainer}>
        <button onClick={handleHome}>
          <figure>
            <img src={logo} alt="Logo do site" />
          </figure>
        </button>

        <nav className={styles.desktopNav}>
          <ul className={styles.navBar}>
            <li>
              <Nav to={"/"}>Home</Nav>
            </li>

            <li>
              <Nav to={"/register"}>Register</Nav>
            </li>
            <li>
              <Nav to={"/products"}>Products</Nav>
            </li>
            {currentLoginStorage === "false" && (
              <li>
                <Nav to={"/sign-up"}>Sign-up</Nav>
              </li>
            )}
            <li>
              <Nav to={"/about-us"}>About us</Nav>
            </li>
          </ul>
        </nav>
        {mobileBreakPoint && (
          <div>
            <Button onClick={handleClick} className={styles.dropButton}>
              Menu
            </Button>
            <Menu
              className={styles.menuContainer}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem className={styles.dropItem} onClick={handleClose}>
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    isActive ? styles.active : styles.navLink
                  }
                  end
                >
                  Home
                </NavLink>
                <NavLink
                  to={"/register"}
                  className={({ isActive }) =>
                    isActive ? styles.active : styles.navLink
                  }
                >
                  Register
                </NavLink>
                <NavLink
                  to={"/products"}
                  className={({ isActive }) =>
                    isActive ? styles.active : styles.navLink
                  }
                >
                  Products
                </NavLink>
                <NavLink
                  to={"/about-us"}
                  className={({ isActive }) =>
                    isActive ? styles.active : styles.navLink
                  }
                >
                  About us
                </NavLink>
              </MenuItem>
            </Menu>
          </div>
        )}

        <button onClick={handleLog}>
          <figure>
            <img src={profile} alt="" style={{ width: "50px" }} />
          </figure>
        </button>
      </header>

      <LogoutModal isOpen={showDialog} onClose={closeDialog} />
    </div>
  );
};

export default Header;
