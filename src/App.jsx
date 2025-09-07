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
import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/700.css";
import "./App.css";

// کامپوننت‌های پروژه
import Header from "./components/Header/Header";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import PostCard from "./components/PostCard/PostCard";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactForm from "./components/ContactForm/ContactForm";
import PostModal from "./components/PostModal/PostModal";
import EditProfileModal from "./components/EditProfileModal/EditProfileModal";
import Footer from "./components/Footer/Footer";
import TabsSection from "./components/TabsSection/TabsSection";
import AboutContent from "./components/AboutContent/AboutContent";
import PostSkeleton from "./components/PostSkeleton/PostSkeleton";
import Loader from "./components/Loader/Loader"; // اضافه شده

// داده‌های ثابت پروژه
import { POSTS, INITIAL_PROFILE } from "./data/constants";
import avatarImg from "./assets/logoai.png";

// ماژول درخواست‌های API
import { fetchPosts } from "./requests/requestPost";



function App() {
  // Stateهای مدیریت وضعیت
  const [dark, setDark] = useState(false);
  const [tab, setTab] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [previewLogo, setPreviewLogo] = useState(avatarImg);
  const [editOpen, setEditOpen] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false); // اضافه شده

  const [posts, setPosts] = useState(POSTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // توابع بهینه‌سازی شده با useCallback
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

  // تم MUI با پشتیبانی از حالت تاریک
  const theme = useMemo(() => createTheme({
    palette: {
      mode: dark ? "dark" : "light",
      primary: { main: "#0b5ed7" },
      background: {
        default: dark ? '#1a1a1a' : '#f5f5f5',
        paper: dark ? '#2a2a2a' : '#ffffff'
      }
    },
    typography: {
      fontFamily: "'Vazirmatn', 'IRANSansX', 'Roboto', 'Tahoma', 'Segoe UI', 'Arial', sans-serif",
    },
  }), [dark]);

  // دریافت پست‌ها از API با استفاده از ماژول جداگانه
  useEffect(() => {
    const getPosts = async () => {
      const startTime = Date.now();
      const minLoadingTime = 1000; // حداقل ۲ ثانیه نمایش لودر

      try {
        setLoading(true);

        // تاخیر عمدی ۱.۵ ثانیه‌ای برای نمایش اسکلت‌ها
        await new Promise(resolve => setTimeout(resolve, 1000));

        const apiPosts = await fetchPosts();
        setPosts(apiPosts);
        setError(null);
      } catch (err) {
        setError('خطا در دریافت پست‌ها - از داده محلی استفاده می‌شود');
        setPosts(POSTS);
      } finally {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = minLoadingTime - elapsedTime;

        if (remainingTime > 0) {
          // اگر زمان باقی مونده، صبر کن سپس لودینگ رو غیرفعال کن
          setTimeout(() => {
            setLoading(false);
            setInitialLoading(false);
          }, remainingTime);
        } else {
          // اگر زمان کافی گذشته، بلافاصله غیرفعال کن
          setLoading(false);
          setInitialLoading(false);
        }
      }
    };

    getPosts();
  }, []);


  // فیلتر کردن پست‌ها بر اساس جستجو (فقط عنوان)
  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;

    // فقط در عنوان جستجو کن
    return posts.filter(p => p.title.toLowerCase().includes(q));
  }, [query, posts]);

  // لودینگ اولیه全局
  if (initialLoading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            body: {
              backgroundColor: dark ? '#1a1a1a' : '#f5f5f5',
              margin: 0,
              padding: 0,
              minHeight: '100vh',
              overflow: 'hidden'
            }
          }}
        />
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: dark ? '#1a1a1a' : '#f5f5f5',
            zIndex: 9999
          }}
          data-theme={dark ? "dark" : "light"}
        >
          <Loader />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <GlobalStyles
        styles={{
          body: {
            backgroundColor: dark ? '#1a1a1a' : '#f5f5f5',
            margin: 0,
            padding: 0,
            minHeight: '100vh'
          },
          html: {
            backgroundColor: dark ? '#1a1a1a' : '#f5f5f5',
            height: '100%'
          },
          '#root': {
            backgroundColor: dark ? '#1a1a1a' : '#f5f5f5',
            minHeight: '100vh'
          }
        }}
      />

      <Box sx={{
        minHeight: "100vh",
        bgcolor: "transparent",
        direction: "rtl",
        background: "transparent"
      }}>

        <Header dark={dark} setDark={setDark} />

        <Box sx={{
          height: { xs: 160, md: 240 },
          backgroundImage: "linear-gradient(180deg, rgba(11,94,215,0.15), rgba(11,94,215,0.05)), url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
        }} />

        <Box sx={{ width: "100%", px: 2 }}>

          <ProfileCard
            profile={profile}
            previewLogo={previewLogo}
            onEditOpen={() => setEditOpen(true)}
            onTabChange={setTab}
          />

          <Box sx={{
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 2,
            width: "100%",
            boxShadow: dark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.1)'
          }}>

            <TabsSection tab={tab} setTab={setTab} />

            {tab === 0 && (
              <Box>
                <div className="search-container">
                  <SearchBox query={query} setQuery={setQuery} />
                </div>

                {loading && (
                  <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    ...(dark && { 'data-theme': 'dark' }) // اضافه کردن تم تاریک اگر فعال باشد
                  }}>
                    <PostSkeleton />
                    <PostSkeleton />
                    <PostSkeleton />
                    <PostSkeleton />
                    <PostSkeleton />
                  </Box>
                )}

                {error && (
                  <Box textAlign="center" py={4}>
                    <Typography color="error" style={{ textAlign: 'center', direction: 'rtl' }}>
                      {error}
                    </Typography>
                  </Box>
                )}

                {!loading && !error && (
                  <div className="posts-center-container">
                    <Grid container spacing={2} className="posts-grid">
                      {/* پیام وقتی نتیجه‌ای نیست */}
                      {filteredPosts.length === 0 && query && (
                        <Grid item xs={12} style={{ textAlign: 'center', padding: '2rem', direction: 'rtl' }}>
                          <Typography variant="h6" color="textSecondary" gutterBottom > 
                            🔍 نتیجه‌ای یافت نشد
                          </Typography>
                          
                        </Grid>
                      )}

                      {/* نمایش پست‌ها */}
                      {filteredPosts.map((post) => (
                        <Grid item key={post.id}>
                          <PostCard post={post} onOpen={setSelectedPost} />
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                )}


              </Box>
            )}

            {tab === 1 && <AboutContent />}

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

        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />

        <EditProfileModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          profile={profile}
          setProfile={setProfile}
          previewLogo={previewLogo}
          onLogoChange={handleLogoChange}
        />

        <Snackbar
          open={snackOpen}
          autoHideDuration={3000}
          onClose={() => setSnackOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={() => setSnackOpen(false)} severity="success">
            پیام با موفقیت ارسال شد!
          </Alert>
        </Snackbar>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;