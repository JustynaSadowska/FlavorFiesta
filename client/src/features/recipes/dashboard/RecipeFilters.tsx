import {
  Autocomplete,
  IconButton,
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
  Tooltip,
  Button,
  MenuItem
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../lib/hooks/useStore";
import { useState } from "react";
import { useRecipes } from "../../../lib/hooks/useRecipes";
import KitchenIcon from '@mui/icons-material/Kitchen';
import TuneIcon from '@mui/icons-material/Tune';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { difficultyFilterOptions } from "../../../lib/util/constants";

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "rating", label: "Best rated" },
];

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
      setSortBy,
      sortBy,
      difficulty,
      setDifficulty
    },
  } = useStore();
  const { tags } = useRecipes();

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
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Grid2 container spacing={2} alignItems="center">
        <Grid2 size={9.5} >
          <TextField
            label="Search by recipe name"
            variant="outlined"
            value={title}
            fullWidth
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid2>

        <Grid2  sx={{ display: "flex", justifyContent: "flex-end", gap: 2, xs:12 ,md:6}}>
          <Tooltip title="Fridge">
            <IconButton onClick={toggleFridge} color="primary">
              <KitchenIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Filters">
            <IconButton onClick={toggleFilters} color={filtersOpen ? "secondary" : "default"}>
              <TuneIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Reset filters">
            <IconButton onClick={resetFilters} color="error">
              <RestartAltIcon />
            </IconButton>
          </Tooltip>
        </Grid2>
      </Grid2>

      <Collapse in={filtersOpen} timeout="auto" unmountOnExit>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} mt={3} alignItems="center">
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

            <TextField
              select
              label="Sort by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              sx={{ minWidth: 150 }}
              variant="outlined"
            >
              {sortOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>
            
            <TextField
              select
              label="Difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(Number(e.target.value))}
              sx={{ minWidth: 150 }}
              variant="outlined"
            >
              {difficultyFilterOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>

          <Autocomplete
            multiple
            options={tags}
            limitTags={3}
            getOptionLabel={(opt) => opt.name}
            filterSelectedOptions
            isOptionEqualToValue={(opt, val) => opt.id === val.id}
            value={tags.filter((t) => selectedTags.includes(t.id!))}
            onChange={(_, data) => setSelectedTags(data.map((d) => d.id!))}
            sx={{ flex: 1, minWidth:150 }}
            renderInput={(params) => (
              <TextField {...params} label="Tags" placeholder="Choose tags" fullWidth />
            )}
          />
        </Stack>
      </Collapse>

      <Dialog open={fridgeOpen} onClose={toggleFridge} fullWidth maxWidth="sm">
        <DialogTitle>What's in your fridge?</DialogTitle>
        <DialogContent>
          <Stack direction="row" spacing={2} my={2}>
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
                sx={{ mb: 1 }}
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
