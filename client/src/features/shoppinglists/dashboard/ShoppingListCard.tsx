import { 
  Card, 
  CardContent, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Checkbox, 
  Dialog, 
  DialogTitle, 
  DialogContent,
  IconButton,
  Box,
  CardActionArea,
  ListItemButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import DeleteDialog from '../../../app/shared/components/DeleteDialog';
import { useShoppingLists } from '../../../lib/hooks/useShoppingLists';
import { formatDate } from '../../../lib/util/util';

type Props = {
  shoppingList: ShoppingList;
};

export default function ShoppingListCard({ shoppingList }: Props) {
  const [checked, setChecked] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const {deleteShoppingList} = useShoppingLists();

  const handleToggle = (id: string) => (event: React.MouseEvent) => {
    event.stopPropagation(); 
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <>
      <Card
        elevation={4}
        sx={{
          borderRadius: 3,
          width: 370,
          transition: "transform 0.2s ease-in-out",
          "&:hover": { transform: "scale(1.03)" },
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <CardActionArea onClick={() => setOpen(true)} sx={{ flex: 1, borderRadius: 1, px: 0 }}>
              <Typography variant="h6" sx={{ px: 1}}>
                {shoppingList.title}
              </Typography>
            </CardActionArea>

            <Box>
              <IconButton aria-label="edit">
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete" onClick={() => setDeleteDialogOpen(true)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>

          <List sx={{ width: '100%', bgcolor: 'transparent' }}>
            {shoppingList.shoppingListItems.slice(0, 4).map((item) => {
              const labelId = `checkbox-list-label-${item.id}`;
              return (
                <ListItem key={item.id} disablePadding>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.includes(item.id)}
                      tabIndex={-1}
                      disableRipple
                      onClick={handleToggle(item.id)}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={`${item.name} – ${item.quantity} ${item.unit.displayName}`}
                  />
                </ListItem>
              );
            })}

            {shoppingList.shoppingListItems.length > 4 && (
              <ListItem disablePadding>
                <ListItemText 
                  primary="…" 
                  sx={{ textAlign: 'center', fontSize: '1.5rem', lineHeight: 1, fontStyle: 'italic', color: 'text.secondary' }} 
                />
              </ListItem>
            )}
          </List>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">{shoppingList.title}</Typography>
            <Typography variant="caption" color="text.secondary">
                created at: {formatDate(shoppingList.createdAt)}
            </Typography>
            </Box>
        </DialogTitle>
        <DialogContent dividers sx={{ maxHeight: 400 }}>
          <List>
            {shoppingList.shoppingListItems.map((item) => {
              const labelId = `dialog-checkbox-list-label-${item.id}`;
              return (
                <ListItem key={item.id} disablePadding>
                  <ListItemButton role={undefined} onClick={handleToggle(item.id)} dense>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.includes(item.id)}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={`${item.name} – ${item.quantity} ${item.unit.displayName}`}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
      </Dialog>

      <DeleteDialog
        open={isDeleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        item={shoppingList}
        itemType="shopping list"
        deleteAction={deleteShoppingList.mutateAsync}
      />
    </>
  );
}
