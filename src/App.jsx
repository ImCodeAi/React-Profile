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
import Loader from "./components/Loader/Loader";

// داده‌های ثابت پروژه
import { POSTS, INITIAL_PROFILE } from "./data/constants";

// ماژول درخواست‌های API
import { fetchPosts } from "./requests/requestPost";

// Context سبد خرید
import { CartProvider } from "./contexts/CartContext";

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
  const [previewLogo, setPreviewLogo] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
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
  }, []);

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
      secondary: { main: "#ff4081" },
      background: {
        default: dark ? '#1a1a1a' : '#f5f5f5',
        paper: dark ? '#2a2a2a' : '#ffffff'
      }
    },
    typography: {
      fontFamily: "'Vazirmatn', 'IRANSansX', 'Roboto', 'Tahoma', 'Segoe UI', 'Arial', sans-serif",
    },
    shape: {
      borderRadius: 12
    }
  }), [dark]);

  // دریافت پست‌ها از API با استفاده از ماژول جداگانه
  useEffect(() => {
    const getPosts = async () => {
      const startTime = Date.now();
      const minLoadingTime = 2000; // حداقل ۲ ثانیه نمایش لودر

      try {
        setLoading(true);
        setInitialLoading(true);

        // تاخیر عمدی برای نمایش اسکلت‌ها
        await new Promise(resolve => setTimeout(resolve, 1500));

        const apiPosts = await fetchPosts();
        setPosts(apiPosts);
        setError(null);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('خطا در دریافت پست‌ها - از داده محلی استفاده می‌شود');
        setPosts(POSTS);
      } finally {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = minLoadingTime - elapsedTime;

        if (remainingTime > 0) {
          setTimeout(() => {
            setLoading(false);
            setInitialLoading(false);
          }, remainingTime);
        } else {
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
    <CartProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <GlobalStyles
          styles={{
            body: {
              backgroundColor: dark ? '#1a1a1a' : '#f5f5f5',
              margin: 0,
              padding: 0,
              minHeight: '100vh',
              transition: 'background-color 0.3s ease'
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
          background: "transparent",
          transition: 'all 0.3s ease'
        }}>

          <Header dark={dark} setDark={setDark} />
          
          <Box sx={{ width: "100%", px: 2, mt: 2 }}>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              px: 1
            }}>
              <ProfileCard
                profile={profile}
                previewLogo={previewLogo}
                onEditOpen={() => setEditOpen(true)}
                onTabChange={setTab}
              />
            </Box>

            <Box sx={{
              bgcolor: "background.paper",
              borderRadius: 3,
              p: 3,
              mt: 2,
              width: "100%",
              boxShadow: dark 
                ? '0 8px 32px rgba(0,0,0,0.3)' 
                : '0 8px 32px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease'
            }}>

              <TabsSection tab={tab} setTab={setTab} />

              {tab === 0 && (
                <Box sx={{ mt: 3 }}>
                  <div className="search-container">
                    <SearchBox query={query} setQuery={setQuery} />
                  </div>

                  {loading && (
                    <Box sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      gap: 2,
                      mt: 3
                    }}>
                      {[1, 2, 3, 4, 5].map((item) => (
                        <PostSkeleton key={item} />
                      ))}
                    </Box>
                  )}

                  {error && (
                    <Box textAlign="center" py={4}>
                      <Alert severity="warning" sx={{ mb: 2 }}>
                        <Typography variant="body2">
                          {error}
                        </Typography>
                      </Alert>
                    </Box>
                  )}

                  {!loading && !error && (
                    <div className="posts-center-container">
                      <Grid container spacing={3} className="posts-grid">
                        {/* پیام وقتی نتیجه‌ای نیست */}
                        {filteredPosts.length === 0 && query && (
                          <Grid item xs={12} sx={{ textAlign: 'center', py: 4 }}>
                            <Typography variant="h6" color="textSecondary" gutterBottom>
                              🔍 نتیجه‌ای یافت نشد
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              عبارت جستجو شده: "{query}"
                            </Typography>
                          </Grid>
                        )}

                        {/* نمایش پست‌ها */}
                        {filteredPosts.map((post) => (
                          <Grid item xs={12} sm={6} md={4} key={post.id}>
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
            <Alert 
              onClose={() => setSnackOpen(false)} 
              severity="success"
              sx={{ width: '100%' }}
            >
              پیام با موفقیت ارسال شد!
            </Alert>
          </Snackbar>

          <Footer />
        </Box>
      </ThemeProvider>
    </CartProvider>
  );
}

export default App;