import { Typography, Box } from "@mui/material";
import RecipeList from "../recipes/dashboard/RecipeList";

type Props = {
  title: string;
  recipes: Recipe[];
  isLoading: boolean;
};

export default function Section({ title, recipes, isLoading }: Props) {
  return (
    <Box sx={{ mb: 5 }}>
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

      <RecipeList recipes={recipes} isLoading={isLoading} />
    </Box>
  );
}
