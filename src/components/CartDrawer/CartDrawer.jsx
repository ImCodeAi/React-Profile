// src/components/CartDrawer/CartDrawer.jsx
import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  Divider,
  Button,
  Chip
} from '@mui/material';
import {
  Close,
  Delete,
  ShoppingCartCheckout
} from '@mui/icons-material';
import { useCart } from '../../contexts/CartContext';
import './CartDrawer.css';

const CartDrawer = ({ open, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleIncreaseQuantity = (item) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      handleRemoveItem(item.id);
    }
  };

  const handleCheckout = () => {
    alert('خرید با موفقیت انجام شد!');
    clearCart();
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      className="cart-drawer"
    >
      <Box className="cart-drawer-container">
        {/* هدر */}
        <Box className="cart-header">
          <Typography variant="h5" className="cart-title">
            🛒 سبد خرید
          </Typography>
          <IconButton onClick={onClose} className="close-btn">
            <Close />
          </IconButton>
        </Box>

        <Divider className="cart-divider" />

        {/* محتوای سبد خرید */}
        <Box className="cart-content">
          {cartItems.length === 0 ? (
            <Box className="empty-cart">
              <Box className="empty-cart-icon">🛒</Box>
              <Typography variant="h6" className="empty-cart-title">
                سبد خرید خالی است
              </Typography>
              <Typography variant="body2" className="empty-cart-text">
                محصولاتی را به سبد خرید اضافه کنید
              </Typography>
            </Box>
          ) : (
            <List className="cart-items-list">
              {cartItems.map((item) => (
                <ListItem key={item.id} className="cart-item">
                  <Box className="item-content">
                    <Typography variant="subtitle1" className="item-title" title={item.title}>
                      {item.title}
                    </Typography>
                    
                    <Box className="item-bottom-row">
                      <Box className="item-meta">
                        <Typography variant="caption" className="item-code">
                          کد: {item.code}
                        </Typography>
                        <Typography variant="body2" className="item-price">
                          {item.price?.toLocaleString()} تومان
                        </Typography>
                      </Box>
                      
                      <Box className="item-actions">
                        <Box className="quantity-controls">
                          <Chip
                            label="-"
                            size="small"
                            onClick={() => handleDecreaseQuantity(item)}
                            className="quantity-btn decrease"
                          />
                          <Typography variant="body2" className="quantity-number">
                            {item.quantity}
                          </Typography>
                          <Chip
                            label="+"
                            size="small"
                            onClick={() => handleIncreaseQuantity(item)}
                            className="quantity-btn increase"
                          />
                        </Box>
                        <IconButton
                          onClick={() => handleRemoveItem(item.id)}
                          className="delete-btn"
                          size="small"
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>
          )}
        </Box>

        {/* فوتر و جمع کل */}
        {cartItems.length > 0 && (
          <Box className="cart-footer">
            <Box className="items-count-footer">
              <Typography variant="body2" className="items-count-text">
                {cartItems.length} آیتم در سبد شما
              </Typography>
            </Box>
            
            <Divider className="footer-divider" />
            
            <Box className="total-section">
              <Box className="total-info">
                <Typography variant="body1" className="total-label">
                  جمع کل:
                </Typography>
                <Typography variant="h6" className="total-amount">
                  {getCartTotal().toLocaleString()} تومان
                </Typography>
              </Box>
              
              <Button
                variant="contained"
                fullWidth
                size="medium"
                startIcon={<ShoppingCartCheckout />}
                onClick={handleCheckout}
                className="checkout-btn"
              >
                پرداخت
              </Button>
              
              <Typography variant="caption" className="checkout-note">
                هزینه حمل در پرداخت محاسبه می‌شود
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default CartDrawer;