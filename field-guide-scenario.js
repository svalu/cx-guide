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
})();
