import { Box, CircularProgress, Grid2, Typography } from '@mui/material';
import { InfiniteData } from '@tanstack/react-query';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer';
import UserCard from './UserCard';
type Props = {
  usersGroup?: InfiniteData<PagedList<Profile, string>>;
  isLoading?: boolean;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
};
const UserList = observer(function UserList({ usersGroup, isLoading, fetchNextPage, hasNextPage }: Props) {
    const [ref, inView] = useInView({ threshold: 0.4 });

    useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage?.();
    }
    }, [inView, hasNextPage, fetchNextPage]);
    if (isLoading) {
        return (
        <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress />
        </Box>
        );
    } 
  if (!usersGroup) return <Typography>No profiles found</Typography>;

  return (
        <Grid2 
            container 
            spacing={{ xs: 1, md: 3 }} 
            columns={{ xs: 4, sm: 8, md: 12 }} 
        >
            {usersGroup.pages.map((usersPage, pageIndex) => 
            usersPage.items.map((user, itemIndex) => {
                const isLastItem = pageIndex === usersGroup.pages.length - 1 
                                && itemIndex === usersPage.items.length - 1;

                return (
                <Grid2 
                    key={user.id} 
                    sx= {{xs:2, sm:4, md:4}}
                    ref={isLastItem ? ref : null}
                >
                    <UserCard profile={user} />
                </Grid2>
                );
            })
            )}
        </Grid2>
  );
});
export default UserList;