import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
//import PersonIcon from '@mui/icons-material/Person';
//import Tooltip from '@mui/material/Tooltip';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuItem from '@mui/material/MenuItem';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { Link, NavLink } from 'react-router';
import MenuItemLink from '../shared/components/MenuItemLink';
import { useStore } from '../../lib/hooks/useStore';
import { Observer } from 'mobx-react-lite';
import { LinearProgress } from '@mui/material';
import { useAccount } from '../../lib/hooks/useAccount';
import UserMenu from './UserMenu';
import { useState } from 'react';
const pages = ['Recipes', 'Profiles'];

export default function NavBar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElAccount, setAnchorElAccount] = useState<null | HTMLElement>(null);
  const {uiStore} = useStore();
  const {currentUser} = useAccount();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenAccountMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAccount(event.currentTarget);
  };

  const handleCloseAccountMenu = () => {
    setAnchorElAccount(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <RestaurantMenuIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
              variant="h4"
              noWrap
              component= {NavLink} to = '/'
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Lora',
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
            FlavorFiesta
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem component ={Link} to={`/${page.toLowerCase()}`} key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <RestaurantMenuIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h4"
              noWrap
              component= {Link} to = '/'
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'Lora',
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
            FlavorFiesta
            </Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <MenuItemLink  to={`/${page.toLowerCase()}`}
                key={page}
              >
                {page}
              </MenuItemLink>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {currentUser ? (
              <UserMenu />
            ) : (
             <><Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
                 <MenuItemLink to="/login">Login</MenuItemLink>
                 <MenuItemLink to="/register">Register</MenuItemLink>
               </Box>
               <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                   <IconButton
                     size="large"
                     aria-label="account menu"
                     aria-controls="menu-account"
                     aria-haspopup="true"
                     onClick={handleOpenAccountMenu}
                     color="inherit"
                   >
                     <ArrowDropDownIcon />
                   </IconButton>
                   <Menu
                     id="menu-account"
                     anchorEl={anchorElAccount}
                     open={Boolean(anchorElAccount)}
                     onClose={handleCloseAccountMenu}
                     anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                     transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                     sx={{ display: { xs: 'block', md: 'none' } }}
                   >
                     <MenuItem component={Link} to="/login" onClick={handleCloseAccountMenu}>
                       Login
                     </MenuItem>
                     <MenuItem component={Link} to="/register" onClick={handleCloseAccountMenu}>
                       Register
                     </MenuItem>
                   </Menu>
                 </Box></>
              
            )}
          </Box>
        </Toolbar>
      </Container>

      <Observer>
        {() => uiStore.isLoading ? (
            <LinearProgress 
              color = "inherit"
              sx ={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 2
              }}/>
        ): null}
      </Observer>
    </AppBar>
  );
}
