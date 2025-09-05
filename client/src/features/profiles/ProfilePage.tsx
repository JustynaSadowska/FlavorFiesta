import { Box, Divider, Tab, Tabs, Typography, Fab, Zoom } from '@mui/material'
import RecipeList from '../recipes/dashboard/RecipeList'
import ProfileHeader from './ProfileHeader'
import { useParams, useSearchParams, useNavigate } from 'react-router';
import { useProfile } from '../../lib/hooks/useProfile';
import { useMemo, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingListDashboard from '../shoppinglists/dashboard/ShoppingListDashboard';
import AddIcon from '@mui/icons-material/Add';
import ShoppingListForm from '../shoppinglists/form/ShoppingListForm';

const tabMapping = ["recipes", "favorites", "shoppinglists"];

export default function ProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile, loadingProfile, isCurrentUser, userRecipes, favoriteRecipes, isLoading, isFavoriteLoading } = useProfile(id);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isShoppingListFormOpen, setShoppingListFormOpen] = useState(false);

  const currentTab = useMemo(() => {
    const tabParam = searchParams.get("tab");
    const idx = tabMapping.indexOf(tabParam ?? "");
    return idx !== -1 ? idx : 0;
  }, [searchParams]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSearchParams({ tab: tabMapping[newValue] });
  };

  if (loadingProfile) return <Typography>Loading profile...</Typography>
  if (!profile) return <Typography>Profile not found</Typography>

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <ProfileHeader/>
      <Box sx={{ mt: 4 }}>
        {isCurrentUser && (
          <>
            <Tabs value={currentTab} onChange={handleTabChange} centered>
              <Tab icon={<RestaurantIcon />} label="RECIPES" />
              <Tab icon={<FavoriteIcon />} label="FAVORITES" />
              <Tab icon={<ShoppingCartIcon />} label="SHOPPING LISTS" />
            </Tabs>
            <Divider sx={{ borderColor: 'grey.300', maxWidth: 1250, margin: "auto" }} />
          </>
        )}
      </Box>

      <Box sx={{ mt: 3 }}>
        {currentTab === 0 && (
          <RecipeList recipes={userRecipes} isLoading={isLoading} />
        )}
        {currentTab === 1 && (
          (!favoriteRecipes || favoriteRecipes.length === 0) ? (
            <Box sx={{ textAlign: "center", mt: 5, ml: -6 }}>
              <FavoriteIcon sx={{ fontSize: 64, mb: 1, color: "grey.500" }} />
              <Typography variant="subtitle1" fontStyle="italic" color="text.secondary">
                You don’t have any favorite recipes yet.
              </Typography>
            </Box>
          ) : (
            <RecipeList recipes={favoriteRecipes} isLoading={isFavoriteLoading} />
          )
        )}
        {currentTab === 2 && (
          <ShoppingListDashboard />
        )}
      </Box>

      {/* FAB tylko dla wybranych zakładek */}
      <Zoom in={currentTab === 0 || currentTab === 2}>
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: "fixed", bottom: 24, right: 24 }}
          onClick={() => {
            if (currentTab === 0) {
              navigate("/createRecipe");
            } else if (currentTab === 2) {
              setShoppingListFormOpen(true);
            }
          }}
        >
          <AddIcon />
        </Fab>
      </Zoom>

      {/* Modal formularza listy zakupów */}
      <ShoppingListForm
        open={isShoppingListFormOpen}
        setOpen={setShoppingListFormOpen}
      />
    </div>
  )
}
