import { useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, Box, TextField, Button, IconButton, Stack, Typography, Autocomplete, CircularProgress, Checkbox } from "@mui/material";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';
import { useShoppingLists } from "../../../lib/hooks/useShoppingLists";
import { shoppingListsSchema, ShoppingListsSchema } from "../../../lib/schemas/shoppingListsSchema";
import { useRecipes } from "../../../lib/hooks/useRecipes";
import TextInput from "../../../app/shared/components/TextInput";
import { Upload } from "@mui/icons-material";
type Props = {
  shoppingListId?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValues?: CreateShoppingList;
};

export default function ShoppingListForm({ shoppingListId, open, setOpen, initialValues}: Props) {
    const { shoppingList, isLoadingShoppingList, updateShoppingList, createShoppingList } = useShoppingLists(shoppingListId);
    const {units} = useRecipes();  
    const { control, handleSubmit, reset, formState: { errors, isDirty, isValid } } = useForm<ShoppingListsSchema>({
        resolver: zodResolver(shoppingListsSchema),
        mode: "onTouched",
        defaultValues: {
        title: "",
        shoppingListItems: [
        {
            name: '',
            quantity: 0,
            unit: { displayName: '', id: '' },
            isChecked: false
        },
        ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "shoppingListItems",
    });

    useEffect(() => {
    if (open) {
      if (shoppingList) {
        const sortedItems = [...shoppingList.shoppingListItems].sort((a, b) => a.order - b.order);
        reset({
          title: shoppingList.title,
          shoppingListItems: sortedItems.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            unit: item.unit,
            isChecked: item.isChecked,
          })),
        });
        } else if (initialValues) {
            reset({
                title: initialValues.title ?? "",
                shoppingListItems: initialValues.shoppingListItems.map((i) => {
                const fullUnit = units.find((u) => u.id === i.unitId) || { id: i.unitId, displayName: "" };
                return {
                    name: i.name,
                    quantity: i.quantity,
                    unit: fullUnit,
                    isChecked: false,
                };
                }),
            });
        } else {
            reset({
            title: "",
            shoppingListItems: [
                { name: "", quantity: 0, unit: { id: "", displayName: "" }, isChecked: false },
            ],
            });
      }
    }
  }, [open, shoppingList, reset, initialValues, units]);


    const onSubmit = (data: ShoppingListsSchema) => {
        if(shoppingList)
        {
            const dto: UpdateShoppingList = { 
            id: shoppingList.id,
            title: data.title,
            shoppingListItems: data.shoppingListItems.map((item, index) => ({
                name: item.name,
                quantity: item.quantity,
                unitId: item.unit.id,
                isChecked: item.isChecked || false,
                order: index + 1, 
                })),
            };
            updateShoppingList.mutate(dto, {
                onSuccess: () => setOpen(false),
            });
        }
        else
        {
        const dto: CreateShoppingList = { 
            title: data.title,
            shoppingListItems: data.shoppingListItems.map((item, index) => ({
                name: item.name,
                quantity: item.quantity,
                unitId: item.unit.id,
                order: index + 1,   
              })),

            }
            createShoppingList.mutate(dto, {
                onSuccess: () => setOpen(false),
                });
        }

    };
    const isEdit = !!shoppingListId;
    return (
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
            {isEdit ? "Edit Shopping List" : "Create Shopping List"}
        </DialogTitle>
        <DialogContent dividers>
            {isLoadingShoppingList ? (
                <Box display="flex" justifyContent="center" mt={2}>
                <CircularProgress />
                </Box>        
            ) : (
            <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={2}>
                <Controller
                name="title"
                control={control}
                render={({ field }) => (
                    <TextField
                    {...field}
                    label="Shopping List Title"
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    />
                )}
                />
                <Typography variant="subtitle1" fontWeight="bold"  mt={2}>Items</Typography>
                <Stack spacing={1}>
                {fields.map((field, index) => (
                    <Box key={field.id} display="flex" gap={1} alignItems="center">
                        {isEdit && (
                            <Controller
                                control={control}
                                name={`shoppingListItems.${index}.isChecked`}
                                render={({ field }) => (
                                    <Checkbox  sx={{ml:-1}} {...field} checked={!!field.value} size="small" />
                                )}
                            />
                        )}
                        <TextInput
                            control={control}
                            name={`shoppingListItems.${index}.name`}
                            label="Name"
                            fullWidth
                            size="small"
                            sx={{minWidth:140}}
                        />
                        <TextInput
                            control={control}
                            name={`shoppingListItems.${index}.quantity`}
                            label="Quantity"
                            onWheel={(e) => (e.target as HTMLElement).blur()}
                            size="small"
                            type="number"
                            sx={{ minWidth: 100, maxWidth:100 }}
                        />
        
                        <Controller
                        control={control}
                        name={`shoppingListItems.${index}.unit`}
                        render={({ field: { onChange, value } }) => (
                            <Autocomplete
                            options={units}
                            getOptionLabel={(option) => option?.displayName || ""}
                            filterSelectedOptions
                            isOptionEqualToValue={(option, value) => option.id === value?.id}
                            value={value}
                            onChange={(_, data) => onChange(data)}
                            renderInput={(params) => (
                                <TextField
                                {...params}
                                label="Units"
                                    size="small"
                                    sx={{ width: 120 }}
                                error={!!errors.shoppingListItems?.[index]?.unit}
                                helperText={errors.shoppingListItems?.[index]?.unit?.message}
                                />
                            )}
                            sx={{ minWidth: 100 }}
                            />
                        )}
                        />
                       
                    <IconButton sx={{ml:1}} color="error" onClick={() => remove(index)}>
                    <DeleteOutlinedIcon />
                    </IconButton>
                </Box>
            ))}

                <Button startIcon={<AddIcon />} onClick={() => append({ name: "", quantity: 0, unit: { id: "", displayName: "" } })}>
                    Add Item
                </Button>
                </Stack>

                <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                <Button onClick={() => setOpen(false)} color="inherit">Cancel</Button>
                <Button type="submit" variant="contained" color="success" disabled={!isDirty || !isValid} loading={updateShoppingList.isPending || createShoppingList.isPending} loadingPosition="start" startIcon={<Upload />}>
                    Submit
                </Button>
                </Box>
            </Box>
            )}
        </DialogContent>
        </Dialog>
        
    );
}
