import { visit } from 'unist-util-visit';

/**
 * Remark plugin to transform Obsidian-style callouts into HTML
 * Supports collapsible callouts with [!type]+ or [!type]-
 */
export default function remarkCallouts() {
  return (tree) => {
    visit(tree, 'blockquote', (node, index, parent) => {
      if (!node.children || node.children.length === 0) return;

      const firstChild = node.children[0];
      if (firstChild.type !== 'paragraph' || !firstChild.children) return;

      const firstText = firstChild.children[0];
      if (!firstText || firstText.type !== 'text') return;

      // Match Obsidian callout syntax: [!type] or [!type]+ or [!type]-
      const calloutMatch = firstText.value.match(/^\[!(\w+)\]([+-]?)\s*(.*)/);
      if (!calloutMatch) return;

      const [, type, expandState, title] = calloutMatch;
      const isCollapsible = expandState === '+' || expandState === '-';
      const isExpanded = expandState !== '-'; // Default expanded unless explicitly collapsed with -

      // Define callout types and their icons/colors
      const calloutTypes = {
        note: { icon: '📝', color: 'blue', title: 'Note' },
        tip: { icon: '💡', color: 'green', title: 'Tip' },
        important: { icon: '❗', color: 'purple', title: 'Important' },
        warning: { icon: '⚠️', color: 'yellow', title: 'Warning' },
        danger: { icon: '🔥', color: 'red', title: 'Danger' },
        info: { icon: 'ℹ️', color: 'cyan', title: 'Info' },
        success: { icon: '✅', color: 'green', title: 'Success' },
        question: { icon: '❓', color: 'yellow', title: 'Question' },
        quote: { icon: '💬', color: 'gray', title: 'Quote' },
        abstract: { icon: '📄', color: 'cyan', title: 'Abstract' },
        todo: { icon: '☑️', color: 'blue', title: 'Todo' },
        example: { icon: '📋', color: 'purple', title: 'Example' },
        bug: { icon: '🐛', color: 'red', title: 'Bug' },
      };

      const calloutInfo = calloutTypes[type.toLowerCase()] || {
        icon: '📌',
        color: 'gray',
        title: type.charAt(0).toUpperCase() + type.slice(1),
      };

      const displayTitle = title.trim() || calloutInfo.title;

      // Remove the callout syntax from the first text node
      firstText.value = firstText.value.replace(/^\[!\w+\][+-]?\s*[^\n]*/, '').trim();
      
      // If the first text node is now empty and there are other children, remove it
      if (!firstText.value && firstChild.children.length > 1) {
        firstChild.children.shift();
      } else if (!firstText.value && firstChild.children.length === 1) {
        // If it's the only child, remove the entire paragraph
        node.children.shift();
      }

      // Create the callout HTML structure
      const calloutNode = {
        type: 'html',
        value: isCollapsible
          ? `<div class="callout callout-${calloutInfo.color} callout-collapsible" data-expanded="${isExpanded}">
  <div class="callout-title">
    <span class="callout-icon">${calloutInfo.icon}</span>
    <span class="callout-title-text">${displayTitle}</span>
    <svg class="callout-toggle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  </div>
  <div class="callout-content">`
          : `<div class="callout callout-${calloutInfo.color}">
  <div class="callout-title">
    <span class="callout-icon">${calloutInfo.icon}</span>
    <span class="callout-title-text">${displayTitle}</span>
  </div>
  <div class="callout-content">`,
      };

      const closingNode = {
        type: 'html',
        value: '</div></div>',
      };

      // Replace the blockquote with the callout structure
      parent.children.splice(index, 1, calloutNode, ...node.children, closingNode);
    });
  };
}
