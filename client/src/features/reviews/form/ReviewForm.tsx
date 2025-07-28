import {
  Box,
  Button,
  DialogContent,
  DialogActions,
  Rating,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useReviews } from "../../../lib/hooks/useReviews";
import { useRecipes } from "../../../lib/hooks/useRecipes";
import { ReviewSchema, reviewsSchema } from "../../../lib/schemas/reviewsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router";
import { useEffect } from "react";
import TextInput from "../../../app/shared/components/TextInput";

type Props = {
  onClose: () => void;
  review?: CreateUpdateReview;
};

export default function ReviewForm({ onClose, review }: Props) {
    const {id} = useParams(); 
    const { createReview, updateReview } = useReviews();
    const { recipe } = useRecipes(id);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ReviewSchema>({
        mode: "onTouched",
        resolver: zodResolver(reviewsSchema),
        defaultValues: {
            rating: review?.rating ?? 0,
            comment: review?.comment ?? "", 
    },
    });
    
    useEffect(() => {
        if (review) {
        reset(review);
        }
    }, [review, reset]);

    const onSubmit = async (data: ReviewSchema) => {

        const reviewRecipeId = review?.recipeId || recipe?.id;
        if (!reviewRecipeId) return;

        const dto: CreateUpdateReview = {
            id: review ? review.id : undefined,
            comment: data?.comment,
            rating: data.rating,
            recipeId: reviewRecipeId
         } 
        try {
            if (review) {
                updateReview.mutateAsync(dto);
            } else {
                createReview.mutateAsync(dto);
            }
        reset();
        onClose();
        } catch (error) {
          console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx ={{mt:-1}}>
            <Box display="flex" flexDirection="column" gap={0.5} alignItems="flex-start">
                {/* <Typography variant="subtitle1" sx={{ fontWeight: 500 }}  >
                    Rating:
                </Typography> */}
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
                    <Typography color="error" variant="caption" ml={0.5} mb={-2}>
                    {errors.rating.message}
                    </Typography>
                )}

                <TextInput label='Comment (optional)' control = {control} name='comment'  sx={{ mt: 3 }} multiline rows={3} />
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
