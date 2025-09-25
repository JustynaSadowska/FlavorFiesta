import {
  Autocomplete,
  Button,
  Checkbox,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid2,
  Paper,
  Stack,
  TextField,
  Chip,
  //MenuItem,
  //Select,
  //InputLabel,
  //FormControl,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../lib/hooks/useStore";
import { useState } from "react";
import { useRecipes } from "../../../lib/hooks/useRecipes";

// const sortOptions = [
//   { value: "oldest", label: "Oldest" },
//   { value: "newest", label: "Newest" },
//   { value: "rating", label: "Best rated" },
// ];

const RecipeFilters = observer(function RecipeFilters() {
  const {
    recipeStore: {
      setIncludeUserAllergens,
      includeUserAllergens,
      title,
      setTitle,
      setSelectedIngredients,
      selectedIngredients,
      resetFilters,
      selectedTags,
      setSelectedTags,
    },
  } = useStore();
  const{tags} = useRecipes();

  const [fridgeOpen, setFridgeOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [ingredient, setIngredient] = useState("");

  const toggleFridge = () => setFridgeOpen((prev) => !prev);
  const toggleFilters = () => setFiltersOpen((prev) => !prev);

  const addIngredient = () => {
    const trimmed = ingredient.trim();
    if (trimmed.length > 0 && !selectedIngredients.includes(trimmed)) {
      setSelectedIngredients([...selectedIngredients, trimmed]);
      setIngredient("");
    }
  };

  const removeIngredient = (name: string) => {
    setSelectedIngredients(selectedIngredients.filter((i) => i !== name));
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
      <Grid2 container spacing={2} alignItems="center">
        <Grid2 sx ={{xs:12, md:6}}>
          <TextField
            label="Search by recipe name"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid2>

        <Grid2 sx ={{xs:6, md:2}}>
          <Button variant="outlined" fullWidth onClick={toggleFridge}>
            Fridge
          </Button>
        </Grid2>

        <Grid2 sx ={{xs:6, md:2}}>
          <Button variant="outlined" fullWidth onClick={toggleFilters}>
            {filtersOpen ? "Hide filters" : "Show filters"}
          </Button>
        </Grid2>

        <Grid2 sx ={{xs:12, md:2}}>
          <Button variant="outlined" fullWidth onClick={resetFilters}>
            Reset filters
          </Button>
        </Grid2>
      </Grid2>

      <Collapse in={filtersOpen} timeout="auto" unmountOnExit>
        <Stack spacing={3} mt={3}>
          <FormGroup>
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

          {/* <FormControl fullWidth>
            <InputLabel id="sort-label">Sort by</InputLabel>
            <Select
              labelId="sort-label"
              //value={sortBy}
              //onChange={(e) => setSortBy(e.target.value)}
              label="Sort by"
            >
              {sortOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}

          <Autocomplete
            multiple
            options={tags}
            limitTags={3}
            getOptionLabel={(opt) => opt.name}
            filterSelectedOptions
            isOptionEqualToValue={(opt, val) => opt.id === val.id}
            value={tags.filter(t => selectedTags.includes(t.id!))} 
            onChange={(_, data) => setSelectedTags(data.map(d => d.id!))} 
            renderInput={(params) => (
              <TextField {...params} label="Tags" placeholder="Choose tags" />
            )}
          />

        </Stack>
      </Collapse>

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
