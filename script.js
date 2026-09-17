// Scroll-reveal fallback for browsers without native CSS scroll-driven
// animations (animation-timeline: view()). Skips entirely if the browser
// already supports it natively (styles.css handles that case via @supports),
// and does nothing if the visitor prefers reduced motion.
(function () {
  var supportsNativeScrollAnim =
    window.CSS && CSS.supports && CSS.supports('animation-timeline', 'view()');
  var prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (supportsNativeScrollAnim || prefersReducedMotion) return;

  var targets = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !targets.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach(function (el) {
    el.classList.add('js-observe');
    observer.observe(el);
  });
})();
