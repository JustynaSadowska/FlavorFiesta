import { Navigate, Outlet, useLocation } from "react-router";
import { useAccount } from "../../lib/hooks/useAccount"
import { Box, CircularProgress } from "@mui/material";

export default function RequireAuth() {
    const {currentUser, loadingUserUnfo} = useAccount();
    const location = useLocation();

    if (loadingUserUnfo) {
    return (
      <Box display="flex" justifyContent="center" mt={2}>
        <CircularProgress />
      </Box>
    );
  } 

    if(!currentUser) return <Navigate to = '/login' state = {{from: location.pathname}}/>
  return (
    <Outlet/>
  )
}
