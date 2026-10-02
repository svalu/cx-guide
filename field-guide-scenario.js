(() => {
  const steps = [...document.querySelectorAll('[data-scene]')];
  const panels = [...document.querySelectorAll('[data-scene-panel]')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function showScene(number) {
    steps.forEach(step => {
      const active = step.dataset.scene === number;
      step.classList.toggle('active', active);
      step.setAttribute('aria-pressed', String(active));
    });
    panels.forEach(panel => {
      const active = panel.dataset.scenePanel === number;
      panel.hidden = !active;
      panel.classList.remove('scene-enter');
      if (active && !reducedMotion.matches) {
        void panel.offsetWidth;
        panel.classList.add('scene-enter');
      }
    });
  }

  steps.forEach((step, index) => {
    step.addEventListener('click', () => showScene(step.dataset.scene));
    step.addEventListener('keydown', event => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      const next = (index + (event.key === 'ArrowRight' ? 1 : -1) + steps.length) % steps.length;
      steps[next].focus();
      showScene(steps[next].dataset.scene);
    });
  });

  const library = document.querySelector('.terms-library');
  const librarySummary = library.querySelector('summary');
  const libraryContent = library.querySelector('.terms-library-content');
  let libraryExpanded = library.open;
  let libraryAnimation = null;

  library.classList.toggle('is-expanded', libraryExpanded);
  librarySummary.addEventListener('click', event => {
    libraryExpanded = !libraryExpanded;
    library.classList.toggle('is-expanded', libraryExpanded);

    if (reducedMotion.matches || typeof libraryContent.animate !== 'function') return;
    event.preventDefault();

    const startHeight = library.open ? libraryContent.getBoundingClientRect().height : 0;
    libraryAnimation?.cancel();
    library.open = true;
    const endHeight = libraryExpanded ? libraryContent.scrollHeight : 0;
    libraryContent.style.height = `${startHeight}px`;
    libraryContent.style.overflow = 'hidden';

    const animation = libraryContent.animate(
      [
        { height: `${startHeight}px`, opacity: startHeight === 0 ? 0 : 1 },
        { height: `${endHeight}px`, opacity: libraryExpanded ? 1 : 0 },
      ],
      {
        duration: Math.min(420, Math.max(260, Math.abs(endHeight - startHeight) * 0.17)),
        easing: 'cubic-bezier(.22,.75,.2,1)',
        fill: 'forwards',
      },
    );
    libraryAnimation = animation;
    animation.onfinish = () => {
      if (libraryAnimation !== animation) return;
      if (!libraryExpanded) library.open = false;
      animation.cancel();
      libraryContent.style.height = '';
      libraryContent.style.overflow = '';
      libraryAnimation = null;
    };
  });
})();
