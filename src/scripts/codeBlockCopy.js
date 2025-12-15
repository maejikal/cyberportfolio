// Add copy buttons to all code blocks
function initCodeBlockCopy() {
  const codeBlocks = document.querySelectorAll('.prose pre');
  
  codeBlocks.forEach((pre, index) => {
    // Create wrapper around the pre element
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-container';
    
    // Insert wrapper before pre in DOM
    pre.parentNode.insertBefore(wrapper, pre);
    
    // Move pre into wrapper
    wrapper.appendChild(pre);
    
    // Create copy button
    const button = document.createElement('button');
    button.className = 'code-copy-btn';
    button.setAttribute('data-block-id', index);
    button.setAttribute('aria-label', 'Copy code');
    button.title = 'Copy code';
    button.innerHTML = `
      <svg class="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
      </svg>
    `;
    
    button.addEventListener('click', () => {
      const code = pre.textContent;
      navigator.clipboard.writeText(code).then(() => {
        // Show feedback
        const originalIcon = button.innerHTML;
        button.innerHTML = `
          <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        `;
        button.classList.add('copied');
        button.title = 'Copied!';
        
        // Reset after 2 seconds
        setTimeout(() => {
          button.innerHTML = originalIcon;
          button.classList.remove('copied');
          button.title = 'Copy code';
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy code:', err);
      });
    });
    
    // Insert button as sibling to pre (not inside it)
    wrapper.appendChild(button);
  });
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCodeBlockCopy);
} else {
  initCodeBlockCopy();
}
