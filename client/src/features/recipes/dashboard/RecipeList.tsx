import { Box } from "@mui/material";
import RecipeCard from "./RecipeCard";

type Props = {
    recipes: Recipe[]
    selectRecipe: (id: string) => void
}
export default function RecipeList({recipes, selectRecipe}: Props) {
  return (
    <Box sx={{display: "flex",
        flexWrap: "wrap",           
        gap: 2,
        justifyContent: "center"
        }}>
        {recipes.map(recipe => (
            <RecipeCard key={recipe.id} 
              recipe ={recipe} 
              selectRecipe={selectRecipe}
              />
        ))}
    </Box>
    
  )
}
