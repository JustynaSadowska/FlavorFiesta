import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Chip,
  Rating,
  IconButton,
  Divider,
} from "@mui/material";
import { useRecipes } from "../../../lib/hooks/useRecipes";
import { Link, useNavigate, useParams } from "react-router";
import { formatDate } from "../../../lib/util/util";
import AvatarPopover from "../../../app/shared/components/AvatarPopover";
import IngredientsSection from "./IngredientsSection";
import { formatPreparationTime } from "../../../lib/util/timeFormatter";
import { difficultyOptions } from "../../../lib/util/constants";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export default function RecipeDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { recipe, isLoadingRecipe } = useRecipes(id);
  const { deleteRecipe } = useRecipes();

  const [selectedServings, setSelectedServings] = useState<number>(1);

  useEffect(() => {
    if (recipe?.servings) {
      setSelectedServings(recipe.servings);
    }
  }, [recipe]);

  if (isLoadingRecipe) return <Typography>Loading...</Typography>;

  if (!recipe) return <Typography>Recipe not found</Typography>;

  return (
    <Card sx={{ maxWidth: 1200, margin: "auto", mt: 4, borderRadius: 3, p: 2,  position: "relative" }}>
        <Box
            sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            }}
        >
            
            <Box
                component="img"
                src={"/images/jedzenie.jpg"}
                alt={recipe.title}
                sx={{
                width: { xs: "100%", md: "40%" },
                height: { xs: 250, md: 400 },
                objectFit: "cover",
                borderRadius: 3,
                flexShrink: 0,
                }}
            />

            <Box
            sx={{
                width: { xs: "100%", md: "60%" },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 2,
            }}
                >
            {recipe.isAuthor && (
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, position: "relative"}}>
                    <IconButton component={Link} to={`/manage/${recipe.id}`} aria-label="edit">
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={() =>
                            deleteRecipe.mutate(recipe.id, {
                                onSuccess: () => navigate("/recipes"),
                            })
                        }
                        disabled={deleteRecipe.isPending}
                        aria-label="delete"
                    >
                        <DeleteOutlinedIcon />
                    </IconButton>
                </Box>
            )}
            <Typography
                variant="h3"
                component="h1"
                fontWeight="bold"
                sx={{ lineHeight: 1.2 }}
            >
                {recipe.title}
            </Typography>

            <Box
                sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                fontWeight: "500",
                color: "text.secondary",
                mt: 1
                }}
            >
                <Rating
                    name="recipe-rating"
                    value={4.5}
                    precision={0.5}
                    readOnly
                    size="medium"
                />
                <Link
                    to={{
                        pathname: "/some/path",
                    }}
                    style={{  color: "inherit", fontSize: "0.875rem" }}
                    >
                    4.5 (456)
                </Link>
            </Box>
            {!recipe.isAuthor && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: -1 }} >
                    <Box sx={{ width: 24, height: 24 }} >
                        <AvatarPopover
                            profile={{
                            id: recipe.userId,
                            firstName: recipe.authorFirstName,
                            lastName: recipe.authorLastName,
                            }}
                            avatarProps={{ sx: { width: 24, height: 24 } }}
                            showName={true}
                        />
                    </Box>
                </Box>
            )}
            <Box display="flex" alignItems="center" gap={1} mb={-1}>
                <Typography variant="subtitle2" color="text.secondary" >
                    Created at:
                </Typography>
                <Typography variant="subtitle2" >
                    {formatDate(recipe.createdAt)}
                </Typography>
            </Box>
            <Divider />
            {recipe.description && (
                <Typography
                variant="body1"
                color="text.secondary"
                whiteSpace="pre-line"
                >
                {recipe.description}
                </Typography>
            )}
            <Divider />
            <Box  >
                <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="body1" color="text.secondary" >
                        Difficulty:
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                        {difficultyOptions.find(
                        (opt) => opt.value === recipe.difficulty
                        )?.label || "Unknown"}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1} >
                    <Typography variant="body1" color="text.secondary">
                        Preparation Time:
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                        {formatPreparationTime(recipe.preparationTime)}
                    </Typography>
                </Box>
               
            </Box>
            
            </Box>

          
      </Box>

      <CardContent sx={{ mt: 4 }}>
        <IngredientsSection
          ingredients={recipe.ingredients}
          baseServings={recipe.servings}
          selectedServings={selectedServings}
          onServingsChange={setSelectedServings}
        />

        <Typography variant="h5" fontWeight="bold" mb={2}>
          Steps
        </Typography>
        {recipe.steps && recipe.steps.length > 0 ? (
          recipe.steps.map((step, i) => (
            <Box
              key={i}
              sx={{
                mb: 2,
                pl: 3,
                borderLeft: "4px solid",
                borderColor: "primary.main",
                backgroundColor: "rgba(25, 118, 210, 0.05)",
                borderRadius: 2,
                p: 2,
              }}
            >
              <Typography variant="subtitle1" fontWeight="600" mb={0.5}>
                Step {i + 1}
              </Typography>
              <Typography variant="body1" whiteSpace="pre-line">
                {step.description}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary" mb={3}>
            No steps provided.
          </Typography>
        )}

        {recipe.tags && recipe.tags.length > 0 && (
          <Box mb={3}>
            <Typography variant="h6" fontWeight="bold" mb={1}>
              Tags
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {recipe.tags.map((tag) => (
                <Chip
                  key={tag.id}
                  label={tag.name}
                  color="secondary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        )}

        {recipe.allergens && recipe.allergens.length > 0 && (
          <Box mb={3}>
            <Typography variant="h6" fontWeight="bold" mb={1} color="error">
              Allergens
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {recipe.allergens.map((allergen) => (
                <Chip
                  key={allergen.id}
                  label={allergen.name}
                  color="error"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        )}
      </CardContent>
      

      <Box sx={{ p: 2, textAlign: "center" }}>
        <Button color="info" onClick={() => navigate("/recipes")}>
          Cancel
        </Button>
      </Box>
    </Card>
  );
}
