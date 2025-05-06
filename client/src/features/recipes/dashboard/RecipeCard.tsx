import {Card, CardActionArea, CardContent, Typography } from "@mui/material"
import { Link } from "react-router"

type Props ={
    recipe : Recipe
}
export default function RecipeCard({recipe} : Props) {
 

  return (
      <Card elevation={3} sx={{ maxWidth: 360, mb:3}}>
        <CardActionArea component = {Link} to = {`/recipes/${recipe.id}`}>
          {/* <CardMedia
            component="img"
            height="140"
          /> */}
          <CardContent>
            <Typography gutterBottom variant="h5" sx={{ textAlign: 'center' }}>
            {recipe.title}
            </Typography>
            <Typography variant="body2">
              {recipe.description}
            </Typography>
            {/* <Chip label= {recipe.preparationTime} variant= "outlined"></Chip> */}
          </CardContent>
        </CardActionArea>
      </Card>
    // <Card sx={{borderRadius: 3}}>
    //     <CardContent>
    //         <Typography variant="h4">{recipe.title}</Typography>
    //         <Typography sx={{color:'text.secondary', mb: 1}}>{recipe.createdAt}</Typography>
    //         <Typography variant="body2">{recipe.description}</Typography>
    //         <Typography variant="subtitle1">{recipe.preparationTime}</Typography>
    //     </CardContent>
    //     <CardActions sx={{display: 'flex', justifyContent:'space-between', pb:2}}>
    //         <Chip label= {recipe.preparationTime} variant= "outlined"></Chip>
    //         <Button size = 'medium' variant="contained">View</Button>
    //     </CardActions>

    // </Card>
  )
}