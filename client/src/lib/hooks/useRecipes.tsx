import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useRecipes = () => {
    const queryClient = useQueryClient();

    const {data: recipes, isPending} = useQuery({
        queryKey: ['recipes'],
        queryFn: async () => {
          const response = await agent.get<Recipe[]>('/recipes');
          return response.data;
        }
      });   

      const updateRecipe = useMutation({
        mutationFn: async(recipe: Recipe) => {
            await agent.put('/recipes', recipe)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['recipes']
            })
        }
      });

        const createRecipe = useMutation({
        mutationFn: async(recipe: Recipe) => {
            await agent.post('/recipes', recipe)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['recipes']
            })
        }
      });

      const deleteRecipe = useMutation({
        mutationFn: async(id: string) => {
            await agent.delete(`/recipes/${id}`)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['recipes']
            })
        }
      });

      return {
        recipes,
        isPending,
        updateRecipe,
        createRecipe,
        deleteRecipe
      }
}