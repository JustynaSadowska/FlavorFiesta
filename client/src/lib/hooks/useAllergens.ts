import { useQuery} from "@tanstack/react-query"
import agent from "../api/agent";

export const useAllergens = () => {

  const { data: allergens = []} = useQuery({
    queryKey: ["allergens"],
    queryFn: () => agent.get<TagAllergen[]>("/allergens").then(res => res.data),
  });

  const { data: userAllergens = [], isLoading} = useQuery({
    queryKey: ["userAllergens"],
    queryFn: () => agent.get<TagAllergen[]>("/allergens/user").then(res => res.data),
  });
    
  return { allergens, userAllergens, isLoading};
};

