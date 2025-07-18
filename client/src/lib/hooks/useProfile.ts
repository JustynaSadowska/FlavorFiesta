import { useQuery } from "@tanstack/react-query";
import agent from "../api/agent";
//import { useAccount } from "./useAccount";
export const useProfile = (id?: string) => {
 // const { currentUser } = useAccount();
  const { data: userRecipes, isLoading } = useQuery({
    queryKey: ["user-recipes", id],
    queryFn: async () => {
      const response = await agent.get<Recipe[]>(`/profiles/${id}/recipes`);
      return response.data;
    },
    enabled: !!id
  });

  const{data: users, isLoading: isUsersLoading} = useQuery({
    queryKey:['users'],
    queryFn : async () => {
      const response = await agent.get<Profile[]>(`/profiles`);
      return response.data;
    }
  })

  return {
    userRecipes,
    isLoading,
    isUsersLoading, users
  };
};
