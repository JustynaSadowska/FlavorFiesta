import { Box, Divider, Tab, Tabs, Typography } from '@mui/material'
import RecipeList from '../recipes/dashboard/RecipeList'
import ProfileHeader from './ProfileHeader'
import { useParams } from 'react-router';
import { useProfile } from '../../lib/hooks/useProfile';
import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
export default function ProfilePage() {
  const {id} = useParams();
  const {profile, loadingProfile, isCurrentUser} = useProfile(id);
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
          <RecipeList />
        )}
        {tab === 1 && (
          <Typography> ulubione</Typography>
        )}
      </Box>
    </div>
  )
}