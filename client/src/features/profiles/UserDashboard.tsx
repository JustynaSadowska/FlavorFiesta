import { Grid2 } from "@mui/material";
import { useProfile } from "../../lib/hooks/useProfile";
import { observer } from "mobx-react-lite";
import UserList from "./UserList";
import UserFilter from "./UserFilter";

const UserDashboard = observer( function UserDashboard() {
  const { users, isUsersLoading, hasNextPageUser, fetchNextPageUser} = useProfile();
console.log(users)
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={8} offset={{ xs:2, md: 2 }}>
       <UserFilter/>
       </Grid2>
        <Grid2 size ={12} offset={{ md: 1,  xs:2,}}>
          <UserList usersGroup={users} isLoading={isUsersLoading} fetchNextPage={fetchNextPageUser} 
              hasNextPage={hasNextPageUser}/>
        </Grid2>        
    </Grid2>
  );
});
export default UserDashboard;
