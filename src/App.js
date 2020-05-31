import React from 'react';
import Routes from "./Routes";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import labels from './resources/textlabel.json';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = () => {
  const classes = useStyles();
  return (
    labels.map((label, i) =>
      <div key = {i} className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {label.app.name}
            </Typography>
            <div>
              <Button href="/signup" color="inherit">
                {label.common.signup}
              </Button>
              <Button href="/login" color="inherit">
                {label.common.login}
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    ));
}

export default function ButtonAppBar() {
  return (
    <div>
      <NavBar />
      <Routes />
    </div>
  );
}
