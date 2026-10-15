document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      toggle.textContent = links.classList.contains('open') ? '✕' : '☰';
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.textContent = '☰';
      });
    });
  }

  var el = document.getElementById('countdown');
  if (el) {
    var target = new Date('2026-11-26T09:00:00-03:00').getTime();
    function tick() {
      var now = new Date().getTime();
      var d = target - now;
      if (d < 0) { el.innerHTML = '<div><span class="num">¡Ya empezó!</span></div>'; return; }
      var days = Math.floor(d / (1000 * 60 * 60 * 24));
      var hours = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var mins = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
      var secs = Math.floor((d % (1000 * 60)) / 1000);
      el.innerHTML =
        '<div><span class="num">' + days + '</span><span class="lbl">Días</span></div>' +
        '<div><span class="num">' + hours + '</span><span class="lbl">Horas</span></div>' +
        '<div><span class="num">' + mins + '</span><span class="lbl">Min</span></div>' +
        '<div><span class="num">' + secs + '</span><span class="lbl">Seg</span></div>';
    }
    tick();
    setInterval(tick, 1000);
  }

  document.querySelectorAll('.yt-facade').forEach(function (facade) {
    function play() {
      var id = facade.getAttribute('data-video-id');
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1';
      iframe.title = facade.getAttribute('aria-label') || 'YouTube video';
      iframe.frameBorder = '0';
      iframe.allow = 'accelerated-encryption; autoplay; encrypted-media; picture-in-picture';
      iframe.allowFullscreen = true;
      facade.replaceWith(iframe);
    }
    facade.addEventListener('click', play);
    facade.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); play(); }
    });
  });
});
