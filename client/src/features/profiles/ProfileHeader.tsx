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
    IconButton,
    Chip
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useProfile } from "../../lib/hooks/useProfile";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import ProfileFollowings from "./ProfileFollowings";
import EditIcon from '@mui/icons-material/Edit';
import { useAllergens } from "../../lib/hooks/useAllergens";

export default function ProfileHeader() {
    const { id } = useParams();
    const { isCurrentUser, profile, updateFollowing } = useProfile(id);
    const [openDialog, setOpenDialog] = useState<null | "followers" | "followings">(null);
    const navigate = useNavigate();
    const {userAllergens} = useAllergens();


    if (!profile) return null;

    return (
        <>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3,  maxWidth: 1250, margin: "auto", position: "relative"}}>
            <Grid container spacing={2} alignItems="flex-start">
                <Grid item xs={12} md={8}>
                    <Stack direction="row" spacing={3} alignItems="center">
                    <Box
                        sx={{
                        position: "relative",
                        width: 150,
                        height: 150,
                        flexShrink: 0,
                        borderRadius: "50%",
                        overflow: "hidden",
                        cursor: isCurrentUser ? "pointer" : "default",
                        "&:hover .hoverOverlay": { opacity: 1 },
                        }}
                        onClick={() => {
                        if (isCurrentUser) {
                            navigate(`/profiles/${id}/settings`);
                        }
                        }}
                    >
                        <Avatar
                        src={profile.imageUrl || "/images/default-user.png"}
                        sx={{ width: "100%", height: "100%" }}
                        />
                        {isCurrentUser && (
                        <Box
                            className="hoverOverlay"
                            sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            bgcolor: "rgba(0,0,0,0.5)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            opacity: 0,
                            transition: "opacity 0.3s",
                            }}
                        >
                            <EditIcon sx={{ fontSize: 32 }} />
                        </Box>
                        )}
                    </Box>

                    <Box display="flex" flexDirection="column" gap={1}>
                        <Typography variant="h4" mt={2}>
                        {profile.firstName} {profile.lastName}
                        </Typography>

                        {isCurrentUser && (
                            <Box
                                onClick={() => navigate(`/profiles/${id}/settings`)}
                                sx={{
                                display: "flex",
                                alignItems: "center",
                                flexWrap: "wrap",
                                gap: 1,
                                cursor: "pointer",
                                transition: "color 0.2s",
                                "&:hover": {
                                    color: "primary.main",
                                },
                                }}
                            >
                                <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                sx={{ whiteSpace: "nowrap" }}
                                >
                                Your allergens:
                                </Typography>

                            {userAllergens && userAllergens.length > 0 ? (
                            userAllergens.map((allergen) => (
                                <Chip
                                key={allergen.id}
                                label={allergen.name}
                                variant="outlined"
                                color="error"
                                size="small"
                                />
                            ))
                            ) : (
                            <Typography variant="body2" color="text.secondary">
                                You have no allergens
                            </Typography>
                            )}
                        </Box>
                        )}
                    </Box>
                    </Stack>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Stack spacing={2} alignItems="center">
                    <Box
                        display="flex"
                        justifyContent="space-around"
                        width="100%"
                        flexWrap="wrap"
                    >
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