import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

type IngredientsSectionProps = {
  ingredients: Ingredient[];
  baseServings: number;   
};

export default function IngredientsSection({
  ingredients,
  baseServings,
}: IngredientsSectionProps) {
  const [selectedServings, setSelectedServings] = useState(baseServings);

  useEffect(() => {
    setSelectedServings(baseServings);
  }, [baseServings]);

  const getScaledQuantity = (quantity: number) => {
    if (!baseServings || baseServings === 0) return quantity;
    return (quantity * selectedServings) / baseServings;
  };

  return (
    <Box mb={5} maxWidth={430} sx={{ border: "1px solid #ccc", borderRadius: 2, p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2} mb={2}>
        <Typography variant="h5" fontWeight="bold">Ingredients</Typography>
        <Box display="flex" gap={2} alignItems="center">
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="servings-select-label">Servings</InputLabel>
            <Select
              labelId="servings-select-label"
              id="servings-select"
              value={selectedServings}
              label="Servings"
              onChange={(e) => setSelectedServings(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5, 6, 12].map((num) => (
                <MenuItem key={num} value={num}>{num}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {ingredients && ingredients.length > 0 ? (
        <Box display="flex" flexDirection="column" gap={1}>
          {ingredients.map((ingredient, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              py={1}
              sx={{ borderBottom: index !== ingredients.length - 1 ? "1px solid rgb(205, 199, 199)" : "none" }}
            >
              <Typography variant="body1">{ingredient.name}</Typography>
              <Typography variant="body1" fontWeight="medium">
                {getScaledQuantity(ingredient.quantity).toFixed(2)} {ingredient.unit.displayName}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography variant="body2" color="text.secondary">No ingredients provided.</Typography>
      )}

      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          variant="outlined"
          startIcon={<AddShoppingCartIcon />}
          sx={{
            borderColor: '#EAC1B1',
            color: 'gray',
            borderRadius: 2,
            px: 3,
            py: 1,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#f6dfd1',
              borderColor: '#e6c5ae',
            },
          }}
        >
          Add ingredients to shopping list
        </Button>
      </Box>    
    </Box>
  );
}
