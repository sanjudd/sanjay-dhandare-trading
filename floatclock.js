/* Floating live IST clock — same include on every page of the site. */
(function(){
  if(document.getElementById('floatclock')) return; // page already has its own

  var style = document.createElement('style');
  style.textContent = [
    '.floatclock{position:fixed;top:74px;right:24px;z-index:55;width:158px;',
      'background:#0E1116;border:1px solid #232B36;border-radius:16px;',
      'padding:13px 14px 11px;text-align:center;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;',
      'box-shadow:0 8px 28px rgba(0,0,0,.55),0 0 14px rgba(76,212,232,.12);',
      'animation:fc-breathe 18s ease-in-out infinite}',
    '.floatclock .fc-row{display:flex;align-items:baseline;justify-content:center;gap:5px}',
    '.floatclock .fc-ampm{font-size:18px;font-weight:700;color:#7DD3FC;letter-spacing:.02em;text-transform:uppercase}',
    '.floatclock .fc-time{font-size:18px;font-weight:700;color:#F2F5F8;letter-spacing:.02em}',
    '.floatclock .fc-date{font-size:10.5px;color:#7DD3FC;margin-top:4px;animation:fc-pulse 7s ease-in-out infinite}',
    '.floatclock .fc-slogan{font-size:10.5px;font-weight:700;margin-top:9px;display:flex;justify-content:center;gap:6px;letter-spacing:.02em}',
    '.floatclock .fc-slogan span{animation:fc-rainbow 3.6s linear infinite}',
    '.floatclock .fc-slogan span:nth-child(2){animation-delay:-1.2s}',
    '.floatclock .fc-slogan span:nth-child(3){animation-delay:-2.4s}',
    '@keyframes fc-rainbow{0%{color:#ff5c5c}16.6%{color:#ffb347}33.3%{color:#ffe75c}50%{color:#7CFF6B}66.6%{color:#5cc9ff}83.3%{color:#b06bff}100%{color:#ff5c5c}}',
    '@keyframes fc-breathe{0%,100%{box-shadow:0 8px 28px rgba(0,0,0,.55),0 0 14px rgba(76,212,232,.12);border-color:#232B36}',
      '50%{box-shadow:0 8px 28px rgba(0,0,0,.55),0 0 20px rgba(122,92,255,.20);border-color:#3a3454}}',
    '@keyframes fc-pulse{0%,100%{opacity:.8}50%{opacity:1}}',
    '@media(max-width:640px){.floatclock{display:none}}'
  ].join('');
  document.head.appendChild(style);

  var el = document.createElement('div');
  el.className = 'floatclock';
  el.id = 'floatclock';
  el.innerHTML =
    '<div class="fc-row">' +
      '<div class="fc-time" id="fcTime">--:--:--</div>' +
      '<div class="fc-ampm" id="fcAmpm">--</div>' +
    '</div>' +
    '<div class="fc-date" id="fcDate">--- -- --- ----</div>' +
    '<div class="fc-slogan"><span>Time</span><span>is</span><span>Money</span></div>';
  document.body.appendChild(el);

  var DOW = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  function istDate(){
    var d = new Date();
    return new Date(d.getTime() + d.getTimezoneOffset()*60000 + 5.5*3600000);
  }
  var fcTime = el.querySelector('#fcTime'), fcAmpm = el.querySelector('#fcAmpm'), fcDate = el.querySelector('#fcDate');
  function tick(){
    var d = istDate();
    var h = d.getHours(); var ap = h>=12 ? 'pm' : 'am'; h = h%12 || 12;
    fcAmpm.textContent = ap;
    fcTime.textContent = String(h).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0') + ':' + String(d.getSeconds()).padStart(2,'0');
    fcDate.textContent = DOW[d.getDay()] + ' ' + d.getDate() + ' ' + MON[d.getMonth()] + ' ' + d.getFullYear();
  }
  tick();
  setInterval(tick, 1000);
})();
