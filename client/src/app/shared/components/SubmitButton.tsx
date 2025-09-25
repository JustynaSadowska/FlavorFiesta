// SubmitButton.tsx
import { Button } from "@mui/material";
import { Upload } from "@mui/icons-material";

type Props = {
  onClick: () => void;
  loading: boolean;
  disabled: boolean;
};

export default function SubmitButton({ onClick, loading, disabled }: Props) {
  return (
    <Button
      variant="contained"
      color="success"
      onClick={onClick}
      disabled={disabled || loading}
      loading = {loading}
      startIcon={<Upload /> }
    >
      Sumbit
    </Button>
  );
}
