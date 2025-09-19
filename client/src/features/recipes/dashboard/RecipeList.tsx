import { Box, CircularProgress, Typography } from "@mui/material";
import RecipeCard from "./RecipeCard";
type Props = {
  recipes?: Recipe[];     
  isLoading?: boolean;};

export default function RecipeList({ recipes, isLoading }: Props) {

if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={2}>
        <CircularProgress />
      </Box>
    );
  } 
  if (!recipes || recipes.length === 0) return <Typography>No recipes found</Typography>;

  return (
    <Box sx={{display: "flex",
        flexWrap: "wrap",           
        gap: 3,
        justifyContent: "center",
        }}>
       {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
    </Box>
    
  )
}
