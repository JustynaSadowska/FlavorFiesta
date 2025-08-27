import * as React from "react";
import Popover from "@mui/material/Popover";
import { useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router";
import ProfileCard from "../../../features/profiles/ProfileCard";

type Props = {
  profile: Profile;
  avatarProps?: React.ComponentProps<typeof Avatar>;
  showName?: boolean;
  onNavigate?: () => void;
};

export default function AvatarPopover({ profile, onNavigate, avatarProps, showName = false }: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    onNavigate?.(); 
    navigate(`/profiles/${profile.id}`);
  };

  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  return (
    <>
      <Box
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
      >
        <Avatar
          alt={`${profile.firstName} ${profile.lastName}`}
          {...avatarProps}
          onClick={handleClick}
        />
        {showName && (
          <Link
            to={`/profiles/${profile.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography variant="body2" sx={{fontWeight: "bold"}} noWrap onClick={handleClick}>
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
