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
import AddIcon from "@mui/icons-material/Add";
import { CloudUpload, Close as CloseIcon, Upload } from "@mui/icons-material";
import { useState, useCallback, useEffect, useRef } from "react";
import { useProfile } from "../../../lib/hooks/useProfile";
import { useParams } from "react-router";
import { useDropzone } from "react-dropzone";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import StarButton from "../../../app/shared/components/StarButton";
import DeleteIcon from '@mui/icons-material/Delete';


export default function PhotoSection() {
  const { id } = useParams();
  const { photos, loadingPhotos, uploadPhoto, setMainPhoto, profile, deletePhoto } = useProfile(id);
  const [editOpen, setEditOpen] = useState(false);
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);
  const cropperRef = useRef<ReactCropperElement>(null);
  

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview)); 
    };
  }, [files]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file as Blob),
        })
      )
    );
  }, []);

  const onCrop = useCallback(() => {
    const cropper = cropperRef.current?.cropper;
    cropper?.getCroppedCanvas().toBlob((blob) => {
      if (blob) {
        uploadPhoto.mutate(blob, {
          onSuccess: (uploadedPhoto) => {
            if (photos && photos.length > 0) {
              setMainPhoto.mutate(uploadedPhoto);
              }
              setEditOpen(false);
              setFiles([]);
              }
          });
        }
      });
  }, [uploadPhoto, setMainPhoto, photos]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (loadingPhotos) {
    return (
      <Box display="flex" justifyContent="center" mt={2}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="bold">
          Your profile photos
        </Typography>
        <IconButton onClick={() => setEditOpen(true)}>
          <AddIcon fontSize="large" />
        </IconButton>
      </Box>

      {(!photos || photos.length === 0) ? (
        <Typography variant="body2" color="text.secondary">
          You don't have any photos yet
        </Typography>
      ) : (
        <ImageList cols={3} gap={8}>
          {photos.map((photo: { id: string; url: string }) => (
            <ImageListItem key={photo.id}>
                  <img
                      srcSet={`${photo.url.replace(
                          "/upload/",
                          "/upload/w_164,h_164,c_fill,f_auto,dpr_2,g_face/"
                      )}`}
                      src={`${photo.url.replace(
                          "/upload/",
                          "/upload/w_164,h_164,c_fill,f_auto,g_face/"
                      )}`}
                      alt="user profile image"
                      loading="lazy" />
                  <Box
                      sx={{ position: 'absolute', top: 0, left: 0 }}
                      onClick={() => setMainPhoto.mutate(photo)}
                  >
                      <StarButton selected={photo.url === profile?.imageUrl} />
                  </Box>
                  {profile?.imageUrl !== photo.url && (
                      <Box
                          sx={{ position: 'absolute', top: 0, right: 0 }}
                      >
                          <IconButton
                                onClick={() => deletePhoto.mutate(photo.id)}
                                aria-label="delete"  
                                sx={{
                                    color: 'black',
                                    p: 1.5,
                            }}
                            >
                              <DeleteIcon />
                          </IconButton>
                      </Box>
                  )}
              </ImageListItem>     
          ))}
        </ImageList>
      )}

      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add new profile photo</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ position: "relative" }}>
            {files[0]?.preview && (
              <IconButton
                onClick={() => setFiles([])}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  zIndex: 1000,
                  backgroundColor: "rgba(255,255,255,0.7)",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
                }}
              >
                <CloseIcon />
              </IconButton>
            )}

            <Box display="flex" gap={4}>
              {!files[0]?.preview && (
                <Box
                  {...getRootProps()}
                  sx={{
                    border: "dashed 3px #eee",
                    borderColor: isDragActive ? "green" : "#eee",
                    borderRadius: "5px",
                    paddingTop: "30px",
                    textAlign: "center",
                    height: "280px",
                    width: "100%",
                    cursor: "pointer",
                    justifyContent: "center"
                  }}
                >
                  <input {...getInputProps()} />
                  <CloudUpload sx={{ fontSize: 100, mt:4}} />
                  <Typography variant="h5">Drop image here</Typography>
                </Box>
              )}

              {files[0]?.preview && (
                <>
                  <Cropper
                    src={files[0]?.preview}
                    style={{ height: 300, width: 300 }}
                    initialAspectRatio={1}
                    aspectRatio={1}
                    preview=".img-preview"
                    guides={false}
                    viewMode={1}
                    background={false}
                    ref={cropperRef}
                  />
                  <Box>
                    <div
                      className="img-preview"
                      style={{ width: 300, height: 300, overflow: "hidden" }}
                    />
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setEditOpen(false)
             setFiles([])}} color="inherit">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={onCrop}
            disabled={!files[0] || uploadPhoto.isPending}
            startIcon={<Upload />}
          >
            Add Photo
          </Button>
        </DialogActions>
      </Dialog>
      
    </Paper>
  );
}