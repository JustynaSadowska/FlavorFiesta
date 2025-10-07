import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useAccount } from "./useAccount";
import { isAdmin } from "../util/permissions";

export const useShoppingLists = (id?: string) => {
  const queryClient = useQueryClient();
  const { currentUser } = useAccount();
  const auth = {user: currentUser};

  const { data: shoppingLists = [], isLoading } = useQuery({
    queryKey: ["shoppingLists"],
    queryFn: () =>
      agent.get<ShoppingList[]>("/shoppingLists").then((res) => res.data),
    enabled: !!currentUser && !isAdmin(auth),
  });

  const { data: shoppingList, isLoading: isLoadingShoppingList } = useQuery({
    queryKey: ["shoppingList", id],
    queryFn: async () => {
      const response = await agent.get<ShoppingList>(`/shoppingLists/${id}`);
      return response.data;
    },
    enabled: !!id && !!currentUser 
  });

  const checkedToggle = useMutation({
    mutationFn: async ({
      listId,
      itemId,
    }: {
      listId: string;
      itemId: string;
    }) => {
      await agent.post(`/shoppingLists/${listId}/items/${itemId}/toggle`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["shoppingLists"],
      });
    },
  });

  const createShoppingList = useMutation({
    mutationFn: async (shoppingList: CreateShoppingList) => {
      const response = await agent.post("/shoppingLists", shoppingList);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["shoppingLists"],
      });
    },
  });

  const deleteShoppingList = useMutation({
    mutationFn: async (id: string) => {
      await agent.delete(`/shoppingLists/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["shoppingLists"],
      });
    },
  });

  const updateShoppingList = useMutation({
    mutationFn: async (shoppingList: UpdateShoppingList) => {
      await agent.put(`/shoppingLists/${shoppingList.id}`, shoppingList);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["shoppingLists"],
      });
    },
  });

  const addIngredientsToList = useMutation({
    mutationFn: async ({
      listId,
      ingredients,
    }: {
      listId: string;
      ingredients: CreateUpdateIngredient[];
    }) => {
      await agent.post(`/shoppingLists/${listId}/addIngredients`, 
        ingredients
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shoppingLists"] });
    },
  });

  return {
    shoppingLists,
    createShoppingList,
    deleteShoppingList,
    updateShoppingList,
    isLoading,
    isLoadingShoppingList,
    shoppingList,
    checkedToggle,
    addIngredientsToList,
  };
};
