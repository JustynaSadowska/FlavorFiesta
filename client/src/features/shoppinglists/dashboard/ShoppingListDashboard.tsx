import { useShoppingLists } from '../../../lib/hooks/useShoppingLists';
import ShoppingListCard from './ShoppingListCard';
import { Box, CircularProgress, Grid2, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


export default function ShoppingListDashboard() {
  const { shoppingLists, isLoading } = useShoppingLists();

  if (isLoading) {
      return (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      );
    }
  if (!shoppingLists || shoppingLists.length === 0) {
    return <Box sx={{ textAlign: "center", mt: 5, ml: -6 }}>
              <ShoppingCartIcon sx={{ fontSize: 64, mb: 1, color: "grey.500" }} />
              <Typography variant="subtitle1" fontStyle="italic" color="text.secondary">
                You don’t have any shopping lists yet.
              </Typography>
            </Box>
  }

  const sortedLists = [...shoppingLists].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return (
    <Grid2 container spacing={2}>
      <Grid2 size ={12} offset={{ md: 1,  xs:2,}}>
        <Grid2 container 
            spacing={{ xs: 1, md: 3 }} 
            columns={{ xs: 4, sm: 8, md: 12 }} >
            {sortedLists.map((shoppingList) => (
            <ShoppingListCard key={shoppingList.id} shoppingList={shoppingList} />
            ))}
        </Grid2>
      </Grid2>
    </Grid2>


  );
}
