import { Box, CircularProgress, Container } from "@mui/material";
import Section from "./Section";
import { useRecipes } from "../../lib/hooks/useRecipes";

export default function HomePage() {
  const{ latestRecipes, quickRecipes, loadingQuick, loadingLatest, loadingRated, bestRatedRecipes,} = useRecipes();

  if (loadingRated || loadingQuick || loadingLatest) {
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
        {/* <Section title="Daily tags" recipes={dailyTagRecipes} isLoading={loadingDailyTag} /> */}
        <Section title="Quick and Easy Recipes" recipes={quickRecipes} isLoading={loadingQuick} />
      </Container>
    </Box>
  );
}
