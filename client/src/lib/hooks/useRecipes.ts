import { keepPreviousData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useAccount } from "./useAccount";
import { useStore } from "./useStore";
export const useRecipes = (id?: string) => {
  const {recipeStore: {title, selectedIngredients, selectedTags, includeUserAllergens}} = useStore();
  const queryClient = useQueryClient();
  const { currentUser } = useAccount();

  const { data: recipesGroup, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage} = useInfiniteQuery<PagedList<Recipe, string>>({
    queryKey: ['recipes', title, selectedIngredients, selectedTags, includeUserAllergens],
    queryFn: async ({pageParam = null}) => {
      const response = await agent.get<PagedList<Recipe,string>>("/recipes", {
        params: {
          cursor: pageParam,
          pageSize: 9,
          title,
          selectedIngredients,
          selectedTags,
          includeUserAllergens
        }
      });
      return response.data;
    },
    staleTime: 1000 * 60 * 5,//dopiero po 5 minutach trzeba bedzie je na nowo załadowywać
    placeholderData: keepPreviousData,
    initialPageParam: null,
    getNextPageParam:(lastPage)=> lastPage.nextCursor,
    enabled: !id,
    select: data => ({
      ...data,
      pages: data.pages.map((page)=> ({
        ...page,
        items: page.items.map(recipe => {
          return {
          ...recipe,
          isAuthor: currentUser?.id === recipe.userId
        }
        })
      }))
    }),
  });

  const { data: recipe, isLoading: isLoadingRecipe } = useQuery({
    queryKey: ["recipes", id],
    queryFn: async () => {
      const response = await agent.get<Recipe>(`/recipes/${id}`);
      return response.data;
    },
    enabled: !!id && !!currentUser,
    select: (data) => {
      return {
        ...data,
        isAuthor: currentUser?.id === data.userId,
        reviews: data.reviews?.map((review) => ({
        ...review,
        isReviewAuthor: currentUser?.id === review.reviewAuthor.id
      }))
      };
    },
  });

  const updateRecipe = useMutation({
    mutationFn: async (recipe: CreateUpdateRecipe) => {
      await agent.put(`/recipes/${recipe.id}`, recipe);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["recipes"],
      });
    },
  });

  const createRecipe = useMutation({
    mutationFn: async (recipe: CreateUpdateRecipe) => {
      const response = await agent.post("/recipes", recipe);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["recipes"],
      });
    },
  });

  const deleteRecipe = useMutation({
    mutationFn: async (id: string) => {
      await agent.delete(`/recipes/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["recipes"],
      });
    },
  });

  const updateVisibility = useMutation({
    mutationFn: async (id: string) => {
      await agent.post(`/recipes/${id}/visibility`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["recipes", id],
      });
    },
  });

  const { data: tags = [] } = useQuery({
    queryKey: ["tags"],
    queryFn: () =>
      agent.get<TagAllergen[]>("/recipes/tags").then((res) => res.data),
  });

  const { data: units = [] } = useQuery({
    queryKey: ["units"],
    queryFn: () => agent.get<Unit[]>("/recipes/units").then((res) => res.data),
  });

  const addToFavorite = useMutation({
    mutationFn: async (recipeId: string) => {
      await agent.post(`/recipes/${recipeId}/favorites`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["recipes", id] });
      await queryClient.invalidateQueries({ queryKey: ["profile", "favorites"] });
    },
  });

  const removeFromFavorite = useMutation({
    mutationFn: async (recipeId: string) => {
      await agent.delete(`/recipes/${recipeId}/favorites`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["recipes", id] });
      await queryClient.invalidateQueries({ queryKey: ["profile", "favorites"] });
    },
  });

  const uploadRecipePhoto = useMutation({
  mutationFn: async ({ file, recipeId }: { file: Blob; recipeId: string }) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await agent.post(`/recipes/${recipeId}/photo`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data as Photo;
  },
  onSuccess: async (photo: Photo, { recipeId }) => {
    await queryClient.invalidateQueries({ queryKey: ["recipes"] });

    queryClient.setQueryData<Recipe>(["recipes", recipeId], (data) => {
      if (!data) return data;
      return {
        ...data,
        imageUrl: photo.url,
      };
    });
  },
});


  return {
    recipesGroup,
    isLoading,
    isFetchingNextPage, 
    fetchNextPage, 
    hasNextPage,
    updateRecipe,
    createRecipe,
    deleteRecipe,
    recipe,
    isLoadingRecipe,
    updateVisibility,
    tags,
    units,
    addToFavorite,
    removeFromFavorite,
    uploadRecipePhoto
  };
};
