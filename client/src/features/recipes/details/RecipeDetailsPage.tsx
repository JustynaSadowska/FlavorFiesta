import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Rating,
  IconButton,
  Divider,
  styled,
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
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

export const StyledBox = styled(Box)({
  display: "flex", 
  justifyContent: "flex-end", 
  gap: 1, 
  position: "relative", 
  mb:-2
})


export default function RecipeDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { recipe, isLoadingRecipe } = useRecipes(id);
  const { deleteRecipe } = useRecipes();

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
                height: { xs: 250, md: 420 },
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
                    gap: 2,               
                }}
            >
                
                {recipe.isAuthor ? (
                    <StyledBox>
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
                    </StyledBox>
                ): (
                    <StyledBox>
                        <IconButton
                        aria-label="add to favorites"
                        onClick={() => {
                        }}
                        >
                        <FavoriteBorderIcon  />
                        </IconButton>
                    </StyledBox>
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
                 {recipe.tags && recipe.tags.length > 0 && (
                  <Box ml={3}>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {recipe.tags.map((tag) => (
                        <Chip
                          key={tag.id}
                          label={tag.name}
                          variant="outlined"
                          size= "small"
                          color="secondary"
                        />
                      ))}
                    </Box>
                  </Box>
                )}
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
            <Divider/>
            {recipe.description && (
                <>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    whiteSpace="pre-line"
                  >
                    {recipe.description}
                  </Typography>
                  <Divider/>
                </>
            )}
            <Box >
                <Box display="flex" alignItems="center" gap={1} mb={0.5} >
                    <WhatshotIcon fontSize="small"/>
                    <Typography variant="body1" color="text.secondary" >
                        Difficulty:
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                        {difficultyOptions.find(
                        (opt) => opt.value === recipe.difficulty
                        )?.label || "Unknown"}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <TimerOutlinedIcon fontSize="small"/>
                    <Typography variant="body1" color="text.secondary">
                        Preparation Time:
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                        {formatPreparationTime(recipe.preparationTime)}
                    </Typography>
                </Box>
                  {recipe.allergens && recipe.allergens.length > 0 && (
                    <Box display="flex" alignItems="center" gap={1} >
                      <WarningAmberOutlinedIcon fontSize="small" color="error"/>
                      <Typography variant="body1" color="error">
                        Allergens:
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {recipe.allergens.map((allergen) => (
                          <Chip
                            key={allergen.id}
                            label={allergen.name}
                            color="error"
                            variant="outlined"
                            size="small"
                          />
                        ))}
                      </Box>
                    </Box>
                  )}
                </Box>
            </Box>
      </Box>
      <CardContent sx={{ mt: 2}}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 1,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <IngredientsSection
              ingredients={recipe.ingredients}
              baseServings={recipe.servings}
            />
          </Box>
           <Box sx={{ flex: 1.36}}>
            <Typography variant="h5" fontWeight="bold" >
              Preparation
            </Typography>
            <Divider  sx={{ mb: 2, mt: 1}}/>

            {recipe.steps && recipe.steps.length > 0 ? (
              <Box component="ol" sx={{ pl: 3, m: 0, display: "flex", flexDirection: "column", gap: 1 }}>
                {recipe.steps.map((step, i) => (
                  <li key={i} style={{ marginBottom: "0.5rem", fontWeight: "bold"}}>
                    <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                      {step.description}
                    </Typography>
                  </li>
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary" mb={3}>
                No steps provided.
              </Typography>
            )}
          </Box>

         
        </Box>

      </CardContent>
    </Card>
  );
}
