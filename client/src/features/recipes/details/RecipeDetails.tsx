import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"

type Props ={
    recipe: Recipe
    cancelSelectedRecipe: () => void
    openForm: (id: string) => void
    deleteRecipe: (id: string) => void
}
export default function RecipeDetails({recipe, cancelSelectedRecipe, openForm, deleteRecipe } : Props) {
  return (
   <Card>
        <CardContent>
            <Typography variant="h5">{recipe.title}</Typography>
            <Typography variant="subtitle1">{recipe.createdAt}</Typography>
            <Typography variant="body1">{recipe.description}</Typography>
            <Typography variant="body1">difficulty level: {recipe.difficulty}</Typography>
            <Typography variant="body1">{recipe.preparationTime} minutes</Typography>
            <Typography variant="body1">servings: {recipe.servings}</Typography>
        </CardContent>
        <CardActions>
            <Button onClick={() => openForm(recipe.id)}> Edit</Button>
            <Button onClick={cancelSelectedRecipe}>Cancel</Button>
            <Button onClick={()=> deleteRecipe(recipe.id)} size = 'medium' color= 'error'    
                variant="contained">Delete</Button>
        </CardActions>
   </Card>
  )
}
