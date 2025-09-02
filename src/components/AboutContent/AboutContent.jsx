// src/components/AboutContent/AboutContent.jsx
import React from 'react';
import { Typography, Box } from "@mui/material";
import "./AboutContent.css";

const AboutContent = () => {
  return (
    <Box className="about-container">
      <Typography variant="h6" className="about-title">
        درباره مرکز هوش مصنوعی نقطه
      </Typography>
      <Typography variant="body1" className="about-description">
        مرکز هوش مصنوعی نقطه، اولین مرکز خصوصی هوش مصنوعی در مازندران (تأسیس
        ۱۴۰۱) است. تمرکز ما بر آموزش‌های پروژه‌محور در پایتون، یادگیری ماشین،
        یادگیری عمیق و بینایی ماشین است. هنرجویان با انجام پروژه‌های واقعی،
        نمونه‌کار حرفه‌ای می‌سازند و برای ورود به صنعت آماده می‌شوند.
      </Typography>

      <Typography variant="subtitle1" className="about-subtitle">
        خدمات
      </Typography>
      <ul className="about-list">
        <li>دوره‌های پایتون و مقدمات برنامه‌نویسی</li>
        <li>یادگیری ماشین و یادگیری عمیق</li>
        <li>بینایی ماشین و پردازش تصویر</li>
        <li>مشاوره و اجرای پروژه برای کسب‌وکارها</li>
      </ul>
    </Box>
  );
};

export default AboutContent;