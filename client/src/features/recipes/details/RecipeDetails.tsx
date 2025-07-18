import { Box, Button, Card, CardActions, CardContent, CardHeader, Typography, Switch, FormControlLabel, Chip} from "@mui/material"
import { useRecipes } from "../../../lib/hooks/useRecipes"
import { Link, useNavigate, useParams } from "react-router";
import { AccessTime } from "@mui/icons-material";
import { formatDate } from "../../../lib/util/util";
import AvatarPopover from "../../../app/shared/components/AvatarPopover";

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
            {recipe.tags && recipe.tags.length > 0 && (
        <Box mt={2}>
            <Typography variant="h6">Tags:</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
            {recipe.tags.map((tag) => (
                <Chip key={tag.id} label={tag.name} color="secondary" variant="outlined" />
            ))}
            </Box>
        </Box>
        )}

        {recipe.allergens && recipe.allergens.length > 0 && (
        <Box mt={2}>
            <Typography variant="h6">Allergens:</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
            {recipe.allergens.map((allergen) => (
                <Chip key={allergen.id} label={allergen.name} color="error" variant="outlined" />
            ))}
            </Box>
        </Box>
        )}
        </CardContent>
        {!recipe.isAuthor && (
            <CardHeader 
                color="black"
                avatar = {
                    <AvatarPopover profile = {{
                    id: recipe.userId,
                    firstName: recipe.authorFirstName,
                    lastName: recipe.authorLastName,
                    }}/>}
                    subheader = {
                        <>
                        By {''} <Link to = {`/profiles/${recipe.userId}`}>{recipe.authorFirstName} {recipe.authorLastName}</Link>
                        </>
                    }>          
            </CardHeader>
            )}
        {recipe.isAuthor && (
            <CardActions>
                <Button component= {Link} to = {`/manage/${recipe.id}`}> Edit</Button>
                
                <Button onClick={() =>
                        deleteRecipe.mutate(recipe.id, {
                        onSuccess: () => navigate('/recipes')
                        })
                    } disabled={deleteRecipe.isPending} size = 'medium' color= 'error'    
                    variant="contained">Delete</Button>
            </CardActions>
        )}
        
        <Button color="info" onClick={() => navigate('/recipes')}>Cancel</Button>
       
   </Card>
  )
}
