// src/App.jsx

import React, { useMemo, useState, useCallback, useEffect } from "react";
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline, 
  GlobalStyles,
  Box, 
  Grid, 
  Snackbar, 
  Alert, 
  Typography 
} from "@mui/material";
import "@fontsource/vazirmatn/400.css"; // فونت وزیر برای وزن نرمال
import "@fontsource/vazirmatn/700.css"; // فونت وزیر برای وزن پررنگ (bold)

// ==================== کامپوننت‌های پروژه ====================
import Header from "./components/Header/Header"; // هدر اصلی برنامه
import ProfileCard from "./components/ProfileCard/ProfileCard"; // کارت پروفایل کاربر
import PostCard from "./components/PostCard/PostCard"; // کارت نمایش پست
import SearchBox from "./components/SearchBox/SearchBox"; // جعبه جستجو
import ContactForm from "./components/ContactForm/ContactForm"; // فرم تماس
import PostModal from "./components/PostModal/PostModal"; // مودال نمایش کامل پست
import EditProfileModal from "./components/EditProfileModal/EditProfileModal"; // مودال ویرایش پروفایل
import Footer from "./components/Footer/Footer"; // فوتر برنامه
import TabsSection from "./components/TabsSection/TabsSection"; // بخش تب‌ها
import AboutContent from "./components/AboutContent/AboutContent"; // محتوای بخش درباره ما

// ==================== داده‌های ثابت پروژه ====================
import { POSTS, INITIAL_PROFILE } from "./data/constants"; // داده‌های اولیه پست‌ها و پروفایل
import avatarImg from "./assets/logoai.png"; // تصویر پیش‌فرض آواتار

function App() {
  // ==================== STATEهای مدیریت وضعیت ====================
  const [dark, setDark] = useState(false); // حالت تاریک/روشن - کنترل تم برنامه
  const [tab, setTab] = useState(0); // تب فعال (0: پست‌ها, 1: درباره ما, 2: تماس)
  const [selectedPost, setSelectedPost] = useState(null); // پست انتخاب شده برای نمایش در مودال
  const [name, setName] = useState(""); // نام کاربر در فرم تماس
  const [message, setMessage] = useState(""); // پیام کاربر در فرم تماس
  const [snackOpen, setSnackOpen] = useState(false); // وضعیت نمایش snackbar اطلاع‌رسانی
  const [query, setQuery] = useState(""); // متن جستجو برای فیلتر کردن پست‌ها
  const [profile, setProfile] = useState(INITIAL_PROFILE); // اطلاعات پروفایل کاربر
  const [previewLogo, setPreviewLogo] = useState(avatarImg); // پیش‌نمایش تصویر لوگو/آواتار
  const [editOpen, setEditOpen] = useState(false); // وضعیت باز/بسته بودن مودال ویرایش پروفایل
  
  const [posts, setPosts] = useState(POSTS); // لیست پست‌ها (fallback به داده محلی در صورت خطا)
  const [loading, setLoading] = useState(false); // وضعیت لودینگ داده‌ها
  const [error, setError] = useState(null); // خطای احتمالی در دریافت داده‌ها

  // ==================== توابع بهینه‌سازی شده با useCallback ====================
  const handleSetName = useCallback((value) => {
    setName(value);
  }, []);

  const handleSetMessage = useCallback((value) => {
    setMessage(value);
  }, []);

  const handleSendMessage = useCallback(() => {
    setName("");
    setMessage("");
    setSnackOpen(true);
  }, [setName, setMessage, setSnackOpen]);

  const handleLogoChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewLogo(reader.result);
      reader.readAsDataURL(file);
    }
  }, []);

  // ==================== تم MUI با پشتیبانی از حالت تاریک ====================
  const theme = useMemo(() => createTheme({
    palette: { 
      mode: dark ? "dark" : "light", // حالت رنگ: تاریک یا روشن
      primary: { main: "#0b5ed7" }, // رنگ اصلی آبی - برای دکمه‌ها و هایلایت‌ها
      background: {
        default: dark ? '#1a1a1a' : '#f5f5f5', // رنگ پس‌زمینه اصلی: #1a1a1a در تاریک، #f5f5f5 در روشن
        paper: dark ? '#2a2a2a' : '#ffffff' // رنگ پس‌زمینه کامپوننت‌ها: #2a2a2a در تاریک، #ffffff در روشن
      }
    },
    typography: {
      // تنظیم فونت‌های فارسی و fallback به فونت‌های انگلیسی
      fontFamily: "'Vazirmatn', 'IRANSansX', 'Roboto', 'Tahoma', 'Segoe UI', 'Arial', sans-serif",
    },
  }), [dark]); // وابسته به حالت تاریک/روشن

  // ==================== دریافت پست‌ها از API (DummyJSON) ====================
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/posts?limit=10');
        const data = await response.json();
        
        // فرمت کردن پست‌های دریافتی از API برای سازگاری با ساختار برنامه
        const formattedPosts = data.posts.map(post => ({
          ...post,
          excerpt: post.body.substring(0, 100) + '...', // خلاصه پست (100 کاراکتر اول)
          image: `https://picsum.photos/400/200?random=${post.id}`, // تصویر رندوم برای هر پست
          content: post.body // محتوای کامل پست
        }));
        
        setPosts(formattedPosts);
      } catch (err) {
        setError('خطا در دریافت پست‌ها - از داده محلی استفاده می‌شود');
        setPosts(POSTS); // fallback به داده محلی در صورت خطا
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // فقط یک بار پس از mount اجرا شود

  // ==================== فیلتر کردن پست‌ها بر اساس جستجو ====================
  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts; // اگر جستجو خالی است، همه پست‌ها را برگردان
    return posts.filter(p => 
      p.title.toLowerCase().includes(q) || // جستجو در عنوان
      p.excerpt.toLowerCase().includes(q) // جستجو در خلاصه پست
    );
  }, [query, posts]); // وابسته به query و posts

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* ریست استایل‌های پیش‌فرض مرورگر و اعتماد تم MUI */}
      
      {/* ==================== Global Styles برای پس‌زمینه کل صفحه ==================== */}
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: dark ? '#1a1a1a' : '#f5f5f5', // پس‌زمینه body
            margin: 0,
            padding: 0,
            minHeight: '100vh'
          },
          html: {
            backgroundColor: dark ? '#1a1a1a' : '#f5f5f5', // پس‌زمینه html
            height: '100%'
          },
          '#root': {
            backgroundColor: dark ? '#1a1a1a' : '#f5f5f5', // پس‌زمینه root element
            minHeight: '100vh'
          }
        }}
      />

      {/* ==================== لایه اصلی برنامه ==================== */}
      <Box sx={{ 
        minHeight: "100vh", 
        bgcolor: "transparent", // شفاف برای نمایش پس‌زمینه global
        direction: "rtl", // جهت راست به چپ برای فارسی
        background: "transparent" // شفاف
      }}>
        
        {/* ==================== هدر برنامه ==================== */}
        <Header dark={dark} setDark={setDark} />
        
        {/* ==================== بخش کاور (هیرو) ==================== */}
        <Box sx={{
          height: { xs: 160, md: 240 }, // ارتفاع ریسپانسیو: 160px در موبایل، 240px در دسکتاپ
          backgroundImage: "linear-gradient(180deg, rgba(11,94,215,0.15), rgba(11,94,215,0.05)), url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover", // پوشش کامل فضای available
          backgroundPosition: "center", //居中تصویر
          width: "100%",
        }} />

        {/* ==================== محتوای اصلی برنامه ==================== */}
        <Box sx={{ width: "100%", px: 2 }}> {/* padding افقی */}
          
          {/* ==================== کارت پروفایل ==================== */}
          <ProfileCard 
            profile={profile}
            previewLogo={previewLogo}
            onEditOpen={() => setEditOpen(true)}
            onTabChange={setTab}
          />

          {/* ==================== بخش تب‌ها و محتوای مرتبط ==================== */}
          <Box sx={{ 
            bgcolor: "background.paper", // استفاده از رنگ paper از پالت تم
            borderRadius: 2, // شعاع حاشیه
            p: 2, // padding
            width: "100%",
            boxShadow: dark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.1)' // سایه متناسب با تم
          }}>
            
            {/* ==================== تب‌های اصلی ==================== */}
            <TabsSection tab={tab} setTab={setTab} />
            
            {/* ==================== تب پست‌ها ==================== */}
            {tab === 0 && (
              <Box>
                <div className="search-container">
                  <SearchBox query={query} setQuery={setQuery} />
                </div>
                
                {/* وضعیت لودینگ */}
                {loading && (
                  <Box textAlign="center" py={4}>
                    <Typography variant="h6" style={{ textAlign: 'right', direction: 'rtl' }}>
                      در حال دریافت پست‌ها...
                    </Typography>
                  </Box>
                )}
                
                {/* نمایش خطا */}
                {error && (
                  <Box textAlign="center" py={4}>
                    <Typography color="error" style={{ textAlign: 'right', direction: 'rtl' }}>
                      {error}
                    </Typography>
                  </Box>
                )}
                
                {/* نمایش پست‌ها */}
                {!loading && !error && (
                  <div className="posts-center-container">
                    <Grid container spacing={2} className="posts-grid">
                      {filteredPosts.map((post) => (
                        <Grid key={post.id}>
                        {/* <Grid item xs={12} sm={6} md={6} key={post.id}> */}

                          <PostCard post={post} onOpen={setSelectedPost} />
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                )}
              </Box>
            )}

            {/* ==================== تب درباره ما ==================== */}
            {tab === 1 && <AboutContent />}

            {/* ==================== تب تماس ==================== */}
            {tab === 2 && (
              <ContactForm
                name={name}
                message={message}
                setName={handleSetName}
                setMessage={handleSetMessage}
                onSend={handleSendMessage}
              />
            )}
          </Box>
        </Box>

        {/* ==================== مودال نمایش پست ==================== */}
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
        
        {/* ==================== مودال ویرایش پروفایل ==================== */}
        <EditProfileModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          profile={profile}
          setProfile={setProfile}
          previewLogo={previewLogo}
          onLogoChange={handleLogoChange}
        />

        {/* ==================== Snackbar برای اطلاع‌رسانی ==================== */}
        <Snackbar
          open={snackOpen}
          autoHideDuration={3000} // مدت زمان نمایش: 3 ثانیه
          onClose={() => setSnackOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // موقعیت نمایش
        >
          <Alert onClose={() => setSnackOpen(false)} severity="success">
            پیام با موفقیت ارسال شد!
          </Alert>
        </Snackbar>

        {/* ==================== فوتر برنامه ==================== */}
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;