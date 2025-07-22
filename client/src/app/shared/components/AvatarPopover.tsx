import * as React from "react";
import Popover from "@mui/material/Popover";
import { useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { Link } from "react-router";
import ProfileCard from "../../../features/profiles/ProfileCard";

type Props = {
  profile: Profile;
  avatarProps?: React.ComponentProps<typeof Avatar>;
  showName?: boolean;
};

export default function AvatarPopover({ profile, avatarProps, showName = false }: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
        <Box
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
        >
            <Link to={`/profiles/${profile.id}`}>
                <Avatar
                    alt={`${profile.firstName} ${profile.lastName}`}
                    {...avatarProps}
                />
            </Link>

        {showName && (
            <Link
                to={`/profiles/${profile.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
            >
                <Typography variant="body2" sx={{fontWeight: "bold"}} noWrap>
                {profile.firstName} {profile.lastName}
                </Typography>
          </Link>
        )}
        </Box>

        <Popover
            id="mouse-over-popover"
            sx={{ pointerEvents: "none" }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
            }}
            transformOrigin={{
            vertical: "top",
            horizontal: "left",
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
        >
            <ProfileCard profile={profile} />
      </Popover>
    </>
  );
}
