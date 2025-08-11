import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useMemo } from "react";
//import { useAccount } from "./useAccount";
export const useProfile = (id?: string, predicate?: string) => {
  const queryClient = useQueryClient();
  const { data: profile, isLoading: loadingProfile } = useQuery<Profile>({
    queryKey: ["profile", id],
    queryFn: async () => {
      const response = await agent.get<Profile>(`/profiles/${id}`);
      return response.data;
    },
    enabled: !!id && !predicate,
  });

  const { data: userRecipes, isLoading } = useQuery({
    queryKey: ["user-recipes", id],
    queryFn: async () => {
      const response = await agent.get<Recipe[]>(`/profiles/${id}/recipes`);
      return response.data;
    },
    enabled: !!id,
  });

  const { data: users, isLoading: isUsersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await agent.get<Profile[]>(`/profiles`);
      return response.data;
    },
  });

  const { data: followings, isLoading: loadingFollowings } = useQuery<Profile[]>({
    queryKey: ["followings", id, predicate],
    queryFn: async () => {
      const response = await agent.get<Profile[]>(
        `/profiles/${id}/follow-list?predicate=${predicate}`
      );
      return response.data;
    },
    enabled: !!id && !!predicate,
  });

  const updateFollowing = useMutation({
        mutationFn: async () => {
            await agent.post(`/profiles/${id}/follow`)
        },
        onSuccess: () => {
            queryClient.setQueryData(['profile', id], (profile: Profile) => {
                queryClient.invalidateQueries({queryKey: ['followings', id, 'followers']})
                if (!profile || profile.followersCount === undefined) return profile;
                return {
                    ...profile,
                    following: !profile.following,
                    followersCount: profile.following 
                        ? profile.followersCount - 1 
                        : profile.followersCount + 1
                }
            })
        }
    });

     const isCurrentUser = useMemo(() => {
        return id === queryClient.getQueryData<User>(['user'])?.id
    }, [id, queryClient])

  return {
    userRecipes,
    isLoading,
    isUsersLoading,
    users,
    profile,
    loadingProfile,
    followings,
    loadingFollowings,
    updateFollowing,
    isCurrentUser
  };
};
