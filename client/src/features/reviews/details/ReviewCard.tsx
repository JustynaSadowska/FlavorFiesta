import {
  Avatar,
  Box,
  Card,
  CardContent,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { formatDate } from "../../../lib/util/util";

type Props = {
  review: Review;
};

export default function ReviewCard({ review }: Props) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 3, boxShadow: 1 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" mb={1} >
            <Stack direction="row" alignItems="center" spacing={2} mb={1}>
                <Avatar alt={review.reviewAuthor.firstName} sx={{ width: 40, height: 40 }} />
                <Box>
                    <Typography fontWeight="bold">
                    {review.reviewAuthor.firstName} {review.reviewAuthor.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {formatDate(review.createdAt)}
                    </Typography>
                </Box>
            </Stack>
            <Box pr={1} mt={-2}>
                {review.isReviewAuthor && (
                <>
                    <IconButton component={Link} to={`/manage/${review.id}`} aria-label="edit">
                    <EditIcon />
                    </IconButton>
                    <IconButton>
                    <DeleteOutlinedIcon />
                    </IconButton>
                </>
                )}
            </Box>
       
        </Box>

        <Rating value={review.rating} precision={0.5} readOnly sx={{ mb: 1}} />
        {review.comment && (
          <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
            {review.comment}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
