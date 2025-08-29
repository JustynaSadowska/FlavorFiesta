import { Box, Divider, Tab, Tabs, Typography } from '@mui/material'
import RecipeList from '../recipes/dashboard/RecipeList'
import ProfileHeader from './ProfileHeader'
import { useParams } from 'react-router';
import { useProfile } from '../../lib/hooks/useProfile';
import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingListDashboard from '../shoppinglists/dashboard/ShoppingListDashboard';
export default function ProfilePage() {
  const {id} = useParams();
  const {profile, loadingProfile, isCurrentUser, userRecipes, favoriteRecipes, isLoading, isFavoriteLoading} = useProfile(id);
  const [tab, setTab] = useState(0)

  if (loadingProfile) return <Typography>Loading profile...</Typography>

  if (!profile) return <Typography>Profile not found</Typography>
  return (
    <div>
      <ProfileHeader/>
       <Box sx={{ mt: 4 }}>
        {isCurrentUser && (
          <><Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
            <Tab icon={<RestaurantIcon />} label="RECIPES" />
            <Tab icon={<FavoriteIcon />} label="FAVORITES" />
            <Tab icon={<ShoppingCartIcon />} label="SHOPPING LISTS" />
          </Tabs>
          <Divider sx={{borderColor: 'grey.300',  maxWidth: 1250, margin: "auto"}} /></>
        )}
      </Box>

      <Box sx={{ mt: 3 }}>
        {tab === 0 && (
          <RecipeList recipes={userRecipes} isLoading={isLoading}/>
        )}
        {tab === 1 && (
          <>
            {(!favoriteRecipes || favoriteRecipes.length === 0) ? (
              <Box sx={{ textAlign: "center", mt: 5, ml: -6}}>
                <FavoriteIcon sx={{ fontSize: 64, mb: 1, color: "grey.500" }} />
                <Typography variant="subtitle1" fontStyle="italic" color="text.secondary">
                  You don’t have any favorite recipes yet.
                </Typography>
              </Box>
            ) : (
              <RecipeList recipes={favoriteRecipes} isLoading={isFavoriteLoading} />
            )}
          </>        
        )}
         {tab === 2 && (
          <ShoppingListDashboard/>
        )}
      </Box>
    </div>
  )
}