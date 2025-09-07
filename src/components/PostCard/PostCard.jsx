// src/components/PostCard/PostCard.jsx
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box
} from "@mui/material";
import "./PostCard.css";

// ایمپورت تصویر پیش‌فرض
import defaultImage from "../../assets/default-post-image.jpg";

const PostCard = ({ post, onOpen, fullWidth = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  // استفاده از تصویر پیش‌فرض اگر خطا داشته باشه یا هنوز لود نشده
  const displayImage = imageError || !imageLoaded ? defaultImage : post.image;

  return (
    <Card className={`post-card ${fullWidth ? 'full-width' : ''}`}>
      <CardActionArea onClick={() => onOpen(post)} className="post-card-action">
        <Box 
          className="post-card-image"
          style={{ 
            backgroundImage: `url(${displayImage})`,
            position: 'relative'
          }}
        >
          {/* تصویر اصلی که مخفیانه لود میشه */}
          <img 
            src={post.image} 
            alt={post.title}
            style={{ 
              display: 'none'
            }}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          
          {/* افکت لودینگ فقط موقعی که تصویر اصلی در حال لود شدنه */}
          {!imageLoaded && !imageError && (
            <Box 
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(90deg, rgba(240,240,240,0.5) 25%, rgba(224,224,224,0.5) 50%, rgba(240,240,240,0.5) 75%)',
                backgroundSize: '200% 100%',
                animation: 'loading 1.5s infinite',
                backdropFilter: 'blur(2px)'
              }}
            />
          )}
        </Box>
        <CardContent className="post-card-content">
          <Typography variant="h6" className="post-title" noWrap>
            {post.title}
          </Typography>
          <Typography variant="body2" className="post-excerpt" color="text.secondary">
            {post.excerpt}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PostCard;