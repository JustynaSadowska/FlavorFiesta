import { useMutation, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useReviews = () => {
  const queryClient = useQueryClient();

  const createReview = useMutation({
    mutationFn: async (review: CreateUpdateReview) => {
      const response = await agent.post("/reviews", review);
      console.log(response.data);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["recipes"],
      });
    },
  });

  const deleteReview = useMutation({
    mutationFn: async (id: string) => {
      await agent.delete(`/reviews/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["recipes"],
      });
    },
  });

  const updateReview = useMutation({
    mutationFn: async (review: CreateUpdateReview) => {
      await agent.put(`/reviews/${review.id}`, review);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["recipes"],
      });
    },
  });

  return {
    createReview,
    deleteReview,
    updateReview,
  };
};
