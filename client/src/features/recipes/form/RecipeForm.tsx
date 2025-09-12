import {
  Alert,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRecipes } from "../../../lib/hooks/useRecipes";
import { useNavigate, useParams } from "react-router";
import { useAllergens } from "../../../lib/hooks/useAllergens";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { recipeSchema, RecipeSchema } from "../../../lib/schemas/recipesSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { difficultyOptions } from "../../../lib/util/constants";
import TextInput from "../../../app/shared/components/TextInput";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDropzone } from "react-dropzone";
import Cropper, { ReactCropperElement } from "react-cropper";
import { CloudUpload, Close as CloseIcon } from "@mui/icons-material";
import { useRef, useState, useCallback, useEffect } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function RecipeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateRecipe, createRecipe, recipe, isLoadingRecipe, tags, units, uploadRecipePhoto } = useRecipes(id);
  const { allergens } = useAllergens();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid, isDirty },
  } = useForm<RecipeSchema>({
    mode: "onTouched",
    resolver: zodResolver(recipeSchema),
    defaultValues: {
    ingredients: [
      {
        name: '',
        quantity: 0,
        unit: { displayName: '', id: '' },
      },
    ],
    steps: [
      {
        description: '',
      },
    ],
    difficulty: 1,  
    servings: 1,
    isVisible: false,
    description: '',
  },
});

  const servingsOptions = [1, 2, 3, 4, 5, 6, 12].map((num) => ({ label: num.toString(), value: num }));

  const { fields: stepFields, append: appendStep, remove: removeStep } = useFieldArray({
    control,
    name: "steps",
  });

  const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
    control,
    name: "ingredients",
  });

  useEffect(() => {
    if (recipe) {
      const sortedSteps = [...recipe.steps].sort((a, b) => a.order - b.order);
      const sortedIngredients = [...recipe.ingredients].sort((a, b) => a.order - b.order);
      reset({ ...recipe, steps: sortedSteps, ingredients: sortedIngredients });
    }
  }, [recipe, reset]);

  const [files, setFiles] = useState<(File & { preview: string })[]>([]);
  const cropperRef = useRef<ReactCropperElement>(null);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: useCallback((acceptedFiles: File[]) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file as Blob) })
        )
      );
    }, []),
  });

  const onSubmit = async (data: RecipeSchema) => {
        const dto: CreateUpdateRecipe = { 
          id: recipe ? recipe.id : undefined,
          title: data.title,
          servings: data.servings,
          preparationTime: data.preparationTime,
          difficulty: data.difficulty,
          isVisible: data.isVisible,
          steps: data.steps.map((step, index) => ({
              ...step,
              order: index + 1,
            })),
          ingredients: data.ingredients.map((ingredient, index) => ({
                name: ingredient.name,
                quantity: ingredient.quantity,
                unitId: ingredient.unit.id,
                order: index + 1,   
              })),
          tagsIds: data.tags.map(x => x.id),
          allergensIds: data.allergens?.map(x => x.id),
          description: data?.description,
        }

    if (recipe) {
      updateRecipe.mutate(dto, { onSuccess: () => navigate(`/recipes/${recipe.id}`) });
    } else {
      createRecipe.mutate(dto, {
        onSuccess: async (newId) => {
          if (files[0]) {
            const cropper = cropperRef.current?.cropper;
            cropper?.getCroppedCanvas().toBlob(async (blob) => {
              if (blob) {
                try {
                  await uploadRecipePhoto.mutateAsync({ file: blob, recipeId: newId });
                } catch {
                  <Alert severity="error">Failed to upload photo</Alert>
                }
              }
              navigate(`/recipes/${newId}`);
            });
          } else {
            navigate(`/recipes/${newId}`);
          }
        },
      });
    }
  };

  if (isLoadingRecipe)
    return (
      <Box display="flex" justifyContent="center" mt={2}>
        <CircularProgress />
      </Box>
    );

  return (
    <Paper sx={{ borderRadius: 3, padding: 3, maxWidth: 1300, margin: "auto" }}>
      <Typography variant="h3" gutterBottom color="#EAC1B1">
        {recipe ? "Edit Recipe" : "Create Recipe"}
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={3}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          <TextInput label="Title" control={control} name="title" sx={{ maxWidth: 400 }} />
          <Box display="flex" gap={3} justifyContent="flex-end" alignItems="flex-end">
            <TextInput
              label="Preparation time"
              control={control}
              name="preparationTime"
              type="number"
              sx={{ width: 200 }}
              onWheel={(e) => (e.target as HTMLElement).blur()}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">min</InputAdornment> } }}
            />
            <Controller
              control={control}
              name="servings"
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  options={servingsOptions}
                  getOptionLabel={(opt) => opt.label}
                  value={servingsOptions.find((o) => o.value === value)}
                  onChange={(_, data) => onChange(data?.value || "")}
                  renderInput={(params) => <TextField {...params} label="Servings" error={!!errors.servings} helperText={errors.servings?.message} />}
                  sx={{ width: 200 }}
                  disableClearable
                />
              )}
            />
            <Controller
              control={control}
              name="difficulty"
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  options={difficultyOptions}
                  getOptionLabel={(opt) => opt.label}
                  value={difficultyOptions.find((o) => o.value === value) || null}
                  onChange={(_, data) => onChange(data?.value || "")}
                  renderInput={(params) => <TextField {...params} label="Difficulty" error={!!errors.difficulty} helperText={errors.difficulty?.message} />}
                  sx={{ width: 200 }}
                />
              )}
            />
            <Controller
              control={control}
              name="isVisible"
              render={({ field }) => (
                <Box display="flex" alignItems="center" mb={1}>
                  <Switch {...field} checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
                  <IconButton onClick={() => field.onChange(!field.value)}>
                    {field.value ? <VisibilityIcon color="action" /> : <VisibilityOffIcon color="disabled" />}
                  </IconButton>
                </Box>
              )}
            />
          </Box>
          <TextInput label='Description' control = {control} name='description'  sx={{maxWidth: 1200}} multiline rows={2} />
        </Box> 

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          <Stack spacing={3} sx={{ width: 610 }}>
            <Controller
              control={control}
              name="tags"
              defaultValue={recipe?.tags}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  multiple
                  options={tags}
                  limitTags={3}
                  getOptionLabel={(opt) => opt.name}
                  filterSelectedOptions
                  isOptionEqualToValue={(opt, val) => opt.id === val.id}
                  value={value}
                  onChange={(_, data) => onChange(data)}
                  renderInput={(params) => <TextField {...params} label="Tags" error={!!errors.tags} helperText={errors.tags?.message} />}
                />
              )}
            />
          </Stack>
          <Stack spacing={3} sx={{ width: 610 }}>
            <Controller
              control={control}
              name="allergens"
              defaultValue={recipe?.allergens}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  multiple
                  options={allergens}
                  limitTags={4}
                  getOptionLabel={(opt) => opt.name}
                  filterSelectedOptions
                  isOptionEqualToValue={(opt, val) => opt.id === val.id}
                  value={value}
                  onChange={(_, data) => onChange(data)}
                  renderInput={(params) => <TextField {...params} label="Allergens (optional)" />}
                />
              )}
            />
          </Stack>
        </Box>

        <Divider sx={{ mt: 3 }} />

<Box display="flex" gap={4} flexWrap="wrap" mt={3}>
            <Stack spacing={3} sx={{ flex: 1, minWidth: 300 }}>
              <Typography variant="h6">Ingredients</Typography>
              {ingredientFields.map((field, index) => (
                <Box key={field.id} display="flex" gap={2} alignItems="center">
                  <TextInput
                    control={control}
                    name={`ingredients.${index}.name`}
                    label="Name"
                    fullWidth
                    sx={{minWidth:150}}
                  />
                  <TextInput
                    control={control}
                    name={`ingredients.${index}.quantity`}
                    label="Quantity"
                    onWheel={(e) => (e.target as HTMLElement).blur()}
                    type="number"
                    sx={{ minWidth: 100, maxWidth:100 }}
                  />
                  <Controller
                    control={control}
                    name={`ingredients.${index}.unit`}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        options={units}
                        getOptionLabel={(option) => option?.displayName || ""}
                        filterSelectedOptions
                        isOptionEqualToValue={(option, value) => option.id === value?.id}
                        value={value}
                        onChange={(_, data) => onChange(data)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Units"
                            error={!!errors.ingredients?.[index]?.unit}
                            helperText={errors.ingredients?.[index]?.unit?.message}
                          />
                        )}
                        sx={{ minWidth: 120 }}
                      />
                    )}
                  />
                  <IconButton
                    aria-label="remove ingredient"
                    onClick={() => removeIngredient(index)}
                    color="error"
                  >
                    <DeleteOutlinedIcon sx={{ml:-2}}/>
                  </IconButton>
                </Box>
              ))}
            <Button
              onClick={() =>
                appendIngredient({
                  name: "",
                  quantity: 0,
                  unit: {
                    displayName: "",
                    id: "",
                  },
                })
              }
            >
              Add Ingredient
            </Button>
          </Stack>

          <Stack spacing={3} sx={{ flex: 1, minWidth: 300 }}>
            <Typography variant="h6">Steps</Typography>
            {stepFields.map((field, index) => (
              <Box key={field.id} display="flex" gap={2} alignItems="center">
                <TextField
                  {...register(`steps.${index}.description`)}
                  label={`Step ${index + 1}`}
                  fullWidth
                  multiline           
                  minRows={1}       
                  maxRows={6}  
                  error={!!errors.steps}
                  helperText={errors.steps?.message}
                />
                <IconButton
                  aria-label="remove step"
                  onClick={() => {
                    removeStep(index);
                  }}
                  color="error"
                >
                  <DeleteOutlinedIcon sx={{ml:-2}}/>
                </IconButton>
              </Box>
            ))}
            <Button onClick={() => appendStep({ description: "" })}>Add Step</Button>
          </Stack>
        </Box>

        {!recipe && (
          <Box sx={{ mt: 4, p: 3}}>
            <Box display="flex">
            <Typography variant="h6"  mb={2}>
              Recipe Photo
            </Typography>
            <Tooltip title="You can add or change the photo later. A default image will be used for now." arrow sx={{mt:1, ml:1}}>
        <InfoOutlinedIcon color="action" fontSize="small" />
      </Tooltip>

            </Box>

            {!files[0]?.preview && (
              <Box
                {...getRootProps()}
                sx={{
                  border: "dashed 3px #eee",
                  borderRadius: "5px",
                  textAlign: "center",
                  height: 300,
                  width: "100%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <input {...getInputProps()} />
                <CloudUpload sx={{ fontSize: 80, mb: 1 }} />
                <Typography variant="h6">Drop image here</Typography>
              </Box>
            )}

            {files[0]?.preview && (
              <Box display="flex" justifyContent="center" gap={4}>
                <Cropper
                  src={files[0].preview}
                  style={{ height: 300, width: 300 }}
                  initialAspectRatio={1}
                  aspectRatio={1}
                  preview=".img-preview"
                  guides={false}
                  viewMode={1}
                  background={false}
                  ref={cropperRef}
                />
                <Box sx={{ position: "relative" }}>
                  <div className="img-preview" style={{ width: 300, height: 300, overflow: "hidden" }} />
                  <IconButton onClick={() => setFiles([])} sx={{ position: "absolute", top: 8, right: 8, zIndex: 1000, backgroundColor: "rgba(255,255,255,0.7)", "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" } }}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
            )}
          </Box>
        )}

        <Box display="flex" justifyContent="end" gap={3}>
          <Button onClick={() => navigate(recipe ? `/recipes/${id}` : "/recipes")} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            color="success"
            variant="contained"
            disabled={updateRecipe.isPending || createRecipe.isPending || !isDirty || !isValid}
          >
            {(updateRecipe.isPending || createRecipe.isPending) ? (
              <CircularProgress color="inherit" size={24}/>
            ) : (
              "Submit"
            )}
          </Button>

        </Box>
      </Box>
    </Paper>
  );
}
