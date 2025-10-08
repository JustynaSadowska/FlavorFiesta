import { TextField, TextFieldProps } from "@mui/material";
import { FieldValues, useController, UseControllerProps, useFormContext } from "react-hook-form"

type Props<T extends FieldValues> = {} & UseControllerProps<T> & TextFieldProps

export default function TextInput<T extends FieldValues>({control, ...props}: Props<T>) {
    const formContext = useFormContext<T>();
    const effectiveControl = control || formContext?.control;

    if (!effectiveControl) {
        throw new Error('Text input must be used within a form provider or passed as props')
    }

    const {field, fieldState} = useController({...props, control: effectiveControl});
    const isNumber = props.type === "number";

   return (
        <TextField 
            {...props}
            {...field}
            value={field.value || ''}
            fullWidth
            type={isNumber ? "text" : props.type} 
            inputProps={{
                inputMode: isNumber ? "decimal" : undefined,
                pattern: isNumber ? "[0-9]*[.,]?[0-9]*" : undefined,
                ...(props.inputProps || {}),
            }}
            onChange={(e) => {
                field.onChange(e.target.value);
            }}
            onBlur={(e) => {
                if (isNumber) {
                    const val = e.target.value.replace(",", ".").trim();
                    const parsed = val === "" ? undefined : Number(val);
                    field.onChange(isNaN(parsed as number) ? undefined : parsed);
                }
                field.onBlur();
                }}
            variant="outlined"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
        />
  );
}
