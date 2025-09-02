// src/components/TabsSection/TabsSection.jsx
import React from 'react';
import { Tabs, Tab, Box } from "@mui/material";
import {
  Article, // آیکن پست‌ها
  Info, // آیکن درباره ما
  ContactMail // آیکن تماس
} from "@mui/icons-material";
import "./TabsSection.css";

const TabsSection = ({ tab, setTab }) => {
  return (
    <Box className="tabs-container">
      <Tabs value={tab} onChange={(e, v) => setTab(v)} variant="fullWidth">
        <Tab 
          icon={<Article />} 
          label="پست‌ها"
          iconPosition="start"
        />
        <Tab 
          icon={<Info />} 
          label="درباره ما"
          iconPosition="start"
        />
        <Tab 
          icon={<ContactMail />} 
          label="تماس"
          iconPosition="start"
        />
      </Tabs>
    </Box>
  );
};

export default TabsSection;