import {
  Box,
  Button,
  DialogContent,
  DialogActions,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useReviews } from "../../../lib/hooks/useReviews";
import { useRecipes } from "../../../lib/hooks/useRecipes";
import { ReviewSchema, reviewsSchema } from "../../../lib/schemas/reviewsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router";

type Props = {
  onClose: () => void;
};

export default function ReviewForm({ onClose }: Props) {
    const {id} = useParams(); 
    const { createReview } = useReviews();
    const { recipe } = useRecipes(id);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ReviewSchema>({
        mode: "onTouched",
        resolver: zodResolver(reviewsSchema),
    });

    const onSubmit = async (data: ReviewSchema) => {
        if (!recipe?.id) return;

        try {
        await createReview.mutateAsync({
            ...data,
            recipeId: recipe.id
        });
        reset();
        onClose();
        } catch (error) {
          console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
            <Box mt={2}>
            <Typography variant="subtitle1" gutterBottom>
                Rating
            </Typography>
            <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                <Rating
                    {...field}
                    value={field.value}
                    onChange={(_, value) => field.onChange(value)}
                    size="large"
                />
                )}
            />
            {errors.rating && (
                <Typography color="error" variant="caption">
                {errors.rating.message}
                </Typography>
            )}

            <Controller
                name="comment"
                control={control}
                render={({ field }) => (
                <TextField
                    {...field}
                    fullWidth
                    multiline
                    minRows={3}
                    label="Comment"
                    sx={{ mt: 3 }}
                    error={!!errors.comment}
                    helperText={errors.comment?.message}
                />
                )}
            />
            </Box>
        </DialogContent>

        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={createReview.isPending}
            >
            Submit
            </Button>
        </DialogActions>
        </form>
    );
}
