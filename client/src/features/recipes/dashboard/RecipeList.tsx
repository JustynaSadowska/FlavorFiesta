import { Box, Typography } from "@mui/material";
import RecipeCard from "./RecipeCard";
import { useRecipes } from "../../../lib/hooks/useRecipes";
import { useProfile } from "../../../lib/hooks/useProfile";
import { useLocation, useParams } from "react-router";


export default function RecipeList() {
  const {id} = useParams();
  const {recipes, isLoading} = useRecipes();
  const {userRecipes} = useProfile(id);
  const location = useLocation();
  const isRecipePage = location.pathname =='/recipes'
  const dataToShow = isRecipePage ? recipes : userRecipes;
  
  if(isLoading) return <Typography>Loading...</Typography>
  if(!dataToShow || dataToShow.length === 0) return <Typography>No recipes found</Typography>

  return (
    <Box sx={{display: "flex",
        flexWrap: "wrap",           
        gap: 3,
        justifyContent: "center"
        }}>
        {dataToShow.map(recipe => (
            <RecipeCard key={recipe.id} 
              recipe ={recipe} 
              />
        ))}
    </Box>
    
  )
}
