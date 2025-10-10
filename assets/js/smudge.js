// Yellow gradient smudge that follows mouse and fades; clears after 1 minute
(() => {
  const canvas = document.getElementById('smudge-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let dpr = Math.max(1, window.devicePixelRatio || 1);

  function resize() {
    const { innerWidth: w, innerHeight: h } = window;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  const smudges = [];
  const MAX_AGE_MS = 10 * 1000; // 10 seconds

  function addSmudge(x, y) {
    const now = performance.now();
    const size = 160 + Math.random() * 160; // smudge diameter
    const rotation = Math.random() * Math.PI * 2;
    smudges.push({ x, y, size, rotation, createdAt: now });
  }

  function draw() {
    const now = performance.now();
    // clear fully and redraw living smudges for soft trail behavior
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < smudges.length; i++) {
      const s = smudges[i];
      const age = now - s.createdAt;
      if (age > MAX_AGE_MS) continue;

      const t = age / MAX_AGE_MS; // 0..1
      const alpha = 0.35 * (1 - t); // fade out over 1m

      // radial gradient from warm yellow to transparent
      const r = s.size * 0.5;
      const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r);
      grd.addColorStop(0, `rgba(255, 230, 0, ${alpha})`);
      grd.addColorStop(0.5, `rgba(255, 210, 64, ${alpha * 0.5})`);
      grd.addColorStop(1, 'rgba(255, 210, 64, 0)');

      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rotation);
      ctx.translate(-s.x, -s.y);
      ctx.fillStyle = grd;
      ctx.beginPath();
      // draw an ellipse-ish shape
      ctx.ellipse(s.x, s.y, r * 1.2, r * 0.9, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // drop old smudges
    for (let i = smudges.length - 1; i >= 0; i--) {
      if (now - smudges[i].createdAt > MAX_AGE_MS) smudges.splice(i, 1);
    }

    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);

  function handleMove(e) {
    const x = e.clientX;
    const y = e.clientY;
    addSmudge(x, y);
  }

  window.addEventListener('pointermove', handleMove, { passive: true });
})();


