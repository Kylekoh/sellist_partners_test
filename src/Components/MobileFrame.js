import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import MobileNav from "./MobileNav";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: "60px",
    background: "#3C66BA"
  },
  title: {
    flexGrow: 1
  }
}));

const MobileFrame = () => {
  const classes = useStyles();
  return (
    // <MobileNavContainer position="static">
    //   <Toolbar>
    //     <div className={classes.title}>
    //       <Logo />
    //     </div>
    //     <MobileNav />
    //   </Toolbar>
    // </MobileNavContainer>

    <AppBar className={classes.root} position="absolute">
      <Toolbar>
        <div className={classes.title}>
          <Logo />
        </div>
        <MobileNav />
      </Toolbar>
    </AppBar>
  );
};

export default MobileFrame;

const MobileNavContainer = styled.div`
  background-color: red;
  display: flex;
  flex-direction: row;
`;

const Logo = styled.div`
  background: url("/images/Logo.svg") center no-repeat;
  background-size: contain;
  width: 120px;
  height: 31px;
  min-height: 31px;
`;
