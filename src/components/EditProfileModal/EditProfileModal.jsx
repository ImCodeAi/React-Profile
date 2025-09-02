// src/components/EditProfileModal/EditProfileModal.jsx
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Box,
  Typography,
  Avatar
} from "@mui/material";
import "./EditProfileModal.css";

const EditProfileModal = ({
  open,
  onClose,
  profile,
  setProfile,
  previewLogo,
  onLogoChange
}) => {
  const [localName, setLocalName] = useState(profile.name);
  const [localDescription, setLocalDescription] = useState(profile.description);

  // Sync with parent profile when modal opens
  useEffect(() => {
    if (open) {
      setLocalName(profile.name);
      setLocalDescription(profile.description);
    }
  }, [open, profile]);

  const handleSave = () => {
    setProfile({
      ...profile,
      name: localName,
      description: localDescription
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="edit-modal-title">ویرایش پروفایل</DialogTitle>
      <DialogContent>
        <Stack spacing={2} className="edit-form">
          <TextField
            label="نام پروفایل"
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
            fullWidth
            className="edit-field"
          />
          <TextField
            label="توضیحات پروفایل"
            value={localDescription}
            onChange={(e) => setLocalDescription(e.target.value)}
            fullWidth
            multiline
            rows={3}
            className="edit-field"
          />
          <Box className="logo-section">
            <Typography variant="subtitle1" className="logo-title">
              پیش‌نمایش لوگو
            </Typography>
            <Avatar
              alt="پیش‌نمایش لوگو"
              src={previewLogo}
              className="logo-preview"
            />
            <Button variant="outlined" component="label" className="upload-button">
              آپلود لوگو
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={onLogoChange}
              />
            </Button>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>بستن</Button>
        <Button onClick={handleSave} variant="contained">
          ذخیره
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileModal;