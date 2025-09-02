// src/components/ProfileCard/ProfileCard.jsx
import React from 'react';
import {
  Paper,
  Avatar,
  Typography,
  Box,
  Stack,
  Button,
  IconButton
} from "@mui/material";
import { Settings, Phone, Instagram, Language } from "@mui/icons-material";
import avatarImg from "../../assets/logoai.png";
import "./ProfileCard.css";

const ProfileCard = ({ 
  profile, 
  previewLogo, 
  onEditOpen, 
  onTabChange 
}) => {
  return (
    <Paper elevation={6} className="profile-card">
      <IconButton onClick={onEditOpen} className="profile-edit-button">
        <Settings />
      </IconButton>
      
      <Avatar
        alt="noghte.ai logo"
        src={previewLogo || avatarImg}
        className="profile-avatar"
      >
        ن
      </Avatar>
      
      <Box className="profile-info">
        <Typography variant="h5" className="profile-name">{profile.name}</Typography>
        <Typography variant="body2" className="profile-description" color="text.secondary">
          {profile.description}
        </Typography>
        
        <Stack direction="row"  className="profile-buttons">
          
          <Button size="small" variant="outlined" onClick={() => onTabChange(0)}>
            پست‌ها
          </Button>

          <Button size="small" variant="outlined" onClick={() => onTabChange(1)}>
            درباره ما
          </Button>
          
          <Button size="small" variant="outlined" onClick={() => onTabChange(2)}>
            تماس
          </Button>
        </Stack>
      </Box>

      {/* خط جداکننده */}
      <Box className="profile-divider" />

      {/* اطلاعات تماس با آیکون */}
      <Stack direction="row"  className="profile-contact">
        <Box className="contact-item">
          <Phone className="contact-icon" />
          <Typography variant="caption" className="contact-info">
            {profile.phone}
          </Typography>
        </Box>
        <Box className="contact-item">
          <Instagram className="contact-icon" />
          <Typography variant="caption" className="contact-info">
            {profile.instagram}
          </Typography>
        </Box>
        <Box className="contact-item">
          <Language className="contact-icon" />
          <Typography variant="caption" className="contact-info">
            {profile.website}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default ProfileCard;