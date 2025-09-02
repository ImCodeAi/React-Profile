// src/components/ContactForm/ContactForm.jsx
import React, { memo } from 'react';
import { TextField, Button, Box, Typography } from "@mui/material";
import "./ContactForm.css";

const ContactForm = memo(({ name, message, setName, setMessage, onSend }) => {
  return (
    <Box className="contact-form-container">
      <Typography variant="h6" className="contact-title">
        تماس با ما
      </Typography>
      <Typography variant="body2" className="contact-subtitle" color="text.secondary">
        اگر سوالی داری یا می‌خوای همکاری کنیم، پیام بفرست.
      </Typography>

      <Box component="form" className="contact-form">
        <TextField
          label="نام"
          variant="outlined"
          size="small"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="contact-field"
          placeholder="نام خود را وارد کنید"
        />
        <TextField
          label="پیام"
          variant="outlined"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="contact-field"
          placeholder="پیام خود را وارد کنید"
        />
        <Button
          variant="contained"
          onClick={onSend}
          disabled={!name || !message}
          className="send-button"
        >
          ارسال پیام
        </Button>
      </Box>
    </Box>
  );
});

export default ContactForm;