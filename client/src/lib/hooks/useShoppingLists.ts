import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useShoppingLists = (id? : string) => {
  const queryClient = useQueryClient();
  
  const { data: shoppingLists = [], isLoading} = useQuery({
    queryKey: ["shoppingLists"],
    queryFn: () => agent.get<ShoppingList[]>("/shoppingLists").then(res => res.data)
  });

   const { data: shoppingList, isLoading: isLoadingShoppingList } = useQuery({
    queryKey: ["shoppingList", id],
    queryFn: async () => {
      const response = await agent.get<ShoppingList>(`/shoppingLists/${id}`);
      return response.data;
    },
    enabled: !!id, 
  });

  //  const createShoppingList = useMutation({
  //   mutationFn: async (shoppingList: CreateUpdateShoppingList) => {
  //     const response = await agent.post("/shoppingLists", shoppingList);
  //     return response.data;
  //   },
  //   onSuccess: async () => {
  //     await queryClient.invalidateQueries({
  //       queryKey: ["shoppingLists"],
  //     });
  //   },
  // });

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

  // const updateShoppingList = useMutation({
  //   mutationFn: async (shoppingList: CreateUpdateShoppingList) => {
  //     await agent.put(`/shoppingLists/${shoppingList.id}`, shoppingList);
  //   },
  //   onSuccess: async () => {
  //     await queryClient.invalidateQueries({
  //       queryKey: ["shoppingLists"],
  //     });
  //   },
  // });
 

  return {
    shoppingLists,
    //createShoppingList,
    deleteShoppingList,
    //updateShoppingList,
    isLoading,
    isLoadingShoppingList, 
    shoppingList
  };
};
