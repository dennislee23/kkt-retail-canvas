/* device-hint.js — "rotate / open on a bigger screen" hint for the canvas.
 *
 * The AI-transformation map is a wide, multi-column layout built for a large
 * screen. On a phone it's cramped; in portrait it's unusable. This drops a
 * gentle, framework-free hint:
 *   • narrow screen + portrait  → full overlay: rotate your phone, better yet
 *                                  open on a computer. Auto-hides on rotate;
 *                                  a "continue anyway" button escapes it.
 *   • narrow screen + landscape → small dismissible banner: better on desktop.
 *   • desktop                   → nothing.
 *
 * Self-contained, no dependencies, no canvas coupling — drop one line before
 * </body> (same pattern as advisor.js):
 *   <script src="/device-hint.js?v=1" defer></script>
 * Survives a canvas re-export as long as that line is re-applied.
 */
(function () {
  'use strict';
  if (window.__kktDeviceHint) return;
  window.__kktDeviceHint = true;

  // Below this viewport width the wide canvas is too cramped to use well.
  var NARROW_MAX = 768;
  var SS_DISMISS = 'kkt_devicehint_dismissed'; // per-session "don't nag me"

  var CSS = `
  .kkt-dh-overlay,.kkt-dh-banner{
    --bg:#F5F3EF;--surface:#FFFFFF;--border:rgba(30,24,16,.12);
    --text:#1A1410;--text-sec:#5C5045;--accent:#AD7B25;--brown:#4A3620;
    --font:'DM Sans',system-ui,-apple-system,'Segoe UI',sans-serif;
    font-family:var(--font);box-sizing:border-box}
  .kkt-dh-overlay *,.kkt-dh-banner *{box-sizing:border-box}

  .kkt-dh-overlay{position:fixed;inset:0;z-index:2147483600;display:none;
    flex-direction:column;align-items:center;justify-content:center;text-align:center;
    gap:18px;padding:32px 26px;background:var(--bg);color:var(--text);
    animation:kkt-dh-fade .2s ease both}
  .kkt-dh-overlay.is-on{display:flex}
  .kkt-dh-phone{width:72px;height:72px;color:var(--brown);animation:kkt-dh-rot 2.4s ease-in-out infinite}
  .kkt-dh-overlay h2{margin:0;font-size:22px;font-weight:600;line-height:1.2;color:var(--text)}
  .kkt-dh-overlay p{margin:0;font-size:15px;line-height:1.55;color:var(--text-sec);max-width:30ch}
  .kkt-dh-go{margin-top:6px;background:var(--brown);border:1px solid var(--brown);color:#fff;
    border-radius:4px;padding:11px 20px;font-family:var(--font);font-size:14px;font-weight:500;
    letter-spacing:.01em;cursor:pointer;transition:opacity .15s ease}
  .kkt-dh-go:hover{opacity:.85}

  .kkt-dh-banner{position:fixed;left:12px;right:12px;bottom:12px;z-index:2147483500;display:none;
    align-items:center;gap:12px;padding:12px 14px;background:var(--surface);
    border:1px solid var(--border);border-radius:8px;box-shadow:0 6px 24px rgba(30,24,16,.16);
    animation:kkt-dh-up .22s ease both}
  .kkt-dh-banner.is-on{display:flex}
  .kkt-dh-banner span{flex:1;font-size:13px;line-height:1.45;color:var(--text-sec)}
  .kkt-dh-banner strong{color:var(--text);font-weight:600}
  .kkt-dh-x{flex-shrink:0;background:transparent;border:1px solid var(--border);color:var(--text-sec);
    width:28px;height:28px;border-radius:5px;font-size:17px;line-height:1;cursor:pointer;
    display:flex;align-items:center;justify-content:center;padding:0}
  .kkt-dh-x:hover{color:var(--text)}

  @keyframes kkt-dh-fade{from{opacity:0}to{opacity:1}}
  @keyframes kkt-dh-up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  @keyframes kkt-dh-rot{0%,55%,100%{transform:rotate(0)}25%,45%{transform:rotate(90deg)}}
  `;

  var PHONE_SVG =
    '<svg class="kkt-dh-phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg>';

  function init() {
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    var overlay = document.createElement('div');
    overlay.className = 'kkt-dh-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Совет по экрану');
    overlay.innerHTML =
      PHONE_SVG +
      '<h2>Поверните телефон</h2>' +
      '<p>Карта рассчитана на широкий экран. Поверните телефон горизонтально — ' +
      'а лучше откройте на компьютере или планшете.</p>' +
      '<button type="button" class="kkt-dh-go">Всё равно продолжить</button>';

    var banner = document.createElement('div');
    banner.className = 'kkt-dh-banner';
    banner.innerHTML =
      '<span><strong>Лучше на большом экране.</strong> Карта рассчитана на компьютер или планшет.</span>' +
      '<button type="button" class="kkt-dh-x" aria-label="Закрыть">&times;</button>';

    document.body.appendChild(overlay);
    document.body.appendChild(banner);

    var dismissed = false;
    try { dismissed = sessionStorage.getItem(SS_DISMISS) === '1'; } catch (e) {}

    overlay.querySelector('.kkt-dh-go').onclick = function () {
      dismissed = true;
      try { sessionStorage.setItem(SS_DISMISS, '1'); } catch (e) {}
      apply();
    };
    banner.querySelector('.kkt-dh-x').onclick = function () {
      dismissed = true;
      try { sessionStorage.setItem(SS_DISMISS, '1'); } catch (e) {}
      apply();
    };

    function apply() {
      var narrow = Math.min(window.innerWidth, window.screen ? window.screen.width : window.innerWidth) <= NARROW_MAX;
      var portrait = window.matchMedia
        ? window.matchMedia('(orientation: portrait)').matches
        : window.innerHeight > window.innerWidth;

      var showOverlay = narrow && portrait && !dismissed;
      var showBanner  = narrow && !portrait && !dismissed;

      overlay.classList.toggle('is-on', showOverlay);
      banner.classList.toggle('is-on', showBanner);
      // The overlay locks scroll; the banner doesn't.
      document.documentElement.style.overflow = showOverlay ? 'hidden' : '';
    }

    apply();
    window.addEventListener('resize', apply);
    window.addEventListener('orientationchange', function () { setTimeout(apply, 120); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
