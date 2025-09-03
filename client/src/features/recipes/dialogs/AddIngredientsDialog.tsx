import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CircularProgress,
  Typography,
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
      {
        onSuccess: () => setOpen(false),
      }
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
// console.log("initialCreateListValues")
// console.log(initialCreateListValues)

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Choose Shopping List</DialogTitle>
        <DialogContent dividers>
          {isLoading ? (
            <CircularProgress />
          ) : shoppingLists && shoppingLists.length > 0 ? (
            <List>
              {shoppingLists.map((list) => (
                <ListItem key={list.id} disablePadding>
                  <ListItemButton onClick={() => handleSelectList(list.id)}>
                    <ListItemText primary={list.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No shopping lists found.</Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between" }}>
          <Button onClick={() => setOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setOpen(false);
              setFormOpen(true);
            }}
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
