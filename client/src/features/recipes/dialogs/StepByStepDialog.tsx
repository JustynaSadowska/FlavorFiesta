import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, IconButton } from "@mui/material";
import { useState } from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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

  const handleFinish = () => {
    setOpen(false);
    setCurrentStepIndex(0);
  };

  const handleCancel = () => {
    setOpen(false);
    setCurrentStepIndex(0);
  };

  const currentStep = steps[currentStepIndex];

  return (
    <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="sm">
      <DialogTitle>Step {currentStepIndex + 1} of {steps.length}</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" alignItems="center" justifyContent="center" gap={2} position="relative">
          {currentStepIndex > 0 && (
            <IconButton 
              onClick={handleBack} 
              sx={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)" }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
          )}

          <Box
            component="img"
            src={imageUrl || "/images/jedzenie.jpg"}
            alt={`Step ${currentStepIndex + 1}`}
            sx={{ width: "50%", borderRadius: 2, mx: "auto" }}
          />

          {currentStepIndex < steps.length - 1 && (
            <IconButton 
              onClick={handleNext} 
              sx={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)" }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          )}
        </Box>

        <Typography variant="body1" sx={{ mt: 2, textAlign: "center" }}>
          {currentStep.description}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Button onClick={handleCancel} color="error">Cancel</Button>

        {currentStepIndex === steps.length - 1 && (
          <Button color="success" onClick={handleFinish}>
            Finish
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
