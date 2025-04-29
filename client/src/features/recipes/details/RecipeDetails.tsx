import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import { useRecipes } from "../../../lib/hooks/useRecipes"
import { Link, useNavigate, useParams } from "react-router";

export default function RecipeDetails() {
    const navigate = useNavigate();
    const {id} = useParams();
    const {recipe, isLoadingRecipe} = useRecipes(id);
    const{deleteRecipe} = useRecipes();

    if (isLoadingRecipe) return <Typography>Loading...</Typography>

    if (!recipe) return <Typography>Recipe not found</Typography>

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
            <Button component= {Link} to = {`/manage/${recipe.id}`}> Edit</Button>
            <Button onClick={() => navigate('/recipes')}>Cancel</Button>
            <Button onClick={()=> deleteRecipe.mutate(recipe.id)} disabled={deleteRecipe.isPending} size = 'medium' color= 'error'    
                variant="contained">Delete</Button>
        </CardActions>
   </Card>
  )
}
