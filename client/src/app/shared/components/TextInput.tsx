import { TextField, TextFieldProps } from "@mui/material";
import { FieldValues, useController, UseControllerProps } from "react-hook-form"

type Props<T extends FieldValues> = {} & UseControllerProps<T> & TextFieldProps

export default function TextInput<T extends FieldValues>(props: Props<T>) {
    const {field, fieldState} = useController({...props});
    const isNumber = props.type === "number";

    return (
        <TextField 
            {...props}
            {...field}
            value={field.value || ''}
            fullWidth
            onChange={(e) => {
                const value = isNumber ? Number(e.target.value) : e.target.value;
                field.onChange(value);
            }}
            variant="outlined"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
        />    
    )
}