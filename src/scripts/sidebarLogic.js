/**
 * Sidebar and TOC interaction logic
 * Handles: Back to Top, Tags toggle, TOC toggle, TOC building
 */

function initSidebarLogic() {
  // Back to Top functionality
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Desktop sidebar toggle
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebarTags = document.getElementById('sidebarTags');
  const sidebarChevron = document.getElementById('sidebarChevron');
  let sidebarVisible = true;

  if (sidebarToggle && sidebarTags && sidebarChevron) {
    sidebarToggle.addEventListener('click', () => {
      sidebarVisible = !sidebarVisible;
      if (sidebarVisible) {
        sidebarTags.classList.remove('hidden');
        sidebarChevron.style.transform = 'rotate(0deg)';
      } else {
        sidebarTags.classList.add('hidden');
        sidebarChevron.style.transform = 'rotate(-90deg)';
      }
    });
  }

  // Mobile toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileTags = document.getElementById('mobileTags');
  const mobileToggleText = document.getElementById('mobileToggleText');
  let mobileVisible = false;

  if (mobileToggle && mobileTags && mobileToggleText) {
    mobileToggle.addEventListener('click', () => {
      mobileVisible = !mobileVisible;
      if (mobileVisible) {
        mobileTags.classList.remove('hidden');
        mobileToggleText.textContent = mobileToggleText.textContent.replace('Show', 'Hide');
      } else {
        mobileTags.classList.add('hidden');
        mobileToggleText.textContent = mobileToggleText.textContent.replace('Hide', 'Show');
      }
    });
  }
}

function initTOCLogic() {
  // Build Table of Contents (TOC) from article headings
  const tocToggle = document.getElementById('tocToggle');
  const tocChevron = document.getElementById('tocChevron');
  const sidebarTOC = document.getElementById('sidebarTOC');
  const tocToggleText = document.getElementById('tocToggleText');

  const mobileTOCToggle = document.getElementById('mobileTOCToggle');
  const mobileTOCToggleText = document.getElementById('mobileTOCToggleText');
  const mobileTOC = document.getElementById('mobileTOC');

  function slugify(text) {
    return text.toString().toLowerCase().trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  function buildTOC() {
    const content = document.querySelector('article .prose');
    if (!content) return;

    // Find all headings (h1-h6) in the content
    const allHeadings = Array.from(content.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    if (!allHeadings.length) {
      if (sidebarTOC) sidebarTOC.innerHTML = '<p class="text-sm text-[var(--text-secondary)]">No headings</p>';
      if (mobileTOC) mobileTOC.innerHTML = '';
      return;
    }

    // Find the highest level (lowest number) heading
    const highestLevel = Math.min(...allHeadings.map(h => parseInt(h.tagName[1])));

    // Filter headings to only show the highest level
    const topLevelHeadings = allHeadings.filter(h => parseInt(h.tagName[1]) === highestLevel);

    if (!topLevelHeadings.length) {
      if (sidebarTOC) sidebarTOC.innerHTML = '<p class="text-sm text-[var(--text-secondary)]">No headings</p>';
      if (mobileTOC) mobileTOC.innerHTML = '';
      return;
    }

    const buildList = (container, isMobile = false) => {
      container.innerHTML = '';
      topLevelHeadings.forEach(h => {
        if (!h.id) h.id = slugify(h.textContent || '');
        const link = document.createElement('a');
        link.href = `#${h.id}`;
        link.className = isMobile ? 'text-sm text-[var(--text-primary)]' : 'text-sm';
        link.style = isMobile ? 'color: var(--accent-color);' : '';
        link.textContent = h.textContent || '';
        link.addEventListener('click', (e) => {
          e.preventDefault();
          document.getElementById(h.id).scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        container.appendChild(link);
      });
    };

    if (sidebarTOC) buildList(sidebarTOC, false);
    if (mobileTOC) buildList(mobileTOC, true);
  }

  // Initialize TOC on load
  document.addEventListener('DOMContentLoaded', buildTOC);

  // Desktop TOC toggle
  let tocVisible = true;
  if (tocToggle && sidebarTOC && tocChevron) {
    tocToggle.addEventListener('click', () => {
      tocVisible = !tocVisible;
      if (tocVisible) {
        sidebarTOC.classList.remove('hidden');
        tocChevron.style.transform = 'rotate(0deg)';
      } else {
        sidebarTOC.classList.add('hidden');
        tocChevron.style.transform = 'rotate(-90deg)';
      }
    });
  }

  // Mobile TOC toggle
  let mobileTOCVisible = false;
  if (mobileTOCToggle && mobileTOC && mobileTOCToggleText) {
    mobileTOCToggle.addEventListener('click', () => {
      mobileTOCVisible = !mobileTOCVisible;
      if (mobileTOCVisible) {
        mobileTOC.classList.remove('hidden');
        mobileTOCToggleText.textContent = mobileTOCToggleText.textContent.replace('Show', 'Hide');
      } else {
        mobileTOC.classList.add('hidden');
        mobileTOCToggleText.textContent = mobileTOCToggleText.textContent.replace('Hide', 'Show');
      }
    });
  }
}

// Initialize all sidebar/TOC logic when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initSidebarLogic();
    initTOCLogic();
  });
} else {
  initSidebarLogic();
  initTOCLogic();
}
