(() => {
  // Callback function for Google Translate
  window.googleTranslateElementInit = () => {
    new google.translate.TranslateElement({
      pageLanguage: 'fr',
      includedLanguages: 'ar,fr',
      autoDisplay: false
    }, 'google_translate_element');
  };

  const init = () => {
    // Check if element already exists
    if (document.querySelector('.mc-translate-container')) return;

    // Create wrapper div
    const container = document.createElement('div');
    container.className = 'mc-translate-container';
    
    // Create inner element where google will render the select dropdown
    const element = document.createElement('div');
    element.id = 'google_translate_element';
    
    container.appendChild(element);

    // Find insertion points
    const nav = document.getElementById('et-top-navigation');
    const toggle = document.querySelector('.mc-theme-toggle');

    if (nav) {
      if (toggle) {
        // Insert right before the theme toggle
        nav.insertBefore(container, toggle);
      } else {
        const mobileMenu = document.getElementById('et_mobile_nav_menu');
        if (mobileMenu) {
          nav.insertBefore(container, mobileMenu);
        } else {
          nav.appendChild(container);
        }
      }
    } else {
      const header = document.getElementById('main-header');
      if (header) {
        header.appendChild(container);
      } else {
        document.body.appendChild(container);
      }
    }

    // Load Google Translate script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(script);

    // Watch for when Google Translate adds the bar at the top, and hide it
    const style = document.createElement('style');
    style.innerHTML = `
      body { top: 0 !important; }
      .goog-te-banner-frame { display: none !important; }
      .goog-te-banner { display: none !important; }
      #goog-gt-tt { display: none !important; }
      .goog-te-balloon-frame { display: none !important; }
    `;
    document.head.appendChild(style);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
