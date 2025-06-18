import { Box, Typography } from "@mui/material";
import RecipeCard from "./RecipeCard";
import { useRecipes } from "../../../lib/hooks/useRecipes";


export default function RecipeList() {
  const {recipes, isLoading} = useRecipes();
   
  if(isLoading) return <Typography>Loading...</Typography>
  if(!recipes) return <Typography>No recipes found</Typography>

  return (
    <Box sx={{display: "flex",
        flexWrap: "wrap",           
        gap: 2,
        justifyContent: "center"
        }}>
        {recipes.map(recipe => (
            <RecipeCard key={recipe.id} 
              recipe ={recipe} 
              />
        ))}
    </Box>
    
  )
}
