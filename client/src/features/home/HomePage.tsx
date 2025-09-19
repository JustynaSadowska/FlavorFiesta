import { Box, CircularProgress, Container } from "@mui/material";
import { useRecipes } from "../../lib/hooks/useRecipes";
import Section from "./Section";

export default function HomePage() {
const { recipes, isLoading } = useRecipes();

console.log(recipes)
if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={2}>
        <CircularProgress />
      </Box>
    );
  } 
  if (!recipes) return <p>No recipes</p>;

  const topRated = [...recipes]
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, 4);

  const recent = [...recipes]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  const dinner = recipes
    .filter((r) => r.tags.some((tag) => tag.name.toLowerCase() === "dinner"))
    .slice(0, 4);

  const quick = recipes
    .filter((r) => r.tags.some((tag) => tag.name.toLowerCase() === "quick & easy"))
    .slice(0, 4);

  return (
    <Container sx={{ mt: 2}}>
      <Section title="Top Rated Recipes" recipes={topRated} isLoading={isLoading} />
      <Section title="Recently Added Recipes" recipes={recent} isLoading={isLoading} />
      <Section title="Dinner Ideas" recipes={dinner} isLoading={isLoading} />
      <Section title="Quick and easy recipes" recipes={quick} isLoading={isLoading} />
    </Container>
  );
}
