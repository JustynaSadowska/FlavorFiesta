import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { FormEvent } from "react";
import { useRecipes } from "../../../lib/hooks/useRecipes";
type Props = {
    recipe?: Recipe
    closeForm: () => void
}

export default function RecipeForm({recipe, closeForm}: Props) {

    const{updateRecipe, createRecipe} = useRecipes();
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget);

        const data: {[key: string]: FormDataEntryValue} ={}
        formData.forEach((value, key) => {
            data[key] = value;
        });

        if(recipe){
            data.id = recipe.id
            await updateRecipe.mutateAsync(data as unknown as Recipe)
            closeForm();
        } else{
            await createRecipe.mutateAsync(data as unknown as Recipe)
            closeForm();
        }
    }

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
        <Typography variant="h5" gutterBottom color="primary">
            Create Recipe
        </Typography>
        <Box component='form' onSubmit={handleSubmit} display='flex' flexDirection='column' gap={3}>
                 <TextField name='title' label='Title' defaultValue={recipe?.title} />
                 <TextField name='description' label='Description' defaultValue={recipe?.description} multiline rows={3} />
                 <TextField name='servings' label='Servings' defaultValue={recipe?.servings}/>
                 <TextField name='preparationTime' label='PreparationTime'defaultValue={recipe?.preparationTime} />
                 <TextField name='difficulty' label='Difficulty'  defaultValue={recipe?.difficulty}/>
                 <Box display='flex' justifyContent='end' gap={3}>
                     <Button onClick={closeForm} color='inherit'>Cancel</Button>
                     <Button type="submit" color='success' variant="contained" disabled={updateRecipe.isPending || createRecipe.isPending}>Submit</Button>
                 </Box>
        </Box>
   </Paper>
  )
}
