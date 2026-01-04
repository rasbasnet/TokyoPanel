// Tokyo Panel - Global JavaScript

// Cart functionality
class CartManager {
  constructor() {
    this.init();
  }

  init() {
    this.updateCartCount();
    // Listen for cart updates
    document.addEventListener('cart:updated', () => {
      this.updateCartCount();
    });
  }

  async updateCartCount() {
    try {
      const response = await fetch(window.routes.cart_url + '.js');
      const cart = await response.json();
      const cartCountElements = document.querySelectorAll('.cart-count');
      cartCountElements.forEach(el => {
        if (cart.item_count > 0) {
          el.textContent = `(${cart.item_count})`;
          el.style.display = 'inline';
        } else {
          el.style.display = 'none';
        }
      });
    } catch (error) {
      console.error('Error updating cart count:', error);
    }
  }

  async addToCart(variantId, quantity = 1) {
    try {
      const formData = new FormData();
      formData.append('id', variantId);
      formData.append('quantity', quantity);

      const response = await fetch(window.routes.cart_add_url, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Dispatch cart update event
      document.dispatchEvent(new CustomEvent('cart:updated'));
      
      // Show notification
      if (typeof showCartNotification === 'function') {
        showCartNotification('Item added to cart!');
      }

      return data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert(error.message || 'An error occurred. Please try again.');
      throw error;
    }
  }
}

// Initialize cart manager
let cartManager;
document.addEventListener('DOMContentLoaded', function() {
  cartManager = new CartManager();
  // Make cart manager globally accessible
  window.cartManager = cartManager;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add glow effect on scroll
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

