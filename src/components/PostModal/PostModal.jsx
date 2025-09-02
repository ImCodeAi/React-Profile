// src/components/PostModal/PostModal.jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography
} from "@mui/material";
import "./PostModal.css";

const PostModal = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <Dialog open={!!post} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="modal-title">{post.title}</DialogTitle>
      <DialogContent dividers>
        <Box className="modal-image-container">
          <img 
            src={post.image} 
            alt={post.title}
            className="modal-image"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/800x400/0b5ed7/ffffff?text=AI+Image";
            }}
          />
        </Box>
        <Typography variant="body1" className="modal-content">
          {post.content}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>بستن</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostModal;