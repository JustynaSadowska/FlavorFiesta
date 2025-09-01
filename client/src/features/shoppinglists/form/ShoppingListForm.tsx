import { useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, Box, TextField, Button, IconButton, Stack, Typography, Autocomplete, CircularProgress } from "@mui/material";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';
import { useShoppingLists } from "../../../lib/hooks/useShoppingLists";
import { shoppingListsSchema, ShoppingListsSchema } from "../../../lib/schemas/shoppingListsSchema";
import { useRecipes } from "../../../lib/hooks/useRecipes";
import TextInput from "../../../app/shared/components/TextInput";
type Props = {
  shoppingListId?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function ShoppingListForm({ shoppingListId, open, setOpen }: Props) {
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
        reset({
            title: shoppingList.title,
            shoppingListItems: shoppingList.shoppingListItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
            unit: item.unit,
            })),
        });
        } else {
        reset({
            title: "",
            shoppingListItems: [
            {
                name: "",
                quantity: 0,
                unit: { id: "", displayName: "" },
            },
            ],
        });
        }
    }
    }, [open, shoppingList, reset]);


    const onSubmit = (data: ShoppingListsSchema) => {
        const dto: CreateUpdateShoppingList = { 
            id: shoppingList ? shoppingList.id : undefined,
            title: data.title,
            shoppingListItems: data.shoppingListItems.map(x => ({ name: x.name, quantity: x.quantity , unitId: x.unit.id})),
            }
        try {
            if (shoppingList) {
                updateShoppingList.mutate(dto, {
                    onSuccess: () => setOpen(false),
                });
            } else {
                createShoppingList.mutate(dto, {
                onSuccess: () => setOpen(false),
                });
            }
            } catch (error) {
            console.log(error);
            }

    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
            {shoppingListId ? "Edit Shopping List" : "Create Shopping List"}
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
                <Typography variant="subtitle1" fontWeight="bold" mt={2}>Items</Typography>
                <Stack spacing={1}>
                {fields.map((field, index) => (
                    <Box key={field.id} display="flex" gap={1} alignItems="center">
                        <TextInput
                            control={control}
                            name={`shoppingListItems.${index}.name`}
                            label="Name"
                            fullWidth
                            size="small"
                            sx={{minWidth:130}}
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
                            sx={{ minWidth: 120 }}
                            />
                        )}
                        />
                    <IconButton color="error" onClick={() => remove(index)}>
                    <DeleteOutlinedIcon />
                    </IconButton>
                </Box>
            ))}

                <Button startIcon={<AddIcon />} onClick={() => append({ name: "", quantity: 1, unit: { id: "", displayName: "" } })}>
                    Add Item
                </Button>
                </Stack>

                <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                <Button onClick={() => setOpen(false)} color="inherit">Cancel</Button>
                <Button type="submit" variant="contained" color="success" disabled={!isDirty || !isValid}>
                    Save
                </Button>
                </Box>
            </Box>
            )}
        </DialogContent>
        </Dialog>
        
    );
}
