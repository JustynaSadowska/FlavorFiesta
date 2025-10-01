import { Box, CircularProgress, Container } from "@mui/material";
import Section from "./Section";
import { useRecipes } from "../../lib/hooks/useRecipes";

export default function HomePage() {
  const{ dinnerRecipes,latestRecipes, quickRecipes , loadingDinner, loadingQuick, loadingLatest, loadingRated, bestRatedRecipes} = useRecipes();

  if (loadingDinner || loadingQuick || loadingLatest) {
    return (
      <Box display="flex" justifyContent="center" mt={2}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Container> 
        <Section title="Best Rated Recipes" recipes={bestRatedRecipes} isLoading={loadingRated} />
        <Section title="Latest Added Recipes" recipes={latestRecipes} isLoading={loadingLatest} />
        <Section title="Dinner Ideas" recipes={dinnerRecipes} isLoading={loadingDinner} />
        <Section title="Quick and Easy Recipes" recipes={quickRecipes} isLoading={loadingQuick} />
      </Container>
    </Box>
  );
}
