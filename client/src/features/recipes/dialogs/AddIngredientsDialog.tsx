import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import { useState } from "react";
import { useShoppingLists } from "../../../lib/hooks/useShoppingLists";
import ShoppingListForm from "../../shoppinglists/form/ShoppingListForm";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  ingredients: Ingredient[];
};

export default function AddIngredientsDialog({ open, setOpen, ingredients }: Props) {
  const { shoppingLists, isLoading, addIngredientsToList } = useShoppingLists();
  const [isFormOpen, setFormOpen] = useState(false);

  const handleSelectList = (listId: string) => {
    const mappedIngredients: CreateUpdateIngredient[] = ingredients.map((ing) => ({
      name: ing.name,
      quantity: ing.quantity,
      unitId: ing.unit.id,
    }));

    addIngredientsToList.mutate(
      { listId, ingredients: mappedIngredients },
      { onSuccess: () => setOpen(false) }
    );
  };

  const initialCreateListValues: CreateShoppingList = {
    title: "",
    shoppingListItems: ingredients.map((ing, index) => ({
      name: ing.name,
      quantity: ing.quantity,
      unitId: ing.unit.id,
      order: index + 1,
    })),
  };

  const sortedLists = [...shoppingLists].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );


  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Select Shopping List</DialogTitle>
        <DialogContent dividers>
          {isLoading ? (
            <Box display="flex" justifyContent="center" mt={2}>
              <CircularProgress />
            </Box>
          ) : sortedLists && sortedLists.length > 0 ? (
            <Box display="flex" flexDirection="column" gap={2} >
              {sortedLists.map((list) => (
                <Box
                  key={list.id}
                  onClick={() => handleSelectList(list.id)}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: "1px solid #ddd",
                    cursor: "pointer",
                    backgroundColor: "#fff",
                    transition: "all 0.2s",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {list.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {list.shoppingListItems?.length ?? 0} items
                  </Typography>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography align="center" color="text.secondary" mt={2}>
              No shopping lists found.
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "space-between", mt: 2, mb: 1 }}>
          <Button onClick={() => setOpen(false)} color="inherit" sx={{ml:2}}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setOpen(false);
              setFormOpen(true);
            }}
            sx={{mr:2}}
          >
            + Create new list
          </Button>
        </DialogActions>
      </Dialog>

      {isFormOpen && (
        <ShoppingListForm
          open={isFormOpen}
          setOpen={setFormOpen}
          initialValues={initialCreateListValues}
        />
      )}
    </>
  );
}
