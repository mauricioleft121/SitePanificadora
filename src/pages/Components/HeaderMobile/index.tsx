import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Link } from 'react-router-dom';

import logoImg from '../../../assets/logo.svg';

import { HeaderStyle, DrawerStyle, Title } from './styles';

const Header: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = (): void => {
    setOpen(true);
  };

  const handleDrawerClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <HeaderStyle>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={handleDrawerOpen} color="inherit">
              <MenuIcon />
            </IconButton>
            <Title>Panificadora Ubaense</Title>
            <img src={logoImg} alt="Panificadora Ubaense" />
          </Toolbar>
        </AppBar>
      </HeaderStyle>

      <div>
        <Drawer variant="temporary" anchor="left" open={open}>
          <DrawerStyle>
            <ListItem button onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </ListItem>
            <List>
              <Link to="/">
                <ListItem button onClick={handleDrawerClose}>
                  <ListItemText primary="Inicio" />
                </ListItem>
              </Link>
              <Link to="galeria">
                <ListItem button onClick={handleDrawerClose}>
                  <ListItemText primary="Galeria" />
                </ListItem>
              </Link>
              <Link to="contato">
                <ListItem button onClick={handleDrawerClose}>
                  <ListItemText primary="Contato" />
                </ListItem>
              </Link>
              <Link to="carrinho" onClick={handleDrawerClose}>
                <ListItem button>
                  <ListItemText primary="Meu Carrinho" />
                </ListItem>
              </Link>
            </List>
          </DrawerStyle>
        </Drawer>
      </div>
    </>
  );
};

export default Header;
