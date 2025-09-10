import {
  Typography,
  CircularProgress,
  Box,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Autocomplete,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { useAllergens } from "../../../lib/hooks/useAllergens";
import { useForm, Controller } from "react-hook-form";


export default function AllergensSection() {
 const { userAllergens, allergens, isLoading, updateUserAllergens } = useAllergens();
  const [editOpen, setEditOpen] = useState(false);

  const { control, handleSubmit, reset, formState: { isValid, isDirty } } = useForm<{ allergens: TagAllergen[] }>({
    defaultValues: { allergens: [] },
    mode: "onChange",
  });

  const handleEditClick = () => {
  reset({ allergens: userAllergens || [] });
  setEditOpen(true);
};


  const onSubmit = (data: { allergens: TagAllergen[] }) => {
    const ids = data.allergens.map(a => a.id!).filter(Boolean);
    updateUserAllergens.mutate(ids, {
      onSuccess: () => setEditOpen(false),
    });
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={2}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 3, borderRadius: 3}}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6"  fontWeight="bold" >Your allergens</Typography>
        <IconButton onClick={handleEditClick}>
          <EditIcon />
        </IconButton>
      </Box>

      {userAllergens.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          You don't have any chosen allergens yet
        </Typography>
      ) : (
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {userAllergens.map((allergen: TagAllergen) => (
            <Chip
              key={allergen.id}
              label={allergen.name}
              color="error"
              variant="outlined"
            />
          ))}
        </Stack>
      )}

      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit allergens</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3} sx={{ width: "100%" }}>
            <Controller
              control={control}
              name="allergens"
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  multiple
                  options={allergens}
                  limitTags={4}
                  getOptionLabel={(option) => option.name}
                  filterSelectedOptions
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  value={value}
                  onChange={(_, data) => onChange(data)}
                  renderInput={(params) => (
                    <TextField {...params} label="Allergens" />
                  )}
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit(onSubmit)}
            disabled={!isDirty || !isValid }
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
