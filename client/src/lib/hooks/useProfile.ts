import { keepPreviousData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useMemo } from "react";
import { useStore } from "./useStore";
import { useAccount } from "./useAccount";
export const useProfile = (id?: string, predicate?: string) => {
  const queryClient = useQueryClient();
  const {profileStore: {name}} = useStore();
  const {currentUser} = useAccount();

  const { data: profile, isLoading: loadingProfile } = useQuery<Profile>({
    queryKey: ["profile", id],
    queryFn: async () => {
      const response = await agent.get<Profile>(`/profiles/${id}`);
      return response.data;
    },
    enabled: !!id && !predicate,
  });

  const { data: userRecipesGroup, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery<PagedList<Recipe, string>>({
    queryKey: ["recipes", "user", id],
    queryFn: async ({pageParam = null}) => {
      const response = await agent.get<PagedList<Recipe,string>>(`/profiles/${id}/recipes`, {
        params: {
          cursor: pageParam,
          pageSize: 10,
        }
      });
      return response.data;
    },
        staleTime: 1000 * 60 * 5,//dopiero po 5 minutach trzeba bedzie je na nowo załadowywać
        placeholderData: keepPreviousData,
        initialPageParam: null,
        getNextPageParam:(lastPage)=> lastPage.nextCursor,

      enabled: !!id,
  });
  

  const { data: users, isLoading: isUsersLoading, isFetchingNextPage: isFetchingNextPageUser , fetchNextPage: fetchNextPageUser, hasNextPage: hasNextPageUser} = useInfiniteQuery<PagedList<Profile, string>>({
    queryKey: ["users", id, name],
    queryFn: async ({pageParam = null}) => {
      const response = await agent.get<PagedList<Profile,string>>(`/profiles`, {
         params: {
          cursor: pageParam,
          pageSize: 10,
          name
        }
      });
      console.log(response.data)
      return response.data;
    },
        placeholderData: keepPreviousData,
        initialPageParam: null,
        getNextPageParam:(lastPage)=> lastPage.nextCursor,
  });

  const { data: followings, isLoading: loadingFollowings } = useQuery<
    Profile[]
  >({
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
    mutationFn: async (targetId: string) => {
      await agent.post(`/profiles/${targetId}/follow`);
    },
    onSuccess: (_, targetId) => {
      queryClient.invalidateQueries({ queryKey: ["profile", id] });

      queryClient.setQueryData(["profile", targetId], (profile: Profile) => {
        if (!profile || profile.followersCount === undefined) return profile;
        return {
          ...profile,
          following: !profile.following,
          followersCount: profile.following
            ? profile.followersCount - 1
            : profile.followersCount + 1,
        };
      });

      queryClient.invalidateQueries({ queryKey: ["followings", id] });
      queryClient.invalidateQueries({ queryKey: ["followings", targetId] });
    },
  });
  const { data: favoriteRecipesGroup, isLoading: isFavoriteLoading, isFetchingNextPage: isFetchingNextPageFavorite, fetchNextPage: fetchNextPageFavorite, hasNextPage: hasNextPageFavorite } = useInfiniteQuery<PagedList<Recipe, string>>({
    queryKey: ["profile", "favorites",id],
    queryFn: async ({pageParam = null}) => {
      const response = await agent.get<PagedList<Recipe,string>>(`/profiles/favorites`, {
         params: {
          cursor: pageParam,
          pageSize: 10,
        }
      });
      return response.data;
    },
    initialPageParam: null,
    placeholderData: keepPreviousData,
    getNextPageParam:(lastPage)=> lastPage.nextCursor,
    enabled: !! id && !!currentUser

  });

  const isCurrentUser = useMemo(() => {
    return id === queryClient.getQueryData<User>(["user"])?.id;
  }, [id, queryClient]);

   const {data: photos, isLoading: loadingPhotos} = useQuery<Photo[]>({
        queryKey: ['photos', id],
        queryFn: async () => {
            const response = await agent.get<Photo[]>(`/profiles/${id}/photos`);
            return response.data;
        }
    });

     const uploadPhoto = useMutation({
        mutationFn: async (file: Blob) => {
            const formData = new FormData();
            formData.append('file', file);
            const response = await agent.post('/profiles/add-photo', formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            });
            return response.data;
        },
        onSuccess: async (photo: Photo) => {
            await queryClient.invalidateQueries({
                queryKey: ['photos', id]
            });
            queryClient.setQueryData(['user'], (data: User) => {
                if (!data) return data;
                return {
                    ...data,
                    imageUrl: data.imageUrl ?? photo.url
                }
            });
            queryClient.setQueryData(['profile', id], (data: Profile) => {
                if (!data) return data;
                return {
                    ...data,
                    imageUrl: data.imageUrl ?? photo.url
                }
            });
        }
    })

    const setMainPhoto = useMutation({
        mutationFn: async (photo: Photo) => {
            await agent.put(`/profiles/${photo.id}/setMain`)
        },
        onSuccess: (_, photo) => {
            queryClient.setQueryData(['user'], (userData: User) => {
                if (!userData) return userData;
                return {
                    ...userData,
                    imageUrl: photo.url
                }
            });
            queryClient.setQueryData(['profile', id], (profile: Profile) => {
                if (!profile) return profile;
                return {
                    ...profile,
                    imageUrl: photo.url
                }
            })
        }
    })

    const deletePhoto = useMutation({
        mutationFn: async (photoId: string) => {
            await agent.delete(`/profiles/${photoId}/photos`)
        },
        onSuccess: (_, photoId) => {
            queryClient.setQueryData(['photos', id], (photos: Photo[]) => {
                return photos?.filter(x => x.id !== photoId)
            })
        }
    });
   const { data: recentRecipes, isLoading: loadingRecent } = useQuery<UserRecentRecipes>({
    queryKey: ["recent-recipes", id],
    queryFn: async () => {
      const response = await agent.get<UserRecentRecipes>(`/profiles/${id}/recent-recipes`);
        console.log(response.data)

      return response.data;
    },
    enabled: !!id,
  });

  return {
    userRecipesGroup,
    isLoading, 
    isFetchingNextPage, 
    fetchNextPage, 
    hasNextPage,
    isUsersLoading,
    users,
    profile,
    loadingProfile,
    followings,
    loadingFollowings,
    updateFollowing,
    isCurrentUser,
    favoriteRecipesGroup,
    isFetchingNextPageFavorite,
    fetchNextPageFavorite,
    hasNextPageFavorite,
    isFavoriteLoading,
    photos,
    loadingPhotos,
    deletePhoto,
    setMainPhoto,
    uploadPhoto,
    recentRecipes,
    loadingRecent,
    isFetchingNextPageUser,
    hasNextPageUser, 
    fetchNextPageUser
  };
};
