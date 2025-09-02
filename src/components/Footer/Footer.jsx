// src/components/Footer/Footer.jsx
import React from 'react';
import { Container, Typography, Box, Stack, IconButton, Divider, Tooltip } from "@mui/material";
import { GitHub, Instagram, LinkedIn, Email, Phone, LocationOn, Rocket, Code } from "@mui/icons-material";
import "./Footer.css";

const Footer = () => {
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4140.234567890123!2d52.65789123456789!3d36.55123456789012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDMzJzA0LjQiTiA1MsKwMzknMzEuNiJF!5e0!3m2!1sen!2sir!4v1234567890123!5m2!1sen!2sir";

  return (
    <Box component="footer" className="footer">
      <Container maxWidth="xl" className="footer-container">
        
        {/* تغییر اینجا: Stack به div */}
        <div className="footer-sections">
          
          {/* برند */}
          <Box className="footer-brand">
            <Stack direction="row" alignItems="center" spacing={1} className="brand-logo">
              <Rocket className="logo-icon" sx={{ color: 'white' }} />
              <Typography variant="h5" className="brand-name">
                نقطه‌ AI
              </Typography>
            </Stack>
            <Typography variant="body2" className="brand-description">
              پیشرو در آموزش‌های هوش مصنوعی و تکنولوژی‌های مدرن
            </Typography>
          </Box>

          {/* مپ */}
          <Box className="footer-section">
            <Typography variant="h6" className="section-title">
              آدرس ما
            </Typography>
            <Box className="map-container">
              <iframe
                src={mapUrl}
                width="100%"
                height="150"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="نقشه مازندران، بابل"
              />
            </Box>
          </Box>

          {/* تماس */}
          <Box className="footer-section">
            <Typography variant="h6" className="section-title">
              ارتباط با ما
            </Typography>
            <Stack spacing={1.5} className="contact-info" sx={{ gap: '12px' }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Phone className="contact-icon" />
                <Typography variant="body2">۰۹۱۱۱۱۹۰۶۰۲</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Email className="contact-icon" />
                <Typography variant="body2">info@noghteai.com</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <LocationOn className="contact-icon" />
                <Typography variant="body2">مازندران، بابل</Typography>
              </Stack>
            </Stack>
          </Box>

          {/* شبکه‌های اجتماعی */}
          <Box className="footer-section">
            <Typography variant="h6" className="section-title">
              ما را دنبال کنید
            </Typography>
            <Stack direction="row" spacing={1} className="social-icons">
              <Tooltip title="GitHub">
                <IconButton className="social-icon" aria-label="github">
                  <GitHub />
                </IconButton>
              </Tooltip>
              <Tooltip title="Instagram">
                <IconButton className="social-icon" aria-label="instagram">
                  <Instagram />
                </IconButton>
              </Tooltip>
              <Tooltip title="LinkedIn">
                <IconButton className="social-icon" aria-label="linkedin">
                  <LinkedIn />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>

        </div> {/* پایان footer-sections */}

        <Divider className="footer-divider" />

        <Box className="footer-bottom">
          <Stack direction="row" spacing={2} alignItems="center" className="tech-stack">
            <Code className="tech-icon" />
            <Typography variant="caption">
              ساخته شده با React • JS توسط ImCodeAI
            </Typography>
          </Stack>
          
          <Typography variant="caption" className="copyright">
            © {new Date().getFullYear()} 
            <span className="highlight"> نقطه‌AI </span>
            - تمام حقوق محفوظ است
          </Typography>
        </Box>

      </Container>
    </Box>
  );
};

export default Footer;