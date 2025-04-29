import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { FormEvent } from "react";
import { useRecipes } from "../../../lib/hooks/useRecipes";
import { useNavigate, useParams } from "react-router";


export default function RecipeForm() {
    const {id} = useParams();
    const{updateRecipe, createRecipe, recipe, isLoadingRecipe} = useRecipes(id);
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget);

        const data: {[key: string]: FormDataEntryValue} ={}
        formData.forEach((value, key) => {
            data[key] = value;
        });

        if(recipe){
            data.id = recipe.id;
            await updateRecipe.mutateAsync(data as unknown as Recipe);
            navigate(`/recipes/${recipe.id}`);
        } else{
            createRecipe.mutate(data as unknown as Recipe, {
                onSuccess: (id) => {
                    navigate(`/recipes/${id}`)
                }
            });
        }
    }

    if(isLoadingRecipe) return <Typography>Loading...</Typography>
    
  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
        <Typography variant="h5" gutterBottom color="primary">
           {recipe ? 'Edit recipe' : ' Create Recipe'}
        </Typography>
        <Box component='form' onSubmit={handleSubmit} display='flex' flexDirection='column' gap={3}>
                 <TextField name='title' label='Title' defaultValue={recipe?.title} />
                 <TextField name='description' label='Description' defaultValue={recipe?.description} multiline rows={3} />
                 <TextField name='servings' label='Servings' defaultValue={recipe?.servings}/>
                 <TextField name='preparationTime' label='PreparationTime'defaultValue={recipe?.preparationTime} />
                 <TextField name='difficulty' label='Difficulty'  defaultValue={recipe?.difficulty}/>
                 <Box display='flex' justifyContent='end' gap={3}>
                     <Button onClick={() => navigate('/recipes')} color='inherit'>Cancel</Button>
                     <Button type="submit" color='success' variant="contained" disabled={updateRecipe.isPending || createRecipe.isPending}>Submit</Button>
                 </Box>
        </Box>
   </Paper>
  )
}
