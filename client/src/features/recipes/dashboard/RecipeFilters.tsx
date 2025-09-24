import { 
  Button, Checkbox, Dialog, DialogActions, DialogContent, 
  DialogTitle, FormControlLabel, FormGroup, Grid2, Paper, 
  TextField, Chip, Stack
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../lib/hooks/useStore";
import { useState } from "react";

const RecipeFilters = observer(function RecipeFilters() {
  const { recipeStore:{ 
    setIncludeUserAllergens, 
    includeUserAllergens, 
    title, 
    setTitle, 
    setSelectedIngredients,
    selectedIngredients,
    resetFilters
  } } = useStore();

  const [fridgeOpen, setFridgeOpen] = useState(false);
  const [ingredient, setIngredient] = useState(""); 

  const toggleFridge = () => setFridgeOpen((prev) => !prev);

  const addIngredient = () => {
    const trimmed = ingredient.trim();
    if (trimmed.length > 0 && !selectedIngredients.includes(trimmed)) {
      setSelectedIngredients([...selectedIngredients, trimmed]);
      setIngredient("");
    }
  };

  const removeIngredient = (name: string) => {
    setSelectedIngredients(selectedIngredients.filter(i => i !== name));
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
      <Grid2 container spacing={2} alignItems="center">
        <Grid2 sx={{xs:10}}>
          <TextField
            label="Search by recipe name"
            variant="outlined"
            fullWidth
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid2>

        <Grid2 sx={{xs:2}}>
          <Button variant="outlined" fullWidth onClick={toggleFridge}>
            Fridge
          </Button>
        </Grid2>
         <Grid2 sx={{xs:2}}>
          <Button variant="outlined" fullWidth onClick={resetFilters}>
            Reset filters
          </Button>
        </Grid2>
      </Grid2>

      <FormGroup sx={{ mt: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={includeUserAllergens}
              onChange={(e) => setIncludeUserAllergens(e.target.checked)}
            />
          }
          label="Include your allergens"
        />
      </FormGroup>

      <Dialog open={fridgeOpen} onClose={toggleFridge} fullWidth maxWidth="sm">
        <DialogTitle>What's in your fridge?</DialogTitle>
        <DialogContent>
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <TextField
              label="Add ingredient"
              fullWidth
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addIngredient()}
            />
            <Button onClick={addIngredient} variant="contained">
              Add
            </Button>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {selectedIngredients.map((i) => (
              <Chip 
                key={i} 
                label={i} 
                onDelete={() => removeIngredient(i)} 
                color="secondary" 
                variant="outlined"
              />
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleFridge}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
});

export default RecipeFilters;
