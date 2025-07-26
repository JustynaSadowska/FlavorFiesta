import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useState } from "react";

interface Props<T extends { id: string }> {
  open: boolean;
  setOpen: (state: boolean) => void;
  item: T;
  itemType: "recipe" | "review";
  deleteAction: (id: string) => Promise<void>;
  redirectAfterDelete?: string;
}

export default function DeleteDialog<T extends { id: string }>({
  open,
  setOpen,
  item,
  itemType,
  deleteAction,
  redirectAfterDelete,
}: Props<T>) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await deleteAction(item.id);
      setOpen(false);
      if (redirectAfterDelete) {
        window.location.href = redirectAfterDelete;
      }
    } catch (error) {
      console.error("Delete failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => setOpen(false);

  const title = `Delete ${itemType.charAt(0).toUpperCase() + itemType.slice(1)}`;

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle sx={{fontWeight: "bold"}}>{title}</DialogTitle>
      <DialogContent>
        <Box>
          <Typography variant="body1" mb={2}>
            Are you sure you want to delete this {itemType}?
          </Typography>
          {itemType === "recipe" && (
            <Typography variant="body2" color="error">
              This will also delete all associated reviews.
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} autoFocus>
          Cancel
        </Button>
        <Button loading={isSubmitting} onClick={handleDelete} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
