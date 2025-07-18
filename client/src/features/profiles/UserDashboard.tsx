import { Box, Stack, Typography } from "@mui/material";
import ProfileCard from "./ProfileCard";
import { useProfile } from "../../lib/hooks/useProfile";

export default function UserDashboard() {
    const {users} = useProfile();
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Użytkownicy
      </Typography>
       <Stack spacing={2}>
        {users?.map((user) => (
           <ProfileCard profile={user} />
        ))}
      </Stack>
    </Box>
  )
}
