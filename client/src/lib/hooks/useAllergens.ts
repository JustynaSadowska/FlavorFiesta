import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import agent from "../api/agent";

export const useAllergens = () => {
  const queryClient = useQueryClient();

  const { data: allergens = []} = useQuery({
    queryKey: ["allergens"],
    queryFn: () => agent.get<TagAllergen[]>("/allergens").then(res => res.data),
  });

  const { data: userAllergens = [], isLoading} = useQuery({
    queryKey: ["userAllergens"],
    queryFn: () => agent.get<TagAllergen[]>("/allergens/user").then(res => res.data),
  });

  const updateUserAllergens = useMutation({
    mutationFn: async (allergenIds : string[]) => {
      await agent.put(`/allergens`, allergenIds);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["userAllergens"],
      });
    },
  })
    
  return { allergens, userAllergens, isLoading, updateUserAllergens};
};

