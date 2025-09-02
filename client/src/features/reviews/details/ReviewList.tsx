import { Stack } from "@mui/material";
import ReviewCard from "./ReviewCard";

type Props = {
  reviews: Review[];
};

export default function ReviewList({ reviews }: Props) {
  if (!reviews || reviews.length === 0) return null;
  const sortedReviews = [...reviews].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );


  return (
    <Stack spacing={2} mt={2}>
      {sortedReviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </Stack>
  );
}
