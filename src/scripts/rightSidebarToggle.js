// Toggle right sidebar visibility and article width
function initRightSidebarToggle() {
  const toggleBtn = document.getElementById('rightSidebarToggle');
  const rightSidebar = document.getElementById('rightSidebar');
  const articleContainer = document.querySelector('.article-and-sidebar');
  
  if (!toggleBtn || !rightSidebar || !articleContainer) return;

  // Check localStorage for saved preference
  const isHidden = localStorage.getItem('rightSidebarHidden') === 'true';
  if (isHidden) {
    rightSidebar.classList.add('hidden');
    toggleBtn.classList.add('toggled');
    articleContainer.classList.add('sidebar-hidden');
  }

  toggleBtn.addEventListener('click', () => {
    const isCurrentlyHidden = rightSidebar.classList.contains('hidden');
    
    if (isCurrentlyHidden) {
      // Show sidebar
      rightSidebar.classList.remove('hidden');
      toggleBtn.classList.remove('toggled');
      articleContainer.classList.remove('sidebar-hidden');
      localStorage.setItem('rightSidebarHidden', 'false');
    } else {
      // Hide sidebar
      rightSidebar.classList.add('hidden');
      toggleBtn.classList.add('toggled');
      articleContainer.classList.add('sidebar-hidden');
      localStorage.setItem('rightSidebarHidden', 'true');
    }
  });
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRightSidebarToggle);
} else {
  initRightSidebarToggle();
}
