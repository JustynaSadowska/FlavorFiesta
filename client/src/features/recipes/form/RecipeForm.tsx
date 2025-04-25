import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { FormEvent } from "react";
type Props = {
    recipe?: Recipe
    closeForm: () => void
    submitForm: (recipe: Recipe) => void
}

export default function RecipeForm({recipe, closeForm, submitForm}: Props) {

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget);

        const data: {[key: string]: FormDataEntryValue} ={}
        formData.forEach((value, key) => {
            data[key] = value;
        });

        if(recipe) data.id = recipe.id
        
        submitForm(data as unknown as Recipe)
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
                     <Button type="submit" color='success' variant="contained">Submit</Button>
                 </Box>
        </Box>
   </Paper>
  )
}
