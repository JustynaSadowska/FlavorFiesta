import { Box, Typography } from "@mui/material";
import RecipeCard from "./RecipeCard";
type Props = {
  recipes?: Recipe[];     
  isLoading?: boolean;};

export default function RecipeList({ recipes, isLoading }: Props) {

  if(isLoading) return <Typography>Loading...</Typography>
  if (!recipes || recipes.length === 0) return <Typography>No recipes found</Typography>;

  return (
    <Box sx={{display: "flex",
        flexWrap: "wrap",           
        gap: 3,
        justifyContent: "center",
        mt:3
        }}>
       {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
    </Box>
    
  )
}
