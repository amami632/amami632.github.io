/* ========== Tabs ========== */
const tabButtons = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.tab-panel');

function showPanel(id){
  tabButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.target === id));
  panels.forEach(p => p.hidden = ('#'+p.id) !== id);
  if(id === '#skills'){
    document.querySelectorAll('#skills .bar').forEach(b => b.classList.add('play'));
  }
}
tabButtons.forEach(btn => btn.addEventListener('click', () => showPanel(btn.dataset.target)));
showPanel('#about');

/* ========== Gallery ========== */
const IMAGES = [
  'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=1200&auto=format&fit=crop'
];
let gi = 0;
const gImg = document.getElementById('g-img');
function showImage(i){ gi = (i + IMAGES.length) % IMAGES.length; gImg.src = IMAGES[gi]; }
document.getElementById('g-prev').addEventListener('click', () => showImage(gi-1));
document.getElementById('g-next').addEventListener('click', () => showImage(gi+1));
showImage(gi);

/* ========== Header canvas dots ========== */
const canvas = document.getElementById('hero');
const ctx = canvas.getContext('2d');

function sizeCanvas(){
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}
sizeCanvas();
window.addEventListener('resize', sizeCanvas);

const DOTS = 44;
const dots = [];
for(let i=0; i<DOTS; i++){
  dots.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    vx: (Math.random()-0.5)*0.5,
    vy: (Math.random()-0.5)*0.5
  });
}
function update(){
  for(const d of dots){
    d.x += d.vx; d.y += d.vy;
    if(d.x < 0 || d.x > canvas.width) d.vx *= -1;
    if(d.y < 0 || d.y > canvas.height) d.vy *= -1;
  }
}
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // soft grid
  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  ctx.lineWidth = 1;
  for(let x=0; x<canvas.width; x+=40){ ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,canvas.height); ctx.stroke(); }

  // connect nearby dots ( definetly generated with chatgpt help :) ) ( idea from Network realm resembling network handover procedure  :) )
  for(let i=0;i<dots.length;i++){
    for(let j=i+1;j<dots.length;j++){
      const dx = dots[i].x - dots[j].x;
      const dy = dots[i].y - dots[j].y;
      const dist = Math.hypot(dx,dy);
      if(dist < 120){
        const opacity = 1 - dist/120;
        ctx.strokeStyle = `rgba(160,200,255,${opacity*0.5})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(dots[j].x, dots[j].y);
        ctx.stroke();
      }
    }
  }

  // dots
  ctx.fillStyle = '#9ec5ff';
  for(const d of dots){
    ctx.beginPath();
    ctx.arc(d.x, d.y, 1.7, 0, Math.PI*2);
    ctx.fill();
  }

  ctx.font = "bold 26px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const grad = ctx.createLinearGradient(0,0,canvas.width,0);
  grad.addColorStop(0,"#60a5fa"); grad.addColorStop(1,"#22d3ee");
  ctx.fillStyle = grad;
  ctx.shadowColor = "rgba(96,165,250,0.35)"; ctx.shadowBlur = 10;
  ctx.fillText("Yassir Amami", canvas.width/2, canvas.height/2 - 8);
  ctx.shadowBlur = 0;
  ctx.font = "bold 14px Arial";
  ctx.fillStyle = "rgba(226,232,240,0.85)";
  ctx.fillText("Network & Telecommunications student", canvas.width/2, canvas.height/2 + 16);
}
function loop(){ update(); draw(); requestAnimationFrame(loop); }
requestAnimationFrame(loop);

/* ========== background Floating blobs ==================== */
const bg = document.getElementById('bg');
const bgCtx = bg.getContext('2d', { alpha: true });

function sizeBg(){
  bg.width = window.innerWidth;
  bg.height = window.innerHeight;
}
sizeBg();
window.addEventListener('resize', sizeBg);

// Theme colors from CSS
const rootStyles = getComputedStyle(document.documentElement);
const ACCENT1 = rootStyles.getPropertyValue('--blue').trim() || '#60a5fa';
const ACCENT2 = rootStyles.getPropertyValue('--blue-2').trim() || '#22d3ee';

// Slow Moving Blobs ( Animation Math generated using chatgpt but idea from moving balls session)
const BLOBS = Array.from({length: 5}).map(() => ({
  x: Math.random()*bg.width,
  y: Math.random()*bg.height,
  r: 120 + Math.random()*160,
  vx: (Math.random()*0.6 - 0.3),
  vy: (Math.random()*0.6 - 0.3)
}));

function bgUpdate(){
  for(const b of BLOBS){
    b.x += b.vx; b.y += b.vy;
    if(b.x < -b.r) b.x = bg.width + b.r;
    if(b.x > bg.width + b.r) b.x = -b.r;
    if(b.y < -b.r) b.y = bg.height + b.r;
    if(b.y > bg.height + b.r) b.y = -b.r;
  }
}

function bgDraw(){
  bgCtx.clearRect(0,0,bg.width,bg.height);
  for(const b of BLOBS){
    const grad = bgCtx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
    grad.addColorStop(0, ACCENT1);
    grad.addColorStop(1, `${ACCENT2}00`);
    bgCtx.globalAlpha = 0.35;
    bgCtx.fillStyle = grad;
    bgCtx.beginPath(); bgCtx.arc(b.x, b.y, b.r, 0, Math.PI*2); bgCtx.fill();
  }
  bgCtx.globalAlpha = 1;
}

function bgLoop(){ bgUpdate(); bgDraw(); requestAnimationFrame(bgLoop); }
requestAnimationFrame(bgLoop);

/* Footer year */
document.getElementById('year').textContent = new Date().getFullYear();