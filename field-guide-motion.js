/* Small, interruptible motions; content and interaction state update immediately. */
(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const running = new Set();
  const tracks = new WeakMap();
  function stop(element) {
    (tracks.get(element) || []).forEach(animation => animation.cancel());
    tracks.delete(element);
  }
  function animate(element, frames, options = {}) {
    if (preference.matches) return null;
    const animation = element.animate(frames, {
      duration: 320, easing: 'cubic-bezier(.22,1,.36,1)', ...options
    });
    const group = tracks.get(element) || [];
    group.push(animation); tracks.set(element, group); running.add(animation);
    const clean = () => {
      running.delete(animation);
      const current = tracks.get(element);
      if (current) tracks.set(element, current.filter(item => item !== animation));
    };
    animation.finished.then(clean, clean);
    return animation;
  }
  function layout(container, items, update) {
    const height = container.getBoundingClientRect().height;
    const previous = new Map(items.filter(item => !item.hidden).map(item => [item, item.getBoundingClientRect()]));
    stop(container); items.forEach(stop);
    update();
    if (preference.matches) return;
    const nextHeight = container.getBoundingClientRect().height;
    items.filter(item => !item.hidden).forEach((item, index) => {
      const next = item.getBoundingClientRect(), old = previous.get(item);
      animate(item, [
        {translate: old ? `${old.left-next.left}px ${old.top-next.top}px` : '0 16px', opacity: old ? 1 : 0},
        {translate: '0 0', opacity: 1}
      ], {duration: 360, delay: old ? 0 : Math.min(index * 25, 100)});
    });
    if (Math.abs(height - nextHeight) > 1) animate(container, [
      {height: `${height}px`, overflow: 'clip'},
      {height: `${nextHeight}px`, overflow: 'clip'}
    ], {duration: 400});
  }
  window.GuideMotion = {animate, stop, layout};
  preference.addEventListener('change', () => {
    if (preference.matches) [...running].forEach(animation => animation.cancel());
  });
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('button, .btn').forEach(control => {
      control.addEventListener('click', () => {
        stop(control);
        animate(control, [{scale:'1'}, {scale:'.96',offset:.3}, {scale:'1'}], {duration:240});
      });
    });
    const links = [...document.querySelectorAll('.topnav a')];
    const sections = links.map(link => document.querySelector(link.hash)).filter(Boolean);
    let scheduled = false;
    function updateNavigation() {
      scheduled = false;
      const current = sections.filter(section => section.getBoundingClientRect().top <= innerHeight * .4).at(-1);
      links.forEach(link => {
        if (current && link.hash === '#' + current.id) link.setAttribute('aria-current','location');
        else link.removeAttribute('aria-current');
      });
    }
    window.addEventListener('scroll', () => {
      if (!scheduled) {scheduled = true;requestAnimationFrame(updateNavigation);}
    }, {passive:true});
    updateNavigation();
  });
})();
