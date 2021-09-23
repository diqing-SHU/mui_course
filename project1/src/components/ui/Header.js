import React, { useEffect, useMemo, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { IconButton, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


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
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
      height: "2em"
    },
    [theme.breakpoints.down("xs")]: {
      height: "1.25em"
    }
  },
  logo: {
    height: "8em",
    [theme.breakpoints.down("md")]: {
      height: "7em"
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em"
    }
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
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: 'white',
    borderRadius: 0
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1
    }
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  drawerIcon: {
    height: 50,
    width: 50,
    color: 'white'
  },
  drawer: {
    backgroundColor: theme.palette.common.blue,
  },
  drawerItem: {
    ...theme.typography.tab,
    opacity: 0.7,
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange
  },
  drawerItemSelected: {
    "& .MuiListItemText-root": {
      opacity: 1.0,
    }
  },
  appBar: {
    zIndex: theme.zIndex.modal + 1
  }
}));

export default function Header(props){
  const classes = useStyles()
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"))
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const menuOptions = useMemo(() => [
    {name: "Services", link: "/services", activeIndex: 1, setSelectedIndex: 0},
    {name: "Custom Software Development", link: "/customsoftware", activeIndex: 1, setSelectedIndex: 1},
    {name: "Mobile App Development", link: "/mobileapps", activeIndex: 1, setSelectedIndex: 2},
    {name: "Website Development", link: "/websites", activeIndex: 1, setSelectedIndex: 3},
  ], []);
  const routes = useMemo(() => [
    {name: "Home", link: "/", activeIndex: 0},
    {name: "Services", link: "/services", activeIndex: 1,
    onMouseOver: e => handleClick(e),
    "aria-owns":anchorEl ? "simple-menu" : undefined,
    "aria-haspopup":anchorEl ? "true" : undefined
  },
    {name: "The Revolution", link: "/revolution", activeIndex: 2},
    {name: "About Us", link: "/about", activeIndex: 3},
    {name: "Contact Us", link: "/contact", activeIndex: 4},
  ], [anchorEl]);
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const handleMenuClick = (event, i) => {
    setAnchorEl(null);
    setSelectedIndex(i);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  }; 
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    [...menuOptions, routes].forEach(route => {
      if (window.location.pathname === route){
        if (value !== route.activeIndex) {
          setValue(route.activeIndex)
          if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
            setSelectedIndex(route.selectedIndex)
          }
        }
      }
    })
  }, [menuOptions, selectedIndex, routes, value])

  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{paper: classes.drawer}}
      >
        <div className={classes.toolbarMargin} />
        <List component="nav" aria-label="main mailbox folders">
          
          {routes.map(
            (route) => 
            <ListItem
              key={`${route}${route.activeIndex}`}
              onClick={() => {setOpenDrawer(false);setValue(route.activeIndex);}}
              divider
              button
              component={Link}
              to={route.link}
              classes={{selected: classes.drawerItemSelected}}
              selected={value === route.activeIndex}
            >
              <ListItemText
                disableTypography
                className={classes.drawerItem}
              >
              {route.name}
              </ListItemText>
            </ListItem>
          )}
          <ListItem 
            onClick={() => {setOpenDrawer(false);setValue(5);}}
            divider
            button
            component={Link}
            to="/estimate"
            classes={{root: classes.drawerItemEstimate, selected: classes.drawerItemSelected}}
            selected={value === 5}
          >
            <ListItemText
              disableTypography
              className={classes.drawerItem}
            >
            Free Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  )

  const tabs = (
    <>
      <Tabs value={value} onChange={handleChange} className={classes.tabContainer} indicatorColor="primary">
        {routes.map(
          (route, index) => 
          <Tab
            key={`${route}${index}`}
            className={classes.tab}
            label={route.name}
            component={Link}
            to={route.link}
            onMouseOver={route.onMouseOver}
            aria-owns={route["aria-owns"]}
            aria-haspopup={route["aria-haspopup"]}
          />
        )}
      </Tabs>
      <Button variant="contained" color="secondary" className={classes.button}>Free Estimate</Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{onMouseLeave: handleClose}}
        classes={{paper: classes.menu}}
        elevation={0}
        keepMounted
        style={{ zIndex: 1302 }}
      >
        {menuOptions.map((option, i) => (
          <MenuItem
            key={`${option}${i}`}
            classes={{root: classes.menuItem}}
            onClick={(event) => {handleMenuClick(event, i);setValue(1);handleClose()}}
            onClose={() => handleClose}
            selected={i === selectedIndex && value === 1}
            component={Link}
            to={option.link}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  )

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar disableGutters>
            <Button component={Link} to="/" className={classes.logoContainer} disableRipple>
              <img alt="logo" className={classes.logo} src={logo} />
            </Button>
            {matches?drawer:tabs}
            
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  )
}