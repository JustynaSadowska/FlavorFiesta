import * as React from 'react';
import { useState } from 'react';
import {
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useAccount } from '../../lib/hooks/useAccount';
import { Link } from 'react-router';
import { Add, Logout } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function UserMenu() {
  const { currentUser, logoutUser } = useAccount();
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
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem component={Link} to="/createRecipe" onClick={handleCloseMenu}>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText>Create Recipe</ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem
          component={Link}
          to={`/profiles/${currentUser.id}`}
          onClick={handleCloseMenu}
        >
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </MenuItem>

        <MenuItem
          component={Link}
          to={`/profiles/${currentUser.id}?tab=recipes`}
          onClick={handleCloseMenu}
          sx={{ pl: 6 }}
        >
          <ListItemIcon sx={{ minWidth: 32 }}>
            <RestaurantIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="My Recipes" />
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/profiles/${currentUser.id}?tab=favorites`}
          onClick={handleCloseMenu}
          sx={{ pl: 6 }}
        >
          <ListItemIcon sx={{ minWidth: 32 }}>
            <FavoriteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Favorites" />
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/profiles/${currentUser.id}?tab=shoppinglists`}
          onClick={handleCloseMenu}
          sx={{ pl: 6 }}
        >
          <ListItemIcon sx={{ minWidth: 32 }}>
            <ShoppingCartIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Shopping Lists" />
        </MenuItem>

        <Divider />

        <MenuItem
          onClick={() => {
            logoutUser.mutate();
            handleCloseMenu();
          }}
        >
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
