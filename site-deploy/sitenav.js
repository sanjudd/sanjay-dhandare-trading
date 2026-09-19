/* Floating cross-page switcher — same include on every page of the site
   so you can jump anywhere without the browser back button. */
(function(){
  var PAGES = [
    {href:'sanjay-dhandare-trading.html', label:'The desk'},
    {href:'discipline-desk.html', label:'Discipline desk'},
    {href:'trading-journal.html', label:'Trading journal'},
    {href:'index.html', label:'9 EMA playbook'},
    {href:'9-33-ema-strategy.html', label:'9 & 33 EMA strategy'},
    {href:'breakeven-ledger-roadmap.html', label:'Trade planner'},
    {href:'mindset-wall.html', label:'Mindset wall'}
  ];

  function currentFile(){
    var path = location.pathname.replace(/\/+$/, ''); // ignore trailing slash(es)
    var last = path.split('/').pop();
    if(!last) return 'index.html';
    if(!/\.html?$/i.test(last)) return last + '.html'; // clean-URL routes (e.g. /mindset-wall)
    return last;
  }

  function init(){
    var cur = currentFile();
    if(cur === '9-ema-strategy-animated.html') cur = 'index.html';

    var style = document.createElement('style');
    style.textContent = [
      '#sw-root{position:fixed;left:16px;bottom:16px;z-index:2147483000;',
        'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif;}',
      '#sw-btn{all:unset;cursor:pointer;display:flex;align-items:center;gap:8px;',
        'background:rgba(9,10,15,.88);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);',
        'border:1px solid rgba(255,255,255,.16);color:#E9EBF0;font-size:12.5px;',
        'letter-spacing:.02em;padding:10px 15px;border-radius:100px;',
        'box-shadow:0 10px 30px -10px rgba(0,0,0,.65);}',
      '#sw-btn:hover{border-color:rgba(255,255,255,.34);}',
      '#sw-btn svg{flex:none;opacity:.85;transition:transform .3s cubic-bezier(.34,1.56,.64,1);}',
      '#sw-root.open #sw-btn svg{transform:rotate(90deg);}',
      '#sw-menu{position:absolute;left:0;bottom:calc(100% + 8px);min-width:212px;',
        'background:rgba(7,8,12,.97);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);',
        'border:1px solid rgba(255,255,255,.14);border-radius:12px;padding:6px;',
        'box-shadow:0 22px 55px -14px rgba(0,0,0,.75);',
        'opacity:0;transform:translateY(10px) scale(.95);transform-origin:bottom left;',
        'pointer-events:none;visibility:hidden;',
        'transition:opacity .22s cubic-bezier(.16,1,.3,1),transform .22s cubic-bezier(.16,1,.3,1),visibility 0s linear .22s;}',
      '#sw-root.open #sw-menu{opacity:1;transform:translateY(0) scale(1);',
        'pointer-events:auto;visibility:visible;transition:opacity .24s cubic-bezier(.16,1,.3,1),transform .24s cubic-bezier(.16,1,.3,1);}',
      '#sw-menu a{display:flex;align-items:center;justify-content:space-between;gap:14px;',
        'padding:9px 11px;border-radius:8px;font-size:13px;text-decoration:none;',
        'color:#E9EBF0;transition:background .15s,opacity .2s ease,transform .2s ease;',
        'opacity:0;transform:translateX(-6px);}',
      '#sw-root.open #sw-menu a{opacity:1;transform:translateX(0);}',
      '#sw-menu a:nth-child(1){transition-delay:.02s}',
      '#sw-menu a:nth-child(2){transition-delay:.05s}',
      '#sw-menu a:nth-child(3){transition-delay:.08s}',
      '#sw-menu a:nth-child(4){transition-delay:.11s}',
      '#sw-menu a:nth-child(5){transition-delay:.14s}',
      '#sw-menu a:nth-child(6){transition-delay:.17s}',
      '#sw-menu a:nth-child(7){transition-delay:.2s}',
      '#sw-menu a:nth-child(8){transition-delay:.23s}',
      '#sw-menu a:hover{background:rgba(255,255,255,.08);}',
      '#sw-menu a:hover .sw-dot{transform:scale(1.4);}',
      '#sw-menu a.sw-here{color:#6b7280;pointer-events:none;}',
      '#sw-menu .sw-dot{width:5px;height:5px;border-radius:50%;background:#4CD4E8;flex:none;',
        'opacity:0;transition:transform .2s ease;}',
      '#sw-menu a.sw-here .sw-dot{opacity:1;}'
    ].join('');
    document.head.appendChild(style);

    var wrap = document.createElement('div');
    wrap.id = 'sw-root';
    wrap.innerHTML =
      '<button id="sw-btn" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Browse all pages">' +
        '<svg width="13" height="13" viewBox="0 0 24 24" fill="none">' +
          '<rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8"/>' +
          '<rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8"/>' +
          '<rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8"/>' +
          '<rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8"/>' +
        '</svg><span>Pages</span>' +
      '</button>' +
      '<div id="sw-menu" role="menu"></div>';
    document.body.appendChild(wrap);

    var menu = wrap.querySelector('#sw-menu');
    PAGES.forEach(function(p){
      var here = p.href === cur;
      var a = document.createElement('a');
      a.href = here ? '#' : '/' + p.href;
      a.setAttribute('role','menuitem');
      if(here) a.className = 'sw-here';
      a.innerHTML = '<span>' + p.label + (here ? ' · here' : '') + '</span><span class="sw-dot"></span>';
      menu.appendChild(a);
    });

    var btn = wrap.querySelector('#sw-btn');
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      var open = wrap.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', function(){
      wrap.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape'){
        wrap.classList.remove('open');
        btn.setAttribute('aria-expanded','false');
      }
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
