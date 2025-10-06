import {
  Box,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { formatDate } from "../../../lib/util/util";
import { useReviews } from "../../../lib/hooks/useReviews";
import DeleteDialog from "../../../app/shared/components/DeleteDialog";
import { useState } from "react";
import ReviewForm from "../form/ReviewForm";
import { Link, useParams } from "react-router";
//import ReviewForm from "../form/ReviewForm";
import DeleteIcon from '@mui/icons-material/Delete';
import AvatarPopover from "../../../app/shared/components/AvatarPopover";
import { isAdmin } from "../../../lib/util/permissions";
import { useAccount } from "../../../lib/hooks/useAccount";

type Props = {
  review: Review;
};

export default function ReviewCard({ review }: Props) {
    const {deleteReview} = useReviews();
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const { id: recipeId } = useParams();
    const { currentUser } = useAccount();
    const auth = {user: currentUser}
  return (
    <><Card variant="outlined" sx={{ borderRadius: 3, boxShadow: 1 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" mb={1}>
          <Stack direction="row" alignItems="center" spacing={2} mb={1}>
            <AvatarPopover
              profile={review.reviewAuthor}
              avatarProps={{ sx: { width: 40, height: 40, cursor: "pointer" } }}
              showName={false}
            />
            <Box display="flex" flexDirection="column">
              <Typography
                component={Link}
                to={`/profiles/${review.reviewAuthor.id}`}
                sx={{
                  fontWeight: "bold",
                  textDecoration: "none",
                  color: "inherit",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {review.reviewAuthor.firstName} {review.reviewAuthor.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(review.createdAt)}
              </Typography>
            </Box>
          </Stack>
          <Box pr={1} mt={-2}>
            {review.isReviewAuthor  && (
              <>
                  <IconButton
                   onClick={() => setIsFormOpen(true)}
                  >
                    <EditIcon />
                </IconButton>
                <IconButton 
                  onClick={() => setDeleteDialogOpen(true)}
                  aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </>
            )}
            { isAdmin(auth) && (
                <IconButton 
                  onClick={() => setDeleteDialogOpen(true)}
                  aria-label="delete">
                  <DeleteIcon />
                </IconButton>
            )}
          </Box>

        </Box>

        <Rating value={review.rating} precision={0.5} readOnly sx={{ mb: 1 }} />
        {review.comment && (
          <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
            {review.comment}
          </Typography>
        )}
      </CardContent>
    </Card>
    <DeleteDialog
        open={isDeleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        item={review}
        itemType="review"
        deleteAction={deleteReview.mutateAsync}
        //redirectAfterDelete={`/recipes/${}` }
        />
        
      <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle fontWeight="bold">Edit Review</DialogTitle>
        <ReviewForm
          onClose={() => setIsFormOpen(false)}
          review={{
            id: review.id,
            rating: review.rating,
            comment: review.comment,
            recipeId: recipeId!,
          }}
        />
      </Dialog>
        </>
  );
}
