import { Typography } from '@mui/material'
import RecipeList from '../recipes/dashboard/RecipeList'
import AllergensSection from './AllergensSection'
import ProfileHeader from './ProfileHeader'
import { useParams } from 'react-router';
import { useProfile } from '../../lib/hooks/useProfile';
import ProfileFollowings from './ProfileFollowings';

export default function ProfilePage() {
    const {id} = useParams();
  const {profile, loadingProfile} = useProfile(id);

  if (loadingProfile) return <Typography>Loading profile...</Typography>

  if (!profile) return <Typography>Profile not found</Typography>
  return (
    <div>
      <ProfileHeader/>
<ProfileFollowings activeTab={2}/>
<ProfileFollowings activeTab={3}/>

      <AllergensSection/>
      <RecipeList/>
    </div>
  )
}
