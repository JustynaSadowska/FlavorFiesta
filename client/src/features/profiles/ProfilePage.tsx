import { Typography } from '@mui/material'
import RecipeList from '../recipes/dashboard/RecipeList'
//import { useParams } from 'react-router';
//import { useProfile } from '../../lib/hooks/useProfile';

export default function ProfilePage() {
    //const {id} = useParams();
  //const {profile, loadingProfile} = useProfile(id);

  //if (loadingProfile) return <Typography>Loading profile...</Typography>

  //if (!profile) return <Typography>Profile not found</Typography>
  return (
    <div>
      <Typography> To jest profil</Typography>
      <RecipeList/>
    </div>
  )
}
