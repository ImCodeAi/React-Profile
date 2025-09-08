import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box,
  Stack,
  IconButton,
  Switch,
  FormControlLabel,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  Badge
} from "@mui/material";
import {
  GitHub,
  Instagram,
  LinkedIn,
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
  ShoppingCart
} from "@mui/icons-material";
import { useCart } from '../../contexts/CartContext';
import CartDrawer from '../CartDrawer/CartDrawer';
import avatarImg from "../../assets/logoai.png";
import "./Header.css";


const Header = ({ dark, setDark }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { getCartItemsCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const progress = Math.min(scrollTop / 100, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const blurAmount = scrollProgress * 20;
  const opacity = 0.8 + (scrollProgress * 0.15);
  const background = `rgba(11, 94, 215, ${opacity})`;

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const toggleCart = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setCartOpen(open);
  };

  const menuItems = (
    <>
      <IconButton aria-label="cart" color="inherit" onClick={toggleCart(true)}>
        <Badge badgeContent={getCartItemsCount()} color="secondary">
          <ShoppingCart />
        </Badge>
      </IconButton>
      <FormControlLabel
        control={
          <Switch
            checked={dark}
            onChange={() => setDark((s) => !s)}
            inputProps={{ "aria-label": "تم" }}
          />
        }
        label={dark ? <Brightness4 /> : <Brightness7 />}
        className="theme-switch"
      />
      <IconButton aria-label="github" color="inherit">
        <GitHub />
      </IconButton>
      <IconButton aria-label="instagram" color="inherit">
        <Instagram />
      </IconButton>
      <IconButton aria-label="linkedin" color="inherit">
        <LinkedIn />
      </IconButton>
    </>
  );

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem>
          <FormControlLabel
            control={
              <Switch
                checked={dark}
                onChange={() => setDark((s) => !s)}
                inputProps={{ "aria-label": "تم" }}
              />
            }
            label={
              <ListItemIcon>
                {dark ? <Brightness4 /> : <Brightness7 />}
              </ListItemIcon>
            }
          />
          <ListItemText primary={dark ? "تم تاریک" : "تم روشن"} />
        </ListItem>
        <Divider />
        <ListItem button onClick={toggleCart(true)}>
          <ListItemIcon>
            <Badge badgeContent={getCartItemsCount()} color="secondary">
              <ShoppingCart />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="سبد خرید" />
        </ListItem>
        <ListItem button component="a" href="https://github.com" target="_blank">
          <ListItemIcon>
            <GitHub />
          </ListItemIcon>
          <ListItemText primary="GitHub" />
        </ListItem>
        <ListItem button component="a" href="https://instagram.com" target="_blank">
          <ListItemIcon>
            <Instagram />
          </ListItemIcon>
          <ListItemText primary="Instagram" />
        </ListItem>
        <ListItem button component="a" href="https://linkedin.com" target="_blank">
          <ListItemIcon>
            <LinkedIn />
          </ListItemIcon>
          <ListItemText primary="LinkedIn" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky"
        color="primary" 
        elevation={0}
        sx={{
          top: 0,
          zIndex: 1100,
          background: background,
          backdropFilter: `blur(${blurAmount}px)`,
          WebkitBackdropFilter: `blur(${blurAmount}px)`,
          transition: 'all 0.3s ease-out',
          boxShadow: scrollProgress > 0 
            ? '0 4px 30px rgba(0, 0, 0, 0.1)'
            : 'none',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, #0b5ed7 0%, #0d6efd 100%)',
            opacity: 1 - scrollProgress,
            transition: 'opacity 0.3s ease-out',
            zIndex: -1
          }
        }}
      >
        <Toolbar className="header-toolbar" sx={{
          padding: scrollProgress > 0 ? '0.4rem 1rem' : '0.5rem 1rem',
          transition: 'padding 0.3s ease-out'
        }}>
          <Stack direction="row" spacing={2} alignItems="center" className="header-left">
            <Avatar 
              alt="noghte.ai" 
              src={avatarImg} 
              className="header-avatar"
              sx={{
                width: scrollProgress > 0 ? 45 : 50,
                height: scrollProgress > 0 ? 45 : 50,
                transition: 'all 0.3s ease-out'
              }}
            >
              ن
            </Avatar>
            <Box>
              <Typography variant="h6" className="header-title" sx={{
                fontSize: scrollProgress > 0 ? '1.1rem' : '1.25rem',
                transition: 'font-size 0.3s ease-out'
              }}>
                مرکز هوش مصنوعی نقطه
              </Typography>
              <Typography variant="caption" className="header-subtitle" sx={{
                opacity: 1 - (scrollProgress * 0.5),
                transition: 'opacity 0.3s ease-out'
              }}>
                آموزش هوش مصنوعی و برنامه‌نویسی
              </Typography>
            </Box>
          </Stack>

          {/* دسکتاپ */}
          {!isMobile && (
            <Stack direction="row" alignItems="center" spacing={1} className="header-right">
              {menuItems}
            </Stack>
          )}

          {/* موبایل و تبلت */}
          {isMobile && (
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton aria-label="cart" color="inherit" onClick={toggleCart(true)}>
                <Badge badgeContent={getCartItemsCount()} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="open menu"
                onClick={toggleDrawer(true)}
                className="menu-button"
              >
                <MenuIcon />
              </IconButton>
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer برای موبایل */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            color: '#fff',
          },
          '& .MuiListItemIcon-root': {
            color: '#fff !important',
          },
          '& .MuiSvgIcon-root': {
            color: '#fff !important',
          },
          '& .MuiListItemText-primary': {
            color: '#fff !important',
          },
          '& .MuiTypography-root': {
            color: '#fff !important',
          }
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Drawer سبد خرید */}
      
      <CartDrawer open={cartOpen} onClose={toggleCart(false)} />
    </>
  );
};

export default React.memo(Header);