// import { Person } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, Chip, Divider, Typography } from "@mui/material";
import { Link } from "react-router"

type Props = {
    profile: Profile
}
export default function ProfileCard({profile} : Props) {

  return (
  <Link to={`/profiles/${profile.id}`} style={{textDecoration:'none'}}>
        <Card
                sx={{
                    borderRadius: 0, p: 3,
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
                    gap={1} 
                    justifyContent="center" 
                >
                    <Typography variant="h5" component="span">
                    {profile.firstName} {profile.lastName}
                    </Typography>
                    {profile.following && (
                    <Chip size="small" label='Following' color="secondary" variant="outlined" />
                    )}
                </Box>
                </CardContent>

               <Divider sx={{ mb: 2 }} />

        {/*
        <Box display="flex" justifyContent="center" gap={1}>
          {profile.recipes?.slice(0, 3).map((recipe, index) => (
            <CardMedia
              key={index}
              component="img"
              src={recipe.imageUrl}
              alt={`Recipe ${index + 1}`}
              sx={{ width: 70, height: 70, objectFit: "cover", borderRadius: 1 }}
            />
          ))}
        </Box> */}
            </Card>
   </Link>
  )
}
