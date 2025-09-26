import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from "react-router"; 
import { useProfile } from '../../lib/hooks/useProfile';
type Props = {
  profile: Profile;
};
export default function UserCard({profile} : Props) {
    const {recentRecipes} = useProfile(profile.id);
    
  return (
    <Card
        elevation={4}
        sx={{
            borderRadius: 3,
            width: 230,
            height: 290,
            mb:1,
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
            transform: "scale(1.03)",
            },
        }}
    >
      <CardActionArea component={Link} to={`/profiles/${profile.id}`}>
        <CardMedia
          component="img"
          height="200"
          image={profile?.imageUrl || '/images/user.png'}
          alt={profile.firstName}
          sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
        />
        <CardContent sx={{ px: 2, pb: 2}}>
          <Typography
            variant="subtitle1"
            sx={{ 
              textAlign: "center", 
              fontWeight: 600, 
              wordWrap: "break-word",
              overflowWrap: "break-word",
              whiteSpace: "normal", 
              overflow: "hidden", }}
            gutterBottom
          >
            {profile.firstName} {profile.lastName}
          </Typography>

            <Box display="flex " alignItems= "center" gap={1} mt={2} >
              <Typography variant="body2" color="text.secondary">
                Posted Recipes
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {recentRecipes?.totalCount ?? 0}
              </Typography>
            </Box>
              
          
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

