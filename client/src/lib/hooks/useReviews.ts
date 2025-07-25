import { useMutation, useQueryClient } from "@tanstack/react-query"
import agent from "../api/agent"

export const useReviews= () => {
    const queryClient = useQueryClient();

    const createReview = useMutation({
        mutationFn: async(review: CreateUpdateReview) => {
            const response = await agent.post("/reviews", review);
            console.log(response.data)
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["reviews"],
            });
        },
    });

    return {
        createReview
    }
}