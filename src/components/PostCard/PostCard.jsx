// src/components/PostCard/PostCard.jsx
import React from 'react';
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box
} from "@mui/material";
import "./PostCard.css";

const PostCard = ({ post, onOpen, fullWidth = false }) => {
  return (
    <Card className={`post-card ${fullWidth ? 'full-width' : ''}`}>
      <CardActionArea onClick={() => onOpen(post)} className="post-card-action">
        <Box 
          className="post-card-image"
          style={{ backgroundImage: `url(${post.image})` }}
        />
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