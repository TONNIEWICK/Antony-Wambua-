(function () {
  // Mobile menu
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  btn.addEventListener('click', function () {
    btn.setAttribute('aria-expanded', nav.classList.toggle('open'));
  });
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  // Use your own images where data-img is set
  document.querySelectorAll('[data-img]').forEach(function (el) {
    var src = el.dataset.img;
    if (src) {
      el.style.backgroundImage = 'url("' + src + '")';
      el.classList.add('has-img');
    }
  });

  // Click a project tile to open its image or play its video
  var box = document.getElementById('lightbox');
  var boxImg = box.querySelector('img');
  var boxVid = box.querySelector('video');
  function closeBox() {
    box.hidden = true;
    boxVid.pause();
    boxVid.removeAttribute('src');
    boxVid.load();
  }
  document.querySelectorAll('.tile').forEach(function (t) {
    if (t.dataset.video) t.classList.add('has-video');
    t.addEventListener('click', function () {
      if (t.dataset.video) {
        boxImg.style.display = 'none';
        boxVid.style.display = 'block';
        boxVid.src = t.dataset.video;
        if (t.dataset.img) boxVid.poster = t.dataset.img;
        box.hidden = false;
        boxVid.play().catch(function () {});
      } else if (t.dataset.img) {
        boxVid.style.display = 'none';
        boxImg.style.display = 'block';
        boxImg.src = t.dataset.img;
        box.hidden = false;
      }
    });
  });
  box.addEventListener('click', function (e) {
    if (e.target === box || e.target.tagName === 'BUTTON') closeBox();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeBox(); });

  // Highlight current section in the nav
  var links = document.querySelectorAll('nav a');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        links.forEach(function (l) {
          l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach(function (s) { io.observe(s); });

  // Copy email
  var toast = document.getElementById('toast');
  document.getElementById('copy').addEventListener('click', function () {
    var done = function () {
      toast.textContent = 'Email copied.';
      setTimeout(function () { toast.textContent = ''; }, 2500);
    };
    if (navigator.clipboard) navigator.clipboard.writeText('antonywambua.aw26@gmail.com').then(done, done);
    else done();
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
