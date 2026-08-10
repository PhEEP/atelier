(function () {
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    // fallback for non-secure contexts / older browsers
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand('copy');
    } finally {
      document.body.removeChild(ta);
    }
    return Promise.resolve();
  }

  document.querySelectorAll('.panel').forEach(function (panel) {
    var pre = panel.querySelector('pre');
    var label = panel.querySelector('.panel-label');
    if (!pre || !label) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.setAttribute('aria-label', 'Copy code to clipboard');

    var resetTimer;
    btn.addEventListener('click', function () {
      copyText(pre.textContent)
        .then(function () {
          btn.textContent = 'Copied';
          btn.classList.add('copied');
        })
        .catch(function () {
          btn.textContent = 'Failed';
          btn.classList.remove('copied');
        })
        .finally(function () {
          clearTimeout(resetTimer);
          resetTimer = setTimeout(function () {
            btn.textContent = 'Copy';
            btn.classList.remove('copied');
          }, 1500);
        });
    });

    label.appendChild(btn);
  });
})();
