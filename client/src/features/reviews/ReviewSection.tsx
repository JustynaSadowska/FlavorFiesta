import { useState } from "react";
import { Box, Button, Card, CardContent, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import ReviewList from "./details/ReviewList";
import ReviewForm from "./form/ReviewForm";
import { useNavigate, useParams } from "react-router";
import { useRecipes } from "../../lib/hooks/useRecipes";
import AddIcon from '@mui/icons-material/Add';
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import { useAccount } from "../../lib/hooks/useAccount";
import { isAdmin} from "../../lib/util/permissions";
import { toast } from "react-toastify";


type Props = {
  reviews: Review[];
};

export default function ReviewSection({ reviews }: Props) {
  const [open, setOpen] = useState(false);
  const {id} = useParams(); 
  const { recipe } = useRecipes(id);
  const navigate = useNavigate();
  const { currentUser } = useAccount();
  const auth = {user: currentUser}

  return (
    <Card  sx={{ maxWidth: 1200, margin: "auto", borderRadius: 3, my: 4, p: 2}}>
      <CardContent>
        <Stack spacing={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" >
                    <Typography variant="h5" fontWeight="bold">
                    Reviews
                    </Typography>           
                {!recipe?.isAuthor && !isAdmin(auth) && (
                    <Box display="flex" alignItems="center"  >
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            sx={{
                                borderColor: '#EAC1B1',
                                color: 'gray',
                                borderRadius: 2,
                                px: 3,
                                py: 1,
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#f6dfd1',
                                    borderColor: '#e6c5ae',
                                },
                            }}
                            onClick={() => {
                              if (!currentUser) {
                                toast.warning("You must be logged in to perform this action");
                                navigate("/login", { state: { from: location.pathname }}); 
                              } else {
                                setOpen(true); 
                              }
                            }}
                        >
                            Add Review
                        </Button>
                    </Box>
                )}
            </Box>
        
            {reviews.length === 0 ? (
              <Box
                textAlign="center"
                color="text.secondary"
                sx={{ mt: 4, mb: 2 }}
              >
                <RateReviewOutlinedIcon sx={{ fontSize: 64, mb: 1 }} />
                {(recipe?.isAuthor || isAdmin(auth)) ? (
                <Typography variant="subtitle1" fontStyle="italic">
                  No reviews yet.
                </Typography>
                ): (
                  <Typography variant="subtitle1" fontStyle="italic">
                    Be the first one to leave a review!
                  </Typography>
                  )}
              </Box>
            )
           : (
            <ReviewList reviews={reviews} />
          )}
          </Stack>
      </CardContent>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle fontWeight="bold">Add Review</DialogTitle>
        <ReviewForm onClose={() => setOpen(false)} />
      </Dialog>
    </Card>
  );
}
