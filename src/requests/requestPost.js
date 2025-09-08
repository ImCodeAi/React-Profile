// src/requests/requestPost.js
const API_BASE_URL = 'https://dummyjson.com';

export const fetchPosts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts?limit=10`);
    
    if (!response.ok) {
      throw new Error(`خطا در دریافت داده‌ها: ${response.status}`);
    }
    
    const data = await response.json();
    
    // فرمت کردن پست‌های دریافتی برای سازگاری با ساختار برنامه
    const formattedPosts = data.posts.map(post => ({
      ...post,
      code: `POST-${post.id}`, // کد مخصوص
      price: Math.floor(Math.random() * 100) + 10, // قیمت رندوم 10-110
      excerpt: post.body.substring(0, 100) + '...',
      image: `https://picsum.photos/400/200?random=${post.id}`,
      content: post.body
    }));
    
    return formattedPosts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};



/**
 * به‌روزرسانی پست
 * @param {number} postId - شناسه پست
 * @param {Object} postData - داده‌های جدید پست
 * @returns {Promise<Object>} پست به‌روز شده
 */
export const updatePost = async (postId, postData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData)
    });
    
    if (!response.ok) {
      throw new Error(`خطا در به‌روزرسانی پست: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

/**
 * حذف پست
 * @param {number} postId - شناسه پست
 * @returns {Promise<Object>} نتیجه حذف
 */
export const deletePost = async (postId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`خطا در حذف پست: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};