// Tokyo Panel - Global JavaScript

// Cart functionality
class CartDrawer {
  constructor() {
    this.init();
  }

  init() {
    // Initialize cart drawer if needed
    console.log('Cart drawer initialized');
  }
}

// Product form handling
document.addEventListener('DOMContentLoaded', function() {
  // Handle variant selection
  const variantSelects = document.querySelectorAll('.variant-select');
  variantSelects.forEach(select => {
    select.addEventListener('change', function() {
      updateVariantPrice(this.value);
    });
  });

  // Initialize cart drawer
  if (typeof CartDrawer !== 'undefined') {
    new CartDrawer();
  }
});

function updateVariantPrice(variantId) {
  // This would typically fetch variant data from Shopify
  // For now, it's a placeholder
  console.log('Variant changed:', variantId);
}

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

