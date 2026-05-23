function c(){document.querySelectorAll(".prose pre").forEach((t,i)=>{const o=document.createElement("div");o.className="code-block-container",t.parentNode.insertBefore(o,t),o.appendChild(t);const e=document.createElement("button");e.className="code-copy-btn",e.setAttribute("data-block-id",i),e.setAttribute("aria-label","Copy code"),e.title="Copy code",e.innerHTML=`
      <svg class="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
      </svg>
    `,e.addEventListener("click",()=>{const d=t.textContent;navigator.clipboard.writeText(d).then(()=>{const n=e.innerHTML;e.innerHTML=`
          <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        `,e.classList.add("copied"),e.title="Copied!",setTimeout(()=>{e.innerHTML=n,e.classList.remove("copied"),e.title="Copy code"},2e3)}).catch(n=>{console.error("Failed to copy code:",n)})}),o.appendChild(e)})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",c):c();
