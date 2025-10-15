import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddIngredientsDialog from "../dialogs/AddIngredientsDialog";
import { useNavigate } from "react-router";
import { useAccount } from "../../../lib/hooks/useAccount";
import {isAdmin } from "../../../lib/util/permissions";
import { toast } from "react-toastify";

type IngredientsSectionProps = {
  ingredients: Ingredient[];
  baseServings: number;   
};

export default function IngredientsSection({
  ingredients,
  baseServings,
}: IngredientsSectionProps) {
  const [selectedServings, setSelectedServings] = useState(baseServings);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogIngredients, setDialogIngredients] = useState<Ingredient[]>([]);
  const { currentUser } = useAccount();
  const navigate = useNavigate();
  const auth= {user: currentUser};

  const getScaledQuantity = (quantity: number) => {
    if (!baseServings || baseServings === 0) return quantity;
    return (quantity * selectedServings) / baseServings;
  };

  const sortedIngredients = [...ingredients].sort((a, b) => a.order - b.order);

  const handleOpenDialog = () => {
     if (!currentUser) {
      toast.warning("You must be logged in to perform this action");
      navigate("/login", { state: { from: location.pathname }});
      return;
    }
    const converted: Ingredient[] = ingredients.map((i, index) => ({
      id: i.id,
      name: i.name,
      quantity: Number(getScaledQuantity(i.quantity).toFixed(2)),
      unit: i.unit,
      order: index + 1
    }));
    setDialogIngredients(converted);
    setDialogOpen(true);
  };

  return (
    <>
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
                {[1,2,3,4,5,6,12].map(num => <MenuItem key={num} value={num}>{num}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>
        </Box>

        {sortedIngredients.map((ingredient, index) => (
          <Box
            key={ingredient.id ?? index}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            py={1}
            sx={{ borderBottom: index !== sortedIngredients.length - 1 ? "1px solid rgb(205, 199, 199)" : "none" }}
          >
            <Typography variant="body1">{ingredient.name}</Typography>
            <Typography variant="body1" fontWeight="medium">
              {getScaledQuantity(ingredient.quantity).toFixed(2)} {ingredient.unit.displayName}
            </Typography>
          </Box>
        ))}
        { !isAdmin(auth) && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="outlined"
            startIcon={<AddShoppingCartIcon />}
            onClick={handleOpenDialog} 
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
  )
  }
        
      </Box>

      <AddIngredientsDialog
        open={isDialogOpen}
        setOpen={setDialogOpen}
        ingredients={dialogIngredients} 
      />
    </>
  );
}
