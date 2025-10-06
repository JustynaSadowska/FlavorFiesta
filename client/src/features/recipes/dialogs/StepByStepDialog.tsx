import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography } from "@mui/material";
import { useState } from "react";

type Step = {
  order: number;
  description: string;
};

type StepByStepDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  steps: Step[];
  imageUrl?: string;
};

export default function StepByStepDialog({ open, setOpen, steps, imageUrl }: StepByStepDialogProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleEnd = () => {
    setOpen(false);
    setCurrentStepIndex(0);
  };

  const currentStep = steps[currentStepIndex];

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle>Step {currentStepIndex + 1} of {steps.length}</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Box
            component="img"
            src={imageUrl || "/images/jedzenie.jpg"}
            alt={`Step ${currentStepIndex + 1}`}
            sx={{ width: "50%", borderRadius: 2 }}
          />
          <Typography variant="body1" sx={{ mt: 2, textAlign: "center" }}>
            {currentStep.description}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "space-between", mt: 2, mb: 1 }}>
         <Button onClick={handleEnd} color="inherit" sx={{ml:2}}>
            Cancel
          </Button>
        <Button onClick={handleBack} disabled={currentStepIndex === 0}>Back</Button>
        {currentStepIndex === steps.length - 1 ? (
          <Button onClick={handleEnd} color="success">Finish</Button>
        ) : (
          <Button onClick={handleNext}>Next</Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
