import React from "react";
import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";
import {
    Box,
    Typography,
    List,
    TextField,
    InputAdornment,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Button,
} from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useQueryClient } from "@tanstack/react-query";
import AvatarPopover from "../../app/shared/components/AvatarPopover";

type Props = {
    type: "followers" | "followings";
    onNavigate?: () => void; 
};

export default function ProfileFollowings({ type, onNavigate }: Props) {
    const { id } = useParams();
    const { followings, loadingFollowings, updateFollowing } = useProfile(id, type);
    const [search, setSearch] = React.useState("");
    const queryClient = useQueryClient();
    const currentUserId = queryClient.getQueryData<User>(["user"])?.id;
    const filtered = followings?.filter(p =>
        ((p.firstName || "") + " " + (p.lastName || "")).toLowerCase()
            .includes(search.toLowerCase())
    );

    if (loadingFollowings) return <Typography>Loading...</Typography>;

    return (
        <Box>
            <TextField
                placeholder="Search"
                variant="outlined"
                size="small"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchOutlinedIcon />
                        </InputAdornment>
                    ),
                }}
            />

            {filtered && filtered.length > 0 ? (
                <List sx={{ maxHeight: 400, overflowY: "auto" }}>
                    {filtered.map((p) => {
                        const isSelf = currentUserId === p.id;
                        return (
                            <ListItem key={p.id}>
                                <ListItemAvatar>
                                    {/* <Avatar alt={`${p.firstName} ${p.lastName ?? ""}`} src="" /> */}
                                    <AvatarPopover
                                        profile={{
                                        id: p.id,
                                        firstName: p.firstName,
                                        lastName: p.lastName,
                                        }}
                                        avatarProps={{ sx: { width: 45, height: 45 } }}
                                        showName={false}
                                        onNavigate={onNavigate}
                                        />
                                </ListItemAvatar>
                                <ListItemText sx={{mt:2}}
                                    primary={`${p.firstName} ${p.lastName ?? ""}`}
                                />
                                {!isSelf && (
                                    <Button
                                        onClick={() => updateFollowing.mutate(p.id)}
                                        disabled={updateFollowing.isPending}
                                        variant="outlined"
                                        color={p.following ? "error" : "success"} 
                                    >
                                        {p.following ? "Unfollow" : "Follow"}
                                    </Button>
                                )}
                            </ListItem>
                        );
                    })}
                </List>
            ) : (
                <Typography color="text.secondary" sx={{ mt: 2 }}>
                    {type === "followers"
                        ? "No followers yet"
                        : "Not following anyone yet"}
                </Typography>
            )}
        </Box>
    );
}
