import { Navigate, Outlet, useLocation } from "react-router";
import { useAccount } from "../../lib/hooks/useAccount"
import { Typography } from "@mui/material";

export default function RequireAuth() {
    const {currentUser, loadingUserUnfo} = useAccount();
    const location = useLocation();

    if(loadingUserUnfo) return <Typography>Loading...</Typography>

    if(!currentUser) return <Navigate to = '/login' state = {{from: location}}/>
  return (
    <Outlet/>
  )
}
