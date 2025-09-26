import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router"; 
import { formatPreparationTime } from "../../../lib/util/timeFormatter";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

type Props = {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: Props) {
  return (
    <Card
      elevation={4}
      sx={{
        borderRadius: 3,
        width: 230,
        height: 290,
        mb:1,
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
          image={recipe.imageUrl || "/images/jedzenie.jpg"}
          alt={recipe.title}
          sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
        />
        {!recipe.isVisible && (
         <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "#F3EDE4",
              borderRadius: 2,
              px: 0.5,
              py: 0.2,
              display: "flex",
              alignItems: "center",
              boxShadow: 1,
            }}
          >
            <VisibilityOffIcon color="disabled" fontSize="small" />
           
          </Box>
           )}
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
                {recipe.reviewCount > 0 ? (
                <>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {recipe.averageRating.toFixed(1)}
                  </Typography><Typography fontSize="small">({recipe.reviewCount})</Typography></>
                  ): (
                    <Typography style={{ fontSize: "0.875rem", color: "#888" }}>
                     No reviews
                    </Typography>
                )}
              
            </Box>
            <span>{formatPreparationTime(recipe.preparationTime)}</span>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
{/* <Box display="flex" alignItems="center" >
                  <Switch 
                    checked={recipe.isVisible}
                    onChange={() => {
                        updateVisibility.mutate(recipe.id);
                    }}
                  />
                    {recipe.isVisible ? (
                      <VisibilityIcon color="action" />
                    ) : (
                      <VisibilityOffIcon color="disabled" />
                    )}
                </Box> */}
