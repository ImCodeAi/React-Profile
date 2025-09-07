// src/components/PostSkeleton/PostSkeleton.jsx
import React from 'react';
import './PostSkeleton.css';

const PostSkeleton = () => {
  return (
    <div className="post-skeleton">
      {/* اسکلت برای تصویر */}
      <div className="skeleton-image"></div>
      
      <div className="skeleton-content">
        {/* اسکلت برای عنوان */}
        <div className="skeleton-title"></div>
        
        {/* اسکلت برای متن (۳ خط) */}
        <div className="skeleton-text"></div>
        <div className="skeleton-text short"></div>
        <div className="skeleton-text very-short"></div>
      </div>
    </div>
  );
};

export default PostSkeleton;