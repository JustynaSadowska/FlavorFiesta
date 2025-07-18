import { Autocomplete, Box, Button,  FormControlLabel, InputAdornment, Paper, Stack, Switch, TextField, Typography } from "@mui/material";
import { useRecipes } from "../../../lib/hooks/useRecipes";
import { useNavigate, useParams } from "react-router";
import { useAllergens } from "../../../lib/hooks/useAllergens";
import { useForm,  useFieldArray, Controller} from "react-hook-form";
import { useEffect } from "react";
import { recipeSchema, RecipeSchema } from "../../../lib/schemas/recipesSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { difficultyOptions } from "../../../lib/util/constants";
import TextInput from "../../../app/shared/components/TextInput";


export default function RecipeForm() {
   const {id} = useParams();
   const {updateRecipe, createRecipe, recipe, isLoadingRecipe, tags, units} = useRecipes(id);

  const {register, handleSubmit, reset, control, formState: {errors}} = useForm<RecipeSchema>({
    mode: 'onTouched',
    resolver: zodResolver(recipeSchema),
  });
   
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
      if (recipe) reset(recipe);
    }, [recipe, reset]);


      const onSubmit = async (data: RecipeSchema) => {
        const dto: CreateUpdateRecipe = { //zmienić na oddzielny interface
          id: recipe ? recipe.id : undefined,
          title: data.title,
          servings: data.servings,
          preparationTime: data.preparationTime,
          difficulty: data.difficulty,
          isVisible: data.isVisible,
          steps: data.steps,
          ingredients: data.ingredients.map(x => ({ name: x.name, quantity: x.quantity , unitId: x.unit.id})),
          tagsIds: data.tags.map(x => x.id),
          allergensIds: data.allergens?.map(x => x.id),
          description: data?.description,
        }

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
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
          {recipe ? 'Edit recipe' : ' Create Recipe'}
      </Typography>
      <Box component='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' gap={3}>
        <TextInput label='Title' control = {control} name='title' />
        <TextInput label='Description' control = {control} name='description'  multiline rows={3} />
        <TextInput
          label="Preparation time"        
          control = {control}
          name="preparationTime"
          type = "number"
          sx={{ width: '25ch' }}
          onWheel={(e) => (e.target as HTMLElement).blur()}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">min</InputAdornment>,
            },
          }}
        />
        <TextInput label='Servings' control = {control} name='servings' type="number"  onWheel={(e) => (e.target as HTMLElement).blur()}/>
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
              sx={{ width: 300 }}
            />
          )}
        />
          <Box>
            <Stack spacing={3}>
              <Typography variant="h6">Steps</Typography>
                {stepFields.map((field, index) => (
                  <Box key={field.id} display="flex" gap={2} alignItems="center">
                    <TextField {...register(`steps.${index}.description`)} label={`Step ${index + 1}`} fullWidth error = {!!errors.steps}      
                      helperText = {errors.steps?.message}/>
                    <Button onClick={() => removeStep(index)} color="error">Remove</Button>
                  </Box>
              ))}
              {/* <Button onClick={() => appendStep({ id: "",description: "" })}>Add Step</Button> */}
              <Button onClick={() => appendStep({ description: "" })}>Add Step</Button>
            </Stack>
            <Stack spacing={3} sx={{ width: 650 }}>
              <Typography variant="h6">Ingredients</Typography>
                {ingredientFields.map((field, index) => (
                  <Box key={field.id} display="flex" gap={2} alignItems="center">
                    <TextInput control={control}
                      name={`ingredients.${index}.name`}
                      label="Name"
                      fullWidth
                    />
                    <TextInput
                      control={control}
                      name={`ingredients.${index}.quantity`}
                      label="Quantity"
                      onWheel={(e) => (e.target as HTMLElement).blur()}
                      type="number"
                      sx={{ width: 350 }}
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
                          sx={{ width: 350 }}
                        />
                        )}
                      />

                    <Button onClick={() => removeIngredient(index)} color="error">
                      Remove
                    </Button>
                  </Box>

                ))}
                <Button
                  onClick={() =>
                    appendIngredient({ name: "", quantity: 0, unit: {
                      displayName: "",
                      id: ""
                    } })
                  }
                >
                  Add Ingredient
                </Button>
            </Stack>
          </Box>
          <FormControlLabel
            control={
              <Switch
                {...register("isVisible")}
                checked={recipe?.isVisible}
                inputProps={{ "aria-label": "Visibility toggle" }}
              />
            }
            label="Visible"
          />
          <Stack spacing={3} sx={{ width: 500 }}>
            <Controller
              control={control}
              name="tags"
              defaultValue={recipe?.tags}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  multiple
                  options={tags}
                  getOptionLabel={(option) => option.name}
                  filterSelectedOptions
                  value={value}
                  onChange={(_, data) => onChange(data)}
                  renderInput={(params) => (
                    <TextField {...params} label="Tags" error = {!!errors.tags} helperText = {errors.tags?.message} />
                  )}
                />
              )}
            />
          </Stack>
          <Stack spacing={3} sx={{ width: 500 }}>
            <Controller
              control={control}
              name="allergens"
              defaultValue={recipe?.allergens}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  multiple
                  options={allergens}
                  getOptionLabel={(option) => option.name}
                  filterSelectedOptions
                  value={value}
                  onChange={(_, data) => onChange(data)}
                  renderInput={(params) => (
                    <TextField {...params} label="Allergens" />
                  )}
                />
              )}
            />
          </Stack>
          
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
