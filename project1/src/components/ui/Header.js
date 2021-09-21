import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

import logo from '../../assets/logo.svg'

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles(theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "4em"
  },
  logo: {
    height: "8em"
  },
  tabContainer: {
    margin: "auto"
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: 25
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: 50,
    marginLeft: 50,
    marginRight: 25,
    height: 45
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent"
    }
  }
}));

export default function Header(props){
  const classes = useStyles()
  const [value, setValue] = useState(0);
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const tabMap = ['/','/services', "/revolution", "/about", "/contact"]
    if (window.location.pathname !== tabMap[value]) {
      for (let i = 0; i < tabMap.length; i++) {
        if (window.location.pathname === tabMap[i]) {
          setValue(i)
          break
        }
      }
    }
  }, [value])
  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar disableGutters>
            <Button component={Link} to="/" className={classes.logoContainer} disableRipple>
              <img alt="logo" className={classes.logo} src={logo} />
            </Button>
            <Tabs value={value} onChange={handleChange} className={classes.tabContainer} indicatorColor="primary">
              <Tab className={classes.tab} label="Home" component={Link} to="/" />
              <Tab className={classes.tab} label="Services" component={Link} to="/services" />
              <Tab className={classes.tab} label="The Revolution" component={Link} to="/revolution" />
              <Tab className={classes.tab} label="About Us" component={Link} to="/about" />
              <Tab className={classes.tab} label="Contact Us" component={Link} to="/contact" />
            </Tabs>
            <Button variant="contained" color="secondary" className={classes.button}>Free Estimate</Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  )
}