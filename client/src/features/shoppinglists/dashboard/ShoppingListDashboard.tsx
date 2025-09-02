import { useState } from 'react';
import { useShoppingLists } from '../../../lib/hooks/useShoppingLists';
import ShoppingListForm from '../form/ShoppingListForm';
import ShoppingListCard from './ShoppingListCard';
import { Box, CircularProgress, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


export default function ShoppingListDashboard() {
  const { shoppingLists, isLoading } = useShoppingLists();
  const [isFormOpen, setFormOpen] = useState(false);

  if (isLoading) {
      return (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      );
    }
  if (!shoppingLists || shoppingLists.length === 0) {
    return <div>Brak list zakupów.</div>;
  }

  const sortedLists = [...shoppingLists].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return (
    
    // <Grid2 container spacing={3}>
    //   {shoppingLists.map((list:) => (
    //     <Grid2 key={list.id} xs={12} sm={6} md={4}>
    //       <ShoppingListCard title={list.title} items={list.items} />
    //     </Grid2>
    //   ))}
    // </Grid2>
     <Box sx={{display: "flex",
        flexWrap: "wrap",           
        gap: 3,
        justifyContent: "center",
        mt:3,
        mb:5
        }}>
       {sortedLists.map((shoppingList) => (
        <ShoppingListCard key={shoppingList.id} shoppingList={shoppingList} />
        ))}
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Fab
              color="primary"
              aria-label="add"
              onClick={() => setFormOpen(true)}
            >
              <AddIcon />
            </Fab>
        </Box>
        <ShoppingListForm
          open={isFormOpen}
          setOpen={setFormOpen}
        />
    </Box>
  );
}
