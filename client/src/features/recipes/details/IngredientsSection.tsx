import {
  Box,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

type Ingredient = {
  name: string;
  quantity: number;
  unit: {
    displayName: string;
  };
};

type IngredientsSectionProps = {
  ingredients: Ingredient[];
  baseServings: number;
  selectedServings: number;
  onServingsChange: (value: number) => void;
};

export default function IngredientsSection({
  ingredients,
  baseServings,
  selectedServings,
  onServingsChange,
}: IngredientsSectionProps) {
  const getScaledQuantity = (quantity: number) => {
    if (!baseServings || baseServings === 0) return quantity;
    return (quantity * selectedServings) / baseServings;
  };

  return (
    <Box mb={5} maxWidth={500}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        mb={3}
      >
        <Typography variant="h5" fontWeight="bold">
          Ingredients
        </Typography>

        <Box display="flex" gap={2} alignItems="center">
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="servings-select-label">Servings</InputLabel>
            <Select
              labelId="servings-select-label"
              id="servings-select"
              value={selectedServings}
              label="Servings"
              onChange={(e) => onServingsChange(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5, 6, 12].map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="text"
            color="primary"
            startIcon={<ShoppingCartIcon />}
          >
            Add to Shopping List
          </Button>
        </Box>
      </Box>

      {ingredients && ingredients.length > 0 ? (
        <Box>
          {ingredients.map((ingredient, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              py={1}
              borderBottom="1px solid #eee"
            >
             <Typography variant="body1" display="flex" alignItems="center" gap={1}>
                <Box component="span" sx={{ color: 'black', fontWeight: 'bold' }}>
                    •
                </Box>
                {ingredient.name}
                </Typography>
              <Typography variant="body1" fontWeight="medium">
                {getScaledQuantity(ingredient.quantity).toFixed(2)}{" "}
                {ingredient.unit.displayName}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No ingredients provided.
        </Typography>
      )}
    </Box>
  );
}
