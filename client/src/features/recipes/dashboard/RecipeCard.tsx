import {Card, CardActionArea, CardContent, Typography } from "@mui/material"

type Props ={
    recipe : Recipe
    selectRecipe: (id: string) => void
}
export default function RecipeCard({recipe, selectRecipe} : Props) {
  return (
      <Card sx={{ maxWidth: 360, mb:3}}>
        <CardActionArea onClick={() => selectRecipe(recipe.id)}>
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