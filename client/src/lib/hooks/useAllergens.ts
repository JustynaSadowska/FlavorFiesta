import { useQuery} from "@tanstack/react-query"
import agent from "../api/agent";

export const useAllergens = () => {

  const { data: allergens = []} = useQuery({
    queryKey: ["allergens"],
    queryFn: () => agent.get<TagAllergen[]>("/allergens").then(res => res.data),
  });

  return { allergens};
};

