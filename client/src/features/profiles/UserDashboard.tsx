import { Box, Stack, TextField, Typography, InputAdornment } from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ProfileCard from "./ProfileCard";
import { useProfile } from "../../lib/hooks/useProfile";
import React from "react";

export default function UserDashboard() {
  const { users } = useProfile();
  const [search, setSearch] = React.useState("");

  const filtered = users?.filter(p =>
    ((p.firstName || "") + " " + (p.lastName || ""))
      .toLowerCase()
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

      {filtered && filtered.length > 0 ? (
        <Stack spacing={2}>
          {filtered.map((user) => (
            <ProfileCard key={user.id} profile={user} />
          ))}
        </Stack>
      ) : (
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          No such user
        </Typography>
      )}
    </Box>
  );
}
