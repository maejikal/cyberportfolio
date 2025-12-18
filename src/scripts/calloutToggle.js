// Collapsible Callout Functionality
document.addEventListener('DOMContentLoaded', () => {
  const collapsibleCallouts = document.querySelectorAll('.callout-collapsible');
  
  collapsibleCallouts.forEach(callout => {
    const title = callout.querySelector('.callout-title');
    
    if (title) {
      title.addEventListener('click', () => {
        const isExpanded = callout.getAttribute('data-expanded') === 'true';
        callout.setAttribute('data-expanded', !isExpanded);
      });
    }
  });
});
