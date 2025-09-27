import { useState } from "react";
import { 
  Card, CardContent, Typography, List, ListItem, 
  ListItemIcon, ListItemText, Checkbox, Dialog, 
  DialogTitle, DialogContent, IconButton, Box,
  CircularProgress,
  Divider, 
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteDialog from '../../../app/shared/components/DeleteDialog';
import { formatDate } from "../../../lib/util/util";
import { useShoppingLists } from "../../../lib/hooks/useShoppingLists";
import ShoppingListForm from "../form/ShoppingListForm";
import EditIcon from '@mui/icons-material/Edit';
import jsPDF from "jspdf";
import DownloadIcon from '@mui/icons-material/Download';

type Props = { shoppingList: ShoppingList };

export default function ShoppingListCard({ shoppingList }: Props) {
  const [open, setOpen] = useState(false);
  const [isFormOpen, setFormOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { deleteShoppingList, checkedToggle, isLoadingShoppingList } = useShoppingLists(shoppingList.id);

  const handleToggle = (itemId: string) => {
    checkedToggle.mutate({ listId: shoppingList.id, itemId });
  };
 
  const sortedItems = [...shoppingList.shoppingListItems].sort(
    (a, b) => a.order - b.order
  );
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(shoppingList.title, 14, 20);
    let y = 36;
    sortedItems.forEach((item) => {
      doc.text(
        `${item.isChecked ? "(X)" : "( )"} ${item.name} ${item.quantity} ${item.unit.displayName}`,
        14,
        y
      );
      y += 8;
      if (y > 280) { 
        doc.addPage();
        y = 20;
      }
    });

    doc.save(`${shoppingList.title}.pdf`);
  };
  return (
    <>
      <Card elevation={4} sx={{ borderRadius: 3, width: 292, height:300, "&:hover": { transform: "scale(1.03)" }, transition: "transform 0.2s" }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Box sx={{ flex: 1, cursor: "pointer" }} onClick={() => setOpen(true)}>
              <Typography variant="h6"  sx={{ px: 1 }}>
                {shoppingList.title}
              </Typography>
            </Box>
             {/* <IconButton onClick={downloadPDF} title="Download PDF">
                <DownloadIcon/>
              </IconButton> */}
              <IconButton onClick={() => setFormOpen(true)} aria-label="edit">
                <EditIcon />
              </IconButton>
            <Box>
              <IconButton aria-label="delete" onClick={() => setDeleteDialogOpen(true)}><DeleteIcon /></IconButton>
            </Box>
          </Box>
          <Divider/>

          <List sx={{ width: "100%", bgcolor: "transparent", p: 1 }}>
            {sortedItems.slice(0, 4).map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={item.isChecked}
                    tabIndex={-1}
                    disableRipple
                    onClick={() => handleToggle(item.id)}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={`${item.name} – ${item.quantity} ${item.unit.displayName}`}
                />
              </ListItem>
            ))}
            {sortedItems.length > 4 && (
              <ListItem disablePadding>
                <ListItemText
                  primary="…"
                  sx={{
                    textAlign: "center",
                    fontSize: "1.5rem",
                    lineHeight: 1,
                    fontStyle: "italic",
                    color: "text.secondary",
                  }}
                />
              </ListItem>
            )}
          </List>
        </CardContent>
      </Card>

      {isFormOpen && (
        <ShoppingListForm
          open={isFormOpen}
          setOpen={setFormOpen}
          shoppingListId={shoppingList.id}
        />
      )}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Box>
            <Typography variant="h6">{shoppingList.title}</Typography>
            <Typography variant="caption" color="text.secondary">
              Created at: {formatDate(shoppingList.createdAt)}
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={downloadPDF} title="Download PDF">
                <DownloadIcon/>
              </IconButton>
            <IconButton onClick={() => setFormOpen(true)} aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => setDeleteDialogOpen(true)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
       </DialogTitle>
        <DialogContent dividers sx={{ maxHeight: 400 }}>
          {isLoadingShoppingList ? (
            <Box display="flex" justifyContent="center" mt={2}>
              <CircularProgress />
            </Box>
          ) : (
            <List>
              {sortedItems.map((item) => (
                <ListItem key={item.id} disablePadding>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={item.isChecked}
                      tabIndex={-1}
                      disableRipple
                      onClick={() => handleToggle(item.id)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={`${item.name} – ${item.quantity} ${item.unit.displayName}`} />
                </ListItem>
              ))}
            </List>
          )}
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
