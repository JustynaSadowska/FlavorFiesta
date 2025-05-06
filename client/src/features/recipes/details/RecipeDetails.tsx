import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Typography } from "@mui/material"
import { useRecipes } from "../../../lib/hooks/useRecipes"
import { Link, useNavigate, useParams } from "react-router";
import { AccessTime } from "@mui/icons-material";
import { formatDate } from "../../../lib/unitl/util";

export default function RecipeDetails() {
    const navigate = useNavigate();
    const {id} = useParams();
    const {recipe, isLoadingRecipe} = useRecipes(id);
    const{deleteRecipe} = useRecipes();
    //const isAuthor = false;

    if (isLoadingRecipe) return <Typography>Loading...</Typography>

    if (!recipe) return <Typography>Recipe not found</Typography>

  return (
    <Card>
        <CardContent>
            <Typography variant="h5" mb={1}>{recipe.title}</Typography>
            <Typography variant="body1">{recipe.description}</Typography>
            <Typography variant="body1">difficulty level: {recipe.difficulty}</Typography>
            <Typography variant="body1">{recipe.preparationTime} minutes</Typography>
            <Typography variant="body1">servings: {recipe.servings}</Typography>
            <Box display="flex" alignItems="center" mt={2}>
                <AccessTime sx={{ mr: 1,  }} />
                <Typography variant="subtitle1">{formatDate(recipe.createdAt) }</Typography>
            </Box>
        </CardContent>
        <CardHeader color="black" avatar = {<Avatar sx={{height: 30, width: 30}}/>}
        subheader = {
            <>
            By {''} <Link to = {`profiles/bob`}>Bob</Link>
            </>
        }>          
        </CardHeader>
        <CardActions>
            <Button component= {Link} to = {`/manage/${recipe.id}`}> Edit</Button>
            <Button onClick={() => navigate('/recipes')}>Cancel</Button>
            <Button onClick={()=> deleteRecipe.mutate(recipe.id)} disabled={deleteRecipe.isPending} size = 'medium' color= 'error'    
                variant="contained">Delete</Button>
        </CardActions>
       
   </Card>
  )
}
