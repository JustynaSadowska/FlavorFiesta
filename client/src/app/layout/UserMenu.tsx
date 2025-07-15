import * as React from 'react';
import { useState } from 'react';
import { Menu, MenuItem, IconButton, Tooltip, Typography, ListItemIcon, ListItemText } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useAccount } from '../../lib/hooks/useAccount';
import { Link } from 'react-router';
import { Add, Logout } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function UserMenu() {
  const {currentUser, logoutUser } = useAccount();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  if (!currentUser) return null; 
  return (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
          <PersonIcon />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {/* <MenuItem component={Link} to="/account" onClick={handleCloseMenu}>
          <Typography textAlign="center">Account</Typography>
        </MenuItem> */}
        <MenuItem component={Link} to='/profiles/${id}' onClick={handleCloseMenu}>
            <ListItemIcon>
                <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText>My profile</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to='/createRecipe' onClick={handleCloseMenu}>
                    <ListItemIcon>
                        <Add />
                    </ListItemIcon>
                    <ListItemText>Create Recipe</ListItemText>
                </MenuItem>
        <MenuItem component={Link} to="/counter" onClick={handleCloseMenu}>
          <Typography textAlign="center">Counter</Typography>
        </MenuItem>
        <MenuItem component={Link} to="/errors" onClick={handleCloseMenu}>
          <Typography textAlign="center">Errors</Typography>
        </MenuItem>
        {/* <MenuItem component={Link} to="/shoppinglists" onClick={handleCloseMenu}>
          <Typography textAlign="center">Shopping Lists</Typography>
        </MenuItem> */}
        <MenuItem onClick={() => {
                    logoutUser.mutate();
                    handleCloseMenu();
                }}>
                    <ListItemIcon>
                        <Logout />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </MenuItem>
      </Menu>
    </>
  );
}
