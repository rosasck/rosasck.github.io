document.addEventListener('DOMContentLoaded', function() {
  // Get all category buttons
  const categoryButtons = document.querySelectorAll('.category-btn');
  
  // Get all blog cards
  const blogCards = document.querySelectorAll('.blog-card');
  
  // Get search elements
  const searchInput = document.querySelector('.search-input');
  const searchButton = document.querySelector('.search-button');
  
  // Function to filter blog posts by category
  function filterPosts(category) {
    blogCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      
      if (category === 'all' || cardCategory === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Function to search posts
  function searchPosts(query) {
    const searchTerm = query.toLowerCase().trim();
    
    blogCards.forEach(card => {
      const title = card.querySelector('h2').textContent.toLowerCase();
      const excerpt = card.querySelector('p').textContent.toLowerCase();
      
      if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }
  
  // Add click event listeners to category buttons
  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get category from data attribute
      const category = this.getAttribute('data-category');
      
      // Filter posts
      filterPosts(category);
      
      // Update URL without reloading the page
      const url = new URL(window.location);
      if (category === 'all') {
        url.searchParams.delete('category');
      } else {
        url.searchParams.set('category', category);
      }
      window.history.pushState({}, '', url);
    });
  });

  // Add event listeners for search
  searchButton.addEventListener('click', function() {
    searchPosts(searchInput.value);
  });

  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      searchPosts(searchInput.value);
    }
  });
  
  // Check if there's a category in the URL on page load
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  
  if (categoryParam) {
    // Find the button with matching category
    const button = Array.from(categoryButtons).find(btn => 
      btn.getAttribute('data-category') === categoryParam
    );
    
    if (button) {
      // Remove active class from all buttons
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to matching button
      button.classList.add('active');
      
      // Filter posts
      filterPosts(categoryParam);
    }
  }
}); 