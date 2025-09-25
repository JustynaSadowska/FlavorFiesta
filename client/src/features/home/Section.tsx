import { Typography, Box, CircularProgress} from "@mui/material";
import RecipeCard from "../recipes/dashboard/RecipeCard";

type Props = {
  title: string;
  recipes: Recipe[];
  isLoading: boolean;
};

export default function Section({ title, recipes, isLoading }: Props) {
  return (
    <Box sx={{ mb: 5}}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Box
          sx={{
            width: 8,
            height: 32,
            background: "linear-gradient(180deg, #ff8a65 0%, #ff7043 100%)",
            borderRadius: 2,
            mr: 2,
          }}
        />
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#222" }}>
          {title}
        </Typography>
      </Box>

      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      ) : (
            <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </Box>
      )}
    </Box>
  );
}
