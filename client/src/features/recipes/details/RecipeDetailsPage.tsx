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
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useRecipes } from "../../../lib/hooks/useRecipes";
import { Link, useParams } from "react-router";
import { formatDate } from "../../../lib/util/util";
import IngredientsSection from "./IngredientsSection";
import { formatPreparationTime } from "../../../lib/util/timeFormatter";
import { difficultyOptions } from "../../../lib/util/constants";
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import ReviewSection from "../../reviews/ReviewSection";
import { useState, useRef, useEffect, useCallback } from "react";
import DeleteDialog from "../../../app/shared/components/DeleteDialog";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { useProfile } from "../../../lib/hooks/useProfile";
import FavoriteIcon from '@mui/icons-material/Favorite';
import AvatarPopover from "../../../app/shared/components/AvatarPopover";
import { useDropzone } from "react-dropzone";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { CloudUpload, Close as CloseIcon, Upload } from "@mui/icons-material";
import { useAllergens } from "../../../lib/hooks/useAllergens";

export const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  gap: 1,
  position: "relative",
  mb: -2
});

export default function RecipeDetails() {
  const { id } = useParams();
  const { recipe, isLoadingRecipe, updateVisibility, addToFavorite, removeFromFavorite, uploadRecipePhoto } = useRecipes(id);
  const { deleteRecipe} = useRecipes();
  const { profile: author } = useProfile(recipe?.userId);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const reviewSectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(recipe?.isVisible);
  const { favoriteRecipes } = useProfile();
  const { userAllergens } = useAllergens();
  const isFavorite = favoriteRecipes?.some(fav => fav.id === recipe?.id) ?? false;

 const [editOpen, setEditOpen] = useState(false);
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);

  const cropperRef = useRef<ReactCropperElement>(null);
  const scrollToReviews = () => {
    reviewSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };
useEffect(() => {
    if (typeof recipe?.isVisible === "boolean") setIsVisible(recipe.isVisible);
    return () => { files.forEach(file => URL.revokeObjectURL(file.preview)); }
  }, [recipe?.isVisible, files]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map(file => Object.assign(file, { preview: URL.createObjectURL(file) }))
    );
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onCrop = useCallback(() => {
    const cropper = cropperRef.current?.cropper;
    cropper?.getCroppedCanvas().toBlob((blob) => {
      if (blob && recipe?.id) {
        uploadRecipePhoto.mutate(
          { file: blob, recipeId: recipe.id }, 
          {
            onSuccess: () => {
              setEditOpen(false);
              setFiles([]);
            }
          }
        );
      }
    });
  }, [uploadRecipePhoto, recipe?.id]);
  useEffect(() => {
    if (typeof recipe?.isVisible === "boolean") {
      setIsVisible(recipe.isVisible);
    }
  }, [recipe?.isVisible]);

  if (isLoadingRecipe) return (
    <Box display="flex" justifyContent="center" mt={2}>
      <CircularProgress />
    </Box>
  );
  if (!recipe) return <Typography>Recipe not found</Typography>;
  if (!author) return <Typography>Author not found</Typography>;

  return (
    <>
      <Card sx={{ maxWidth: 1200, margin: "auto", mt: 4, borderRadius: 3, p: 2, position: "relative" }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
          
          <Box
            sx={{
              position: "relative",
              width: { xs: "100%", md: "40%" },
              height: { xs: 250, md: 420 },
              borderRadius: 3,
              overflow: "hidden",
              cursor: recipe.isAuthor ? "pointer" : "default",
              "&:hover .hoverOverlay": { opacity: 1 }
            }}
            onClick={() => recipe.isAuthor && setEditOpen(true)}
          >
            <Box
              component="img"
              src={recipe.imageUrl || "/images/jedzenie.jpg"}
              alt={recipe.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
            {recipe.isAuthor && (
              <Box
                className="hoverOverlay"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  bgcolor: "rgba(0,0,0,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 20,
                  opacity: 0,
                  transition: "opacity 0.3s",
                }}
              >
                  <EditIcon />
              </Box>
            )}
          </Box>

          <Box sx={{ width: { xs: "100%", md: "60%" }, display: "flex", flexDirection: "column", gap: 2 }}>
            
            {recipe.isAuthor ? (
              <StyledBox>
                <IconButton
                  onClick={() => {
                    updateVisibility.mutate(recipe.id);
                    setIsVisible(prev => !prev);
                  }}
                  aria-label="toggle visibility"
                >
                  {isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
                <IconButton component={Link} to={`/manage/${recipe.id}`} aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => setDeleteDialogOpen(true)} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </StyledBox>
            ) : (
              <StyledBox>
                {isFavorite ? (
                  <IconButton
                    aria-label="remove from favorites"
                    onClick={() => removeFromFavorite.mutate(recipe.id)}
                    color="error"
                  >
                    <FavoriteIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    aria-label="add to favorites"
                    onClick={() => addToFavorite.mutate(recipe.id)}
                  >
                    <FavoriteBorderIcon />
                  </IconButton>
                )}
              </StyledBox>
            )}

            <Typography variant="h3" component="h1" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
              {recipe.title}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, fontWeight: "500", color: "text.secondary" }}>
              <Rating name="recipe-rating" value={recipe.averageRating} precision={0.5} readOnly size="medium" />
              {recipe.reviewCount > 0 ? (
                <Typography onClick={scrollToReviews} sx={{ cursor: "pointer", fontSize: "0.925rem", textDecoration: "underline", color: "inherit" }}>
                  <span style={{ fontWeight: "bold" }}>{recipe.averageRating.toFixed(1)}</span> ({recipe.reviewCount})
                </Typography>
              ) : (
                <Typography style={{ fontSize: "0.875rem", color: "#888" }}>No reviews yet</Typography>
              )}
              {recipe.tags && recipe.tags.length > 0 && (
                <Box ml={3}>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {recipe.tags.map(tag => (
                      <Chip key={tag.id} label={tag.name} variant="outlined" size="small" color="secondary" />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>

            {!recipe.isAuthor && ( 
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: -1 }}> 
                <Box sx={{ width: 24, height: 24 }}> 
                  <AvatarPopover 
                    profile={author} 
                    avatarProps={{ sx: { width: 24, height: 24 } }} 
                    showName={true} /> 
                  </Box> 
                </Box> )}

            <Box display="flex" alignItems="center" gap={1} mb={-1}>
              <Typography variant="subtitle2" color="text.secondary">Created at:</Typography>
              <Typography variant="subtitle2">{formatDate(recipe.createdAt)}</Typography>
            </Box>

            <Divider />

            {recipe.description && (
              <>
                <Typography variant="body1" color="text.secondary" whiteSpace="pre-line">{recipe.description}</Typography>
                <Divider />
              </>
            )}

            <Box>
              <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                <WhatshotIcon fontSize="small" />
                <Typography variant="body1" color="text.secondary">Difficulty:</Typography>
                <Typography variant="body1" fontWeight="bold">
                  {difficultyOptions.find(opt => opt.value === recipe.difficulty)?.label || "Unknown"}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <TimerOutlinedIcon fontSize="small" />
                <Typography variant="body1" color="text.secondary">Preparation Time:</Typography>
                <Typography variant="body1" fontWeight="bold">{formatPreparationTime(recipe.preparationTime)}</Typography>
              </Box>
              {recipe.allergens && recipe.allergens.length > 0 && (
                <Box display="flex" alignItems="center" gap={1}>
                  <WarningAmberOutlinedIcon fontSize="small" color="error" />
                  <Typography variant="body1" color="error">Allergens:</Typography>
                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {recipe.allergens.map(allergen => {
                    return (
                      <Chip
                        key={allergen.id}
                        label={allergen.name}
                        color="error"
                        variant="outlined"
                        size="small"
                        className={userAllergens?.some(a => a.name === allergen.name) ? "blink" : ""}
                      />);
                    })}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        <CardContent sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 1 }}>
            <Box sx={{ flex: 1 }}>
              <IngredientsSection ingredients={recipe.ingredients} baseServings={recipe.servings} />
            </Box>
            <Box sx={{ flex: 1.36 }}>
              <Typography variant="h5" fontWeight="bold">Preparation</Typography>
              <Divider sx={{ mb: 2, mt: 1 }} />
              {recipe.steps && recipe.steps.length > 0 ? (
                <Box component="ol" sx={{ pl: 3, m: 0, display: "flex", flexDirection: "column", gap: 1 }}>
                  {recipe.steps.slice().sort((a, b) => a.order - b.order).map((step, i) => (
                    <li key={i} style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
                      <Typography variant="body1" sx={{ lineHeight: 1.7 }}>{step.description}</Typography>
                    </li>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary" mb={3}>No steps provided.</Typography>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

      <div ref={reviewSectionRef}>
        <ReviewSection reviews={recipe.reviews} />
      </div>

      <DeleteDialog
        open={isDeleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        item={recipe}
        itemType="recipe"
        deleteAction={deleteRecipe.mutateAsync}
        redirectAfterDelete="/recipes"
      />

       <Dialog open={editOpen} onClose={() => { setEditOpen(false); setFiles([]); }} fullWidth maxWidth="sm">
          <DialogTitle>
            {recipe.imageUrl ? "Change recipe photo" : "Add recipe photo"}
          </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ position: "relative" }}>
            {files[0]?.preview && (
              <IconButton 
                onClick={() => setFiles([])} 
                sx={{ position: "absolute", top: 8, right: 8, zIndex: 1000, bgcolor: "rgba(255,255,255,0.7)", "&:hover": { bgcolor: "rgba(255,255,255,0.9)" } }}>
                <CloseIcon />
              </IconButton>
            )}
            <Box display="flex" gap={4}>
              {!files[0]?.preview && (
                <Box {...getRootProps()} sx={{ border: "dashed 3px #eee", borderColor: isDragActive ? "green" : "#eee", borderRadius: 2, height: 280, width: "100%", textAlign: "center", pt: 4, cursor: "pointer" }}>
                  <input {...getInputProps()} />
                  <CloudUpload sx={{ fontSize: 100, mt:4}} />
                  <Typography>Drop image here</Typography>
                </Box>
              )}
              {files[0]?.preview && (
                <><Cropper
                  src={files[0]?.preview} style={{ height: 300, width: 300 }} initialAspectRatio={1} aspectRatio={1} preview=".img-preview" guides={false} viewMode={1} background={false} ref={cropperRef} /><Box>
                    <div
                      className="img-preview"
                      style={{ width: 300, height: 300, overflow: "hidden" }} />
                  </Box></>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setEditOpen(false); setFiles([]); }}>Cancel</Button>
          <Button variant="contained" color="success" onClick={onCrop} disabled={!files[0] || uploadRecipePhoto.isPending} startIcon={<Upload />}>
            {uploadRecipePhoto.isPending ? <CircularProgress color="inherit" size={24} /> : "Add Photo"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}