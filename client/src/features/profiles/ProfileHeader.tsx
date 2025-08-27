import {
    Avatar,
    Box,
    Button,
    Divider,
    Grid,
    Paper,
    Stack,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useProfile } from "../../lib/hooks/useProfile";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import ProfileFollowings from "./ProfileFollowings";
import EditIcon from '@mui/icons-material/Edit';

export default function ProfileHeader() {
    const { id } = useParams();
    const { isCurrentUser, profile, updateFollowing } = useProfile(id);
    const [openDialog, setOpenDialog] = useState<null | "followers" | "followings">(null);
    const navigate = useNavigate();


    if (!profile) return null;

    return (
        <>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3,  maxWidth: 1250, margin: "auto", position: "relative"}}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Stack direction="row" spacing={3} alignItems="center">
                            <Avatar sx={{ width: 150, height: 150 }} />
                            <Box display="flex" flexDirection="column" gap={1}>
                                <Box display="flex" alignItems="flex-start" gap={1}>
                                    <Typography variant="h4">
                                        {profile.firstName} {profile.lastName}
                                    </Typography>
                                    {isCurrentUser && (
                                        <IconButton
                                            aria-label="settings"
                                            onClick={() => navigate(`/profiles/${id}/settings`)}
                                            sx={{
                                                transform: "translateY(-20%)",
                                                padding: "4px"
                                            }}
                                        >
                                            <EditIcon  />
                                        </IconButton>
                                    )}
                                </Box>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={4}>
                        <Stack spacing={2} alignItems="center">
                            <Box display="flex" justifyContent="space-around" width="100%">
                                <Box
                                    textAlign="center"
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => setOpenDialog("followers")}
                                >
                                    <Typography variant="h6">Followers</Typography>
                                    <Typography variant="h3">{profile.followersCount}</Typography>
                                </Box>
                                <Box
                                    textAlign="center"
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => setOpenDialog("followings")}
                                >
                                    <Typography variant="h6">Following</Typography>
                                    <Typography variant="h3">{profile.followingCount}</Typography>
                                </Box>
                            </Box>
                            <Divider sx={{ width: "100%" }} />
                            {!isCurrentUser && (
                                <Button
                                    onClick={() => updateFollowing.mutate(profile.id)}
                                    disabled={updateFollowing.isPending}
                                    fullWidth
                                    variant="outlined"
                                    color={profile.following ? "error" : "success"}
                                >
                                    {profile.following ? "Unfollow" : "Follow"}
                                </Button>
                            )}
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>

            {openDialog && (
            <Dialog
                open={!!openDialog}
                onClose={() => setOpenDialog(null)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    {openDialog === "followers" ? "Followers" : "Following"}
                    <IconButton
                        aria-label="close"
                        onClick={() => setOpenDialog(null)}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    {openDialog && <ProfileFollowings type={openDialog} onNavigate={() => setOpenDialog(null)}/>}
                </DialogContent>
            </Dialog>)}
        </>
    );
}