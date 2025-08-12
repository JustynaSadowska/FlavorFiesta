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
    Avatar,
    ListItemText,
    Chip
} from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

type Props = {
    type: "followers" | "followings";
};

export default function ProfileFollowings({ type }: Props) {
    const { id } = useParams(); 
    const { followings, loadingFollowings } = useProfile(id, type); 
    const [search, setSearch] = React.useState("");

    const filtered = followings?.filter(p =>
        ((p.firstName || "") + " " + (p.lastName || "")).toLowerCase()
        .includes(search.toLowerCase())
    );

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

            {loadingFollowings ? (
                <Typography>Loading...</Typography>
            ) : filtered && filtered.length > 0 ? (
                <List sx={{ maxHeight: 400, overflowY: "auto" }}>
                    {filtered.map((p) => {
                        return (
                            <ListItem key={p.id}>
                                <ListItemAvatar>
                                    <Avatar alt={`${p.firstName} ${p.lastName ?? ""}`} src="" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${p.firstName} ${p.lastName ?? ""}`}
                                />
                               {
                                p.following ? (
                                    <Chip
                                        label="Following"
                                        color="secondary" 
                                        variant="outlined"
                                    />
                                ) : (
                                    <Box sx={{ width: 80 }} /> 
                                )
                            }
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
