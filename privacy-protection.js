(function () {
  const overlay = document.getElementById('privacyOverlay');
  let isKeyTriggered = false;

  function enableProtection() {
    document.body.classList.add('obfuscated');
    if (overlay) overlay.style.display = 'flex';
  }

  function disableProtection() {
    if (isKeyTriggered) return;
    document.body.classList.remove('obfuscated');
    if (overlay) overlay.style.display = 'none';
  }

  // 1. Aggressive focus polling (detects focus loss from screenshot tools/os overlays)
  setInterval(function () {
    if (!document.hasFocus()) {
      enableProtection();
    } else if (!isKeyTriggered) {
      disableProtection();
    }
  }, 30);

  // 2. Multitasking/Tab visibility detection (hides content in app switcher)
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      enableProtection();
    } else {
      disableProtection();
    }
  });

  // 3. Desktop Screenshot/Print key combination interceptors
  window.addEventListener('keydown', function (e) {
    if (e.key === 'PrintScreen' || e.keyCode === 44 ||
      (e.shiftKey && (e.metaKey || e.ctrlKey) && (e.key === 's' || e.key === 'S' || e.key === '3' || e.key === '4' || e.key === '5'))) {
      isKeyTriggered = true;
      enableProtection();
      navigator.clipboard.writeText("Screenshots are restricted.").catch(() => { });

      setTimeout(function () {
        isKeyTriggered = false;
        if (document.hasFocus()) {
          disableProtection();
        }
      }, 3000);
    }
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
