import { CloudUpload, Close as CloseIcon } from "@mui/icons-material";
import { Box, Button, Grid2, IconButton, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

type Props = {
  uploadPhoto: (file: Blob) => void;
  loading: boolean;
};

export default function PhotoUploadWidget({ uploadPhoto, loading }: Props) {
  const [files, setFiles] = useState<object & { preview: string }[]>([]);
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
      uploadPhoto(blob as Blob);
    });
  }, [uploadPhoto]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
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

      <Grid2 container spacing={8}>
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
                width: "600px"
              }}
            >
              <input {...getInputProps()} />
              <CloudUpload sx={{ fontSize: 80 }} />
              <Typography variant="h5">Drop image here</Typography>
            </Box>
        )}

        {files[0]?.preview && (
          <Grid2 size={4} >
            <Cropper
              src={files[0]?.preview}
              style={{ height: 300, width: "90%" }}
              initialAspectRatio={1}
              aspectRatio={1}
              preview=".img-preview"
              guides={false}
              viewMode={1}
              background={false}
              ref={cropperRef}
            />
          </Grid2>
        )}

        {files[0]?.preview && (
          <Grid2 size={4} >
            <div
              className="img-preview"
              style={{ width: 300, height: 300, overflow: "hidden" }}
            />
            <Button
              sx={{ my: 1, width: 300 }}
              onClick={onCrop}
              variant="contained"
              color="secondary"
              disabled={loading}
            >
              Upload
            </Button>
          </Grid2>
        )}
      </Grid2>
    </Box>
  );
}
