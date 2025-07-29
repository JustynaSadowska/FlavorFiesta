import { Autocomplete, Box, Button, IconButton, InputAdornment, Paper, Stack, Switch, TextField, Typography } from "@mui/material";
import { useRecipes } from "../../../lib/hooks/useRecipes";
import { useNavigate, useParams } from "react-router";
import { useAllergens } from "../../../lib/hooks/useAllergens";
import { useForm,  useFieldArray, Controller} from "react-hook-form";
import { useEffect } from "react";
import { recipeSchema, RecipeSchema } from "../../../lib/schemas/recipesSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { difficultyOptions } from "../../../lib/util/constants";
import TextInput from "../../../app/shared/components/TextInput";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


export default function RecipeForm() {
   const {id} = useParams();
   const {updateRecipe, createRecipe, recipe, isLoadingRecipe, tags, units} = useRecipes(id);

  const {register, handleSubmit, reset, control, formState: {errors}} = useForm<RecipeSchema>({
    mode: 'onTouched',
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
  },
});
   const servingsOptions = [1, 2, 3, 4, 5, 6, 12].map(num => ({ label: num.toString(), value: num }));

    const {allergens}  = useAllergens();
    const navigate = useNavigate();

    const { fields: stepFields, append: appendStep, remove: removeStep } = useFieldArray({
      control,
      name: "steps"
    });

    const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
      control,
      name: "ingredients"
    });
      
useEffect(() => {
  if (recipe) {
    const sortedSteps = [...recipe.steps].sort((a, b) => a.order - b.order);
    reset({ ...recipe, steps: sortedSteps });
  }
}, [recipe, reset]);


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
          ingredients: data.ingredients.map(x => ({ name: x.name, quantity: x.quantity , unitId: x.unit.id})),
          tagsIds: data.tags.map(x => x.id),
          allergensIds: data.allergens?.map(x => x.id),
          description: data?.description,
        }
              console.log("przedsubmitem:")
      console.log(dto)

        try {
          if (recipe) {
            updateRecipe.mutate(dto, {
              onSuccess: () => navigate(`/recipes/${recipe.id}`)
            });
          } else {
            createRecipe.mutate(dto, {
              onSuccess: (id) => navigate(`/recipes/${id}`)
            });
          }
        } catch (error) {
          console.log(error);
        }
      };


  if(isLoadingRecipe) return <Typography>Loading...</Typography>
    
  return (
    <Paper sx={{ borderRadius: 3, padding: 3, maxWidth: 1300, margin: "auto"  }}>
      <Typography variant="h3" sx={{fontSize:"bold"}}  gutterBottom color="		#EAC1B1" >
          {recipe ? 'Edit recipe' : ' Create Recipe'}
      </Typography>
      <Box component='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' gap={3}>
        <Box sx={ {display: "flex", flexWrap: "wrap", gap: 3}}>
          <TextInput label='Title' control = {control} name='title' sx={{maxWidth: 400}} />
          <Box display='flex'gap={3} justifyContent="flex-end" alignItems="flex-end" >
            <TextInput
            label="Preparation time"        
            control = {control}
            name="preparationTime"
            type = "number"
            sx={{ width: 200 }}
            onWheel={(e) => (e.target as HTMLElement).blur()}
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="end">min</InputAdornment>,
              },
            }}
          />
          <Controller
            control={control}
            name="servings"
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={servingsOptions}
                getOptionLabel={(option) => option.label}
                value={servingsOptions.find(opt => opt.value === value)}
                onChange={(_, data) => onChange(data?.value || "")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Servings"
                    error={!!errors.servings}
                    helperText={errors.servings?.message}
                  />
                )}
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
                getOptionLabel={(option) => option.label}
                value={difficultyOptions.find(opt => opt.value === value) || null}
                onChange={(_, data) => onChange(data?.value || "")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Difficulty"
                    error={!!errors.difficulty}
                    helperText={errors.difficulty?.message}
                  />
                )}
                sx={{ width: 200 }}
              />
            )}
          />
            <Controller
              name="isVisible"
              control={control}
              render={({ field }) => (
                <Box display="flex" alignItems="center" mb={1}>
                  <Switch
                    {...field}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                  <IconButton onClick={() => field.onChange(!field.value)}>
                    {field.value ? (
                      <VisibilityIcon color="action" />
                    ) : (
                      <VisibilityOffIcon color="disabled" />
                    )}
                  </IconButton>
                </Box>
              )}
            />
          </Box>
          <TextInput label='Description' control = {control} name='description'  sx={{maxWidth: 1200}} multiline rows={2} />
        </Box> 
        <Box sx={ {display: "flex", flexWrap: "wrap", gap: 4}} >
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
                    getOptionLabel={(option) => option.name}
                    filterSelectedOptions
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    value={value}
                    onChange={(_, data) => onChange(data)}
                    renderInput={(params) => (
                      <TextField {...params} label="Tags" error = {!!errors.tags} helperText = {errors.tags?.message} />
                    )}
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
                    getOptionLabel={(option) => option.name}
                    filterSelectedOptions
                    isOptionEqualToValue={(option, value) => option.id === value.id}

                    value={value}
                    onChange={(_, data) => onChange(data)}
                    renderInput={(params) => (
                      <TextField {...params} label="Allergens" />
                    )}
                  />
                )}
              />
            </Stack>
          </Box>      
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
          
          <Box display='flex' justifyContent='end' gap={3}>
            {recipe ? (
                <Button onClick={() => navigate(`/recipes/${id}`)} color='inherit'>Cancel</Button>
            ) : (
                <Button onClick={() => navigate('/recipes')} color='inherit'>Cancel</Button>
            )}
            <Button type="submit" color='success' variant="contained" disabled={updateRecipe.isPending || createRecipe.isPending}>Submit</Button>
          </Box>
      </Box>
   </Paper>
  )
}
