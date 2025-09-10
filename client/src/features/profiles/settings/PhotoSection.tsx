import {
  Typography,
  Box,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  ImageList,
  ImageListItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { Upload } from "@mui/icons-material";
import { useProfile } from "../../../lib/hooks/useProfile";
import { useParams } from "react-router";
import PhotoUploadWidget from "../../../app/shared/components/PhotoUploadWidget";

export default function PhotoSection() {
  const { id } = useParams();
  const { photos, loadingPhotos, uploadPhoto } = useProfile(id);
  const [editOpen, setEditOpen] = useState(false);
  const [newPhoto, setNewPhoto] = useState<File | null>(null);

  const handleEditClick = () => {
    setEditOpen(true);
  };

  const handleAddPhoto = () => {
    if (newPhoto) {
      uploadPhoto.mutate(newPhoto, {
        onSuccess: () => setNewPhoto(null),
      });
    }
  };
   const handlePhotoUpload = (file: Blob) => {
        uploadPhoto.mutate(file, {
            onSuccess: () => {
                setEditOpen(false);
            }
        })
    }

  if (loadingPhotos) {
    return (
      <Box display="flex" justifyContent="center" mt={2}>
        <CircularProgress />
      </Box>
    );
  }

  if (!photos || photos.length === 0) {
    return (
      <Box display="flex" justifyContent="center" mt={2}>
        <Typography>You don't have any photos yet</Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="bold">Your profile photos</Typography>
        <IconButton size="small" onClick={handleEditClick}>
          <EditIcon />
        </IconButton>
      </Box>

      <ImageList cols={3} gap={8}>
        {photos.map((photo: { id: string; url: string }) => (
          <ImageListItem key={photo.id}>
            <img
                srcSet={`${photo.url.replace(
                    '/upload/',
                    '/upload/w_164,h_164,c_fill,f_auto,dpr_2,g_face/'
                )}`}
                src={`${photo.url.replace(
                    '/upload/',
                    '/upload/w_164,h_164,c_fill,f_auto,g_face/'
                )}`}
                alt={'user profile image'}
                loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Photos</DialogTitle>
        <DialogContent dividers>
            <PhotoUploadWidget
                uploadPhoto={handlePhotoUpload}
                loading={uploadPhoto.isPending}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setEditOpen(false)} color="inherit">
                Cancel
            </Button>
            <Button
                variant="contained"
                color="success"
                onClick={handleAddPhoto}
                disabled={!newPhoto}
                startIcon={<Upload />}
            >
                Add Photo
            </Button>
            </DialogActions>
      </Dialog>
    </Paper>
  );
}
