import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import { useRecipes } from "../../../lib/hooks/useRecipes"

type Props ={
    selectedrecipe: Recipe
    cancelSelectedRecipe: () => void
    openForm: (id: string) => void
}
export default function RecipeDetails({selectedrecipe, cancelSelectedRecipe, openForm } : Props) {
    const {recipes} = useRecipes();
    const recipe = recipes?.find(x => x.id === selectedrecipe.id);
    const{deleteRecipe} = useRecipes();

    if (!recipe) return  <Typography >Loading ...</Typography>

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
            <Button onClick={()=> deleteRecipe.mutate(recipe.id)} disabled={deleteRecipe.isPending} size = 'medium' color= 'error'    
                variant="contained">Delete</Button>
        </CardActions>
   </Card>
  )
}
