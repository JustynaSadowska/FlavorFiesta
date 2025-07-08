import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Typography, Switch, FormControlLabel} from "@mui/material"
import { useRecipes } from "../../../lib/hooks/useRecipes"
import { Link, useNavigate, useParams } from "react-router";
import { AccessTime } from "@mui/icons-material";
import { formatDate } from "../../../lib/util/util";

export default function RecipeDetails() {
    const navigate = useNavigate();
    const {id} = useParams();
    const {recipe, isLoadingRecipe, updateVisibility} = useRecipes(id);
    const{deleteRecipe} = useRecipes();

    const handleVisibilityToggle = (id?: string) => {
  if (!id) return;
  updateVisibility.mutate(id);
};
    if (isLoadingRecipe) return <Typography>Loading...</Typography>

    if (!recipe) return <Typography>Recipe not found</Typography>

  return (
    <Card>
        <CardContent>
            {recipe.isAuthor && (
           <FormControlLabel
                control={
                    <Switch
                    checked={recipe?.isVisible}
                    onChange={() => handleVisibilityToggle(recipe?.id)}
                    inputProps={{ 'aria-label': 'Visibility toggle' }}
                    />
                }
                label="Visible"
            />
            )}
            <Typography variant="h5" mb={1}>{recipe.title}</Typography>
            <Typography variant="body1">{recipe.description}</Typography>
            <Typography variant="body1">difficulty level: {recipe.difficulty}</Typography>
            <Typography variant="body1">{recipe.preparationTime} minutes</Typography>
            <Typography variant="body1">servings: {recipe.servings}</Typography>

            <Box display="flex" alignItems="center" mt={2}>
                <AccessTime sx={{ mr: 1,  }} />
                <Typography variant="subtitle1">{formatDate(recipe.createdAt) }</Typography>
            </Box>
            <Box mt={2}>
            <Typography variant="h5">Steps:</Typography>
            {recipe.steps && recipe.steps.length > 0 ? (
                recipe.steps.map((step, index) => (
                <Typography key={index} variant="body2" sx={{ ml: 2 }}>
                    {index + 1}. {step.description}
                </Typography>
                ))
            ) : (
                <Typography variant="body2" sx={{ ml: 2 }}>No steps provided.</Typography>
            )}
            </Box>
            <Box mt={2}>
                <Typography variant="h6">Ingredients:</Typography>
                {recipe.ingredients && recipe.ingredients.length > 0 ? (
                    recipe.ingredients.map((ingredient, index) => (
                    <Typography key={index} variant="body2" sx={{ ml: 2 }}>
                        • {ingredient.name} {ingredient.quantity} {ingredient.unit.displayName}
                    </Typography>
                    ))
                ) : (
                    <Typography variant="body2" sx={{ ml: 2 }}>No ingredients provided.</Typography>
                )}
            </Box>
        </CardContent>
        {!recipe.isAuthor && (
            <CardHeader color="black" avatar = {<Avatar sx={{height: 30, width: 30}}/>}
                    subheader = {
                        <>
                        By {''} <Link to = {`/profiles/${recipe.userId}}`}>{recipe.authorFirstName} {recipe.authorLastName}</Link>
                        </>
                    }>          
            </CardHeader>
            )}
        {recipe.isAuthor && (
            <CardActions>
                <Button component= {Link} to = {`/manage/${recipe.id}`}> Edit</Button>
                
                <Button onClick={()=> deleteRecipe.mutate(recipe.id)} disabled={deleteRecipe.isPending} size = 'medium' color= 'error'    
                    variant="contained">Delete</Button>
            </CardActions>
        )}
        
        <Button color="info" onClick={() => navigate('/recipes')}>Cancel</Button>
       
   </Card>
  )
}
