// Main JavaScript file for portfolio website

// DOM elements
const menuBtn = document.getElementById('menuBtn');
const menuIcon = document.getElementById('menuIcon');
const closeIcon = document.getElementById('closeIcon');
const mobileMenu = document.getElementById('mobileMenu');
const themeToggle = document.getElementById('themeToggle');
const contactForm = document.getElementById('contactForm');
const submitText = document.getElementById('submitText');
const submitSpinner = document.getElementById('submitSpinner');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');
const navLinks = document.querySelectorAll('header a[href^="#"]');
const currentYearElement = document.getElementById('currentYear');

// Initialize AOS animations
document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS animation library
  AOS.init({
    duration: 800,
    once: true, // whether animation should happen only once - while scrolling down
    easing: 'ease-in-out',
  });
  
  // Set current year in footer
  const currentYear = new Date().getFullYear();
  if (currentYearElement) {
    currentYearElement.textContent = currentYear;
  }
  
  // Check for saved theme preference
  checkThemePreference();
  
  // Activate nav link based on scroll position
  highlightNavOnScroll();
});

// Mobile menu toggle
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
  });
}

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (!mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }
  });
});

// Theme toggle functionality
if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

// Function to toggle dark/light theme
function toggleTheme() {
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
}

// Check saved theme preference
function checkThemePreference() {
  // Check for saved theme preference or use device preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

// Handle contact form submission
if (contactForm) {
  contactForm.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  // Show spinner, hide submit text
  submitText.classList.add('hidden');
  submitSpinner.classList.remove('hidden');
  
  // Hide any previous form messages
  formSuccess.classList.add('hidden');
  formError.classList.add('hidden');
  
  // Get form data
  const formData = new FormData(contactForm);
  const formProps = Object.fromEntries(formData);
  
  // Send form data using EmailJS (you need to sign up and configure your template)
  // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', and 'YOUR_USER_ID' with your EmailJS credentials
  // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formProps, 'YOUR_USER_ID')
  
  // For this demo, we'll simulate a successful submission after a delay
  setTimeout(() => {
    // Simulating successful submission
    const success = Math.random() > 0.2; // 80% success rate for demo
    
    if (success) {
      // Show success message
      formSuccess.classList.remove('hidden');
      contactForm.reset();
    } else {
      // Show error message
      formError.classList.remove('hidden');
    }
    
    // Hide spinner, show submit text
    submitText.classList.remove('hidden');
    submitSpinner.classList.add('hidden');
  }, 1500);
  
  // Uncomment below and remove the setTimeout simulation when you have EmailJS set up
  /*
  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formProps, 'YOUR_USER_ID')
    .then(() => {
      // Show success message
      formSuccess.classList.remove('hidden');
      contactForm.reset();
      
      // Hide spinner, show submit text
      submitText.classList.remove('hidden');
      submitSpinner.classList.add('hidden');
    }, (error) => {
      // Show error message
      formError.classList.remove('hidden');
      console.log('EmailJS error:', error);
      
      // Hide spinner, show submit text
      submitText.classList.remove('hidden');
      submitSpinner.classList.add('hidden');
    });
  */
}

// Highlight active nav link based on scroll position
function highlightNavOnScroll() {
  // Get all sections that have an ID defined
  const sections = document.querySelectorAll('section[id]');
  
  // Add event listener for scroll
  window.addEventListener('scroll', () => {
    // Get current scroll position
    const scrollY = window.pageYOffset;
    
    // Loop through sections to get height, top and ID values for each
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100; // Offset for navbar height
      const sectionId = section.getAttribute('id');
      
      // If our current scroll position is within the bounds of this section
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        // Remove active class from all nav links
        navLinks.forEach(link => {
          link.classList.remove('text-primary');
        });
        
        // Add active class to corresponding nav link
        const correspondingLink = document.querySelector(`header a[href="#${sectionId}"]`);
        if (correspondingLink) {
          correspondingLink.classList.add('text-primary');
        }
      }
    });
  });
}