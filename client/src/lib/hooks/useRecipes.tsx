import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useLocation } from "react-router";
import { useAccount } from "./useAccount";

export const useRecipes = (id?: string) => {
    const queryClient = useQueryClient();
    const {currentUser} = useAccount();
    const location = useLocation();

    const {data: recipes, isLoading} = useQuery({
        queryKey: ['recipes'],
        queryFn: async () => {
          const response = await agent.get<Recipe[]>('/recipes');
          return response.data;
        },
        enabled: !id && location.pathname === '/recipes' && !!currentUser,
        select : data => {
          return data.map(recipe => {
            return {
              ...recipe,
              isAuthor: currentUser?.id === recipe.userId
            }
          })
        }
      });   

      const {data: recipe, isLoading: isLoadingRecipe} = useQuery({
        queryKey: ['recipes', id],
        queryFn: async () => {
          const response = await agent.get<Recipe>(`/recipes/${id}`);
          return response.data;
        },
        enabled: !!id && !!currentUser,
        select : data => {
            return {
              ...data,
              isAuthor: currentUser?.id === data.userId
            }
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
              const response = await agent.post('/recipes', recipe);
                return response.data;
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

      const updateVisibility = useMutation({
          mutationFn: async(id:string) => {
              await agent.post(`/recipes/${id}/visibility`)
          }, 
          onSuccess : async() => {
              await queryClient.invalidateQueries({
                  queryKey: ['recipes', id]
              })
          }
      })

      return {
        recipes,
        isLoading,
        updateRecipe,
        createRecipe,
        deleteRecipe,
        recipe,
        isLoadingRecipe,
        updateVisibility
      }
}