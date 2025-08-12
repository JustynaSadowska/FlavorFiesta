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
import { useParams } from "react-router";
import { useState } from "react";
import ProfileFollowings from "./ProfileFollowings";

export default function ProfileHeader() {
    const { id } = useParams();
    const { isCurrentUser, profile, updateFollowing } = useProfile(id);
    const [openDialog, setOpenDialog] = useState<null | "followers" | "followings">(null);

    if (!profile) return null;

    return (
        <>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Stack direction="row" spacing={3} alignItems="center">
                            <Avatar
                                // src={profile.imageUrl}
                                // alt={`${profile.firstName} ${profile.lastName}`}
                                sx={{ width: 150, height: 150 }}
                            />
                            <Box display="flex" flexDirection="column" gap={2}>
                                <Typography variant="h4">
                                    {profile.firstName} {profile.lastName}
                                </Typography>
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
                    {openDialog && <ProfileFollowings type={openDialog} />}
                </DialogContent>
            </Dialog>)}
        </>
    );
}