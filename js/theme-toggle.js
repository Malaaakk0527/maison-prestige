(() => {
  const storageKey = 'mc-theme';
  const root = document.documentElement;

  const getTheme = () => (root.classList.contains('mc-theme-dark') ? 'dark' : 'light');

  const setTheme = (theme) => {
    const isDark = theme === 'dark';
    root.classList.toggle('mc-theme-dark', isDark);
    try {
      localStorage.setItem(storageKey, isDark ? 'dark' : 'light');
    } catch (e) {
      /* ignore */
    }
    updateButton();
  };

  const nav = document.getElementById('et-top-navigation');
  if (!nav) return;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'mc-theme-toggle';
  btn.setAttribute('aria-label', 'Changer le mode d\'affichage');
  btn.innerHTML =
    '<span class="mc-theme-toggle__icon mc-theme-toggle__icon--sun" aria-hidden="true">☀</span>' +
    '<span class="mc-theme-toggle__icon mc-theme-toggle__icon--moon" aria-hidden="true">☾</span>';

  const mobileMenu = document.getElementById('et_mobile_nav_menu');
  if (mobileMenu) {
    nav.insertBefore(btn, mobileMenu);
  } else {
    nav.appendChild(btn);
  }

  function updateButton() {
    const dark = getTheme() === 'dark';
    btn.setAttribute(
      'aria-label',
      dark ? 'Activer le mode clair' : 'Activer le mode sombre'
    );
    btn.setAttribute('title', dark ? 'Mode clair' : 'Mode sombre');
    btn.classList.toggle('is-dark', dark);
  }

  btn.addEventListener('click', () => {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark');
  });

  updateButton();
})();
