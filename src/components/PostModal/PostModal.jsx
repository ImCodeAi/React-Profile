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
import { AddShoppingCart } from '@mui/icons-material';
import { useCart } from '../../contexts/CartContext';
import "./PostModal.css";

const PostModal = ({ post, onClose }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(post);
    onClose(); // بستن مودال بعد از افزودن به سبد
  };

  if (!post) return null;

  return (
    <Dialog open={!!post} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="modal-title">
        {post.title}
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          کد: {post.code} | قیمت: {post.price?.toLocaleString()} تومان
        </Typography>
      </DialogTitle>
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
      <DialogActions sx={{ justifyContent: 'space-between', px: 3 }}>
        <Button onClick={onClose}>بستن</Button>
        <Button 
          variant="contained" 
          startIcon={<AddShoppingCart />}
          onClick={handleAddToCart}
          color="primary"
        >
          افزودن به سبد خرید
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostModal;