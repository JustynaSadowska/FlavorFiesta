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
  Avatar,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useAccount } from '../../lib/hooks/useAccount';
import { Link } from 'react-router';
import { Add, Logout, Password } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {isCreator } from '../../lib/util/permissions';

export default function UserMenu() {
  const { currentUser, logoutUser } = useAccount();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const auth = {user: currentUser}

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  if (!currentUser) return null;

  return (
    
      <><Tooltip title="Open settings">
      <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
        <Avatar
          alt={`${currentUser.firstName} ${currentUser.lastName}`}
          src={currentUser.imageUrl || undefined}
        >
          {!currentUser.imageUrl && <PersonIcon />}
        </Avatar>        </IconButton>
    </Tooltip><Menu
      sx={{ mt: '45px' }}
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}

    >
        {isCreator(auth) && [
          <MenuItem component={Link} to="/createRecipe" onClick={handleCloseMenu} key="create">
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <ListItemText>Create Recipe</ListItemText>
          </MenuItem>,

          <Divider key="divider1" />,

          <MenuItem component={Link} to={`/profiles/${currentUser.id}`} onClick={handleCloseMenu} key="profile">
            <ListItemIcon>
              <Avatar
                alt={`${currentUser.firstName} ${currentUser.lastName}`}
                src={currentUser.imageUrl || undefined}
                sx={{ width: 24, height: 24 }}
              >
                {!currentUser.imageUrl && <PersonIcon fontSize="small" />}
              </Avatar>
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </MenuItem>,

          <MenuItem component={Link} to={`/profiles/${currentUser.id}?tab=recipes`} onClick={handleCloseMenu} key="recipes" sx={{ pl: 6 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <RestaurantIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="My Recipes" />
          </MenuItem>,

          <MenuItem component={Link} to={`/profiles/${currentUser.id}?tab=favorites`} onClick={handleCloseMenu} key="favorites" sx={{ pl: 6 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <FavoriteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Favorites" />
          </MenuItem>,

          <MenuItem component={Link} to={`/profiles/${currentUser.id}?tab=shoppinglists`} onClick={handleCloseMenu} key="shoppinglists" sx={{ pl: 6 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <ShoppingCartIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Shopping Lists" />
          </MenuItem>,

          <Divider key="divider2" />,
        ]}
        <MenuItem component={Link} to={`/change-password`} onClick={handleCloseMenu}>
          <ListItemIcon>
            <Password />
          </ListItemIcon>
          <ListItemText primary="Change Password" />
        </MenuItem>

        <MenuItem
          onClick={() => {
            logoutUser.mutate();
            handleCloseMenu();
          } }
        >
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu></>
    
  );
}
