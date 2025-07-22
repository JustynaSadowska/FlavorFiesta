import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router"; 
import { formatPreparationTime } from "../../../lib/util/timeFormatter";

type Props = {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: Props) {
  const averageRating = 4.1;//jesli ktos nie ma rating to dac ze nowy 

  return (
    <Card
      elevation={4}
      sx={{
        borderRadius: 3,
        width: 230,
        height: 290,
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
    >
      <CardActionArea component={Link} to={`/recipes/${recipe.id}`}>
        <CardMedia
          component="img"
          height="200"
          image={"/images/jedzenie.jpg"}
          alt={recipe.title}
          sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
        />
        <CardContent sx={{ px: 2, pb: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{ 
              textAlign: "center", 
              fontWeight: 600, 
              wordWrap: "break-word",
              overflowWrap: "break-word",
              whiteSpace: "normal", 
              overflow: "hidden", }}
            gutterBottom
          >
            {recipe.title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
              fontSize: "0.85rem",
              color: "text.secondary",
              px: 0.5,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <StarIcon fontSize="small" sx={{ color: "#fbc02d" }} />
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {averageRating.toFixed(1)}
              </Typography>
              <span>(456)</span>
              {/* ilosc recenzji */}
            </Box>
            <span>{formatPreparationTime(recipe.preparationTime)}</span>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
