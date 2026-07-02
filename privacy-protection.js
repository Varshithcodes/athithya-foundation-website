(function () {
  const overlay = document.getElementById('privacyOverlay');
  let isLocked = false;

  function enableProtection() {
    isLocked = true;
    document.body.classList.add('obfuscated');
    if (overlay) {
      overlay.style.display = 'flex';
      const desc = overlay.querySelector('p');
      if (desc && !desc.innerText.includes("Please reload")) {
        desc.innerHTML += "<br><br><strong style='color:var(--or); font-size:1.2rem; display:block; margin-top:15px;'>Please reload the page to restore access.</strong>";
      }
    }
  }

  // 1. High-frequency focus monitor using requestAnimationFrame (beats standard interval timers)
  function monitorFocus() {
    if (!document.hasFocus()) {
      enableProtection();
    }
    if (!isLocked) {
      requestAnimationFrame(monitorFocus);
    }
  }
  requestAnimationFrame(monitorFocus);

  // 2. Viewport exit detection (triggers blackout immediately if mouse leaves the page area to open a tool)
  document.addEventListener('mouseleave', function () {
    enableProtection();
  });

  // 3. Desktop Screenshot/Print key combination interceptors -> Permanent Lock
  window.addEventListener('keydown', function (e) {
    if (e.key === 'PrintScreen' || e.keyCode === 44 ||
      (e.shiftKey && (e.metaKey || e.ctrlKey) && (e.key === 's' || e.key === 'S' || e.key === '3' || e.key === '4' || e.key === '5'))) {
      enableProtection();
      navigator.clipboard.writeText("Screenshots are restricted on this platform.").catch(() => { });
    }
  });

  // 4. Multitasking/Tab visibility detection (hides content in app switcher) -> Permanent Lock
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      enableProtection();
    }
  });

  // 5. Blur detection (e.g., when Snipping Tool or PrintScreen overlay takes focus) -> Permanent Lock
  window.addEventListener('blur', function () {
    enableProtection();
  });

  // 4. Mobile touch hold protection (disables "save image" / context menus on images)
  document.addEventListener('contextmenu', function (e) {
    if (e.target.tagName === 'IMG' || e.target.closest('.pcard-img') || e.target.closest('.tc-av') || e.target.id === 'donateQRImg') {
      e.preventDefault();
    }
  });

  // 5. Disable dragging images
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', e => e.preventDefault());
  });
})();
