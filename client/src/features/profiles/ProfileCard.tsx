// import { Person } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, Divider, Typography } from "@mui/material";
import { Link } from "react-router"
import { useProfile } from "../../lib/hooks/useProfile";

type Props = {
    profile: Profile
}
export default function ProfileCard({profile} : Props) {
const {userRecipes} = useProfile(profile.id);

console.log(profile)
  return (
  <Link to={`/profiles/${profile.id}`} style={{textDecoration:'none'}}>
      <Card
        sx={{
            borderRadius: 0, p: 2,
            maxWidth: 300,
            textDecoration: 'none'
        }}
        elevation={4}
      >
        <CardMedia 
            component='img' 
            src={profile?.imageUrl || '/images/user.png'} 
            sx={{width: 200, zIndex: 50}}
            alt={profile.firstName}
        />
        <CardContent>
          <Box 
              display="flex" 
              alignItems="center" 
              justifyContent="center" 
              sx={{my:-1}}
          >
              <Typography variant="h6" component="span" fontWeight="bold">
              {profile.firstName} {profile.lastName}
              </Typography>
          </Box>
        </CardContent>
        <Box display="flex" justifyContent="center" gap={1.5} >
            <Box textAlign="center">
              <Typography variant="subtitle2" color="text.secondary">
                Recipes
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {userRecipes?.length ?? 0}
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="subtitle2" color="text.secondary">
                Followers
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {profile.followersCount}
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="subtitle2" color="text.secondary">
                Following
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {profile.followingCount}
              </Typography>
            </Box>
          </Box>
        
        {userRecipes && userRecipes.length > 0 && (
          <>
            <Divider sx={{ mb: 1.5 }} />

            <Box display="flex" justifyContent="center" gap={0.5}>
              {userRecipes.slice(0, 3).map((recipe, index) => (
                <CardMedia
                  key={index}
                  component="img"
                  src={recipe.imageUrl || "/images/jedzenie.jpg"}
                  alt={`Recipe ${index + 1}`}
                  sx={{ width: 65, height: 65, objectFit: "cover", borderRadius: 1 }}
                />
              ))}
            </Box>
          </>)}
      </Card>
   </Link>
  )
}
