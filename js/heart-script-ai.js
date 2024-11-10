const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class HeartParticle {
  constructor(x, y, size, color, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x - this.size / 2, this.y - this.size / 2,
      this.x - this.size, this.y + this.size / 3,
      this.x, this.y + this.size);
    ctx.bezierCurveTo(this.x + this.size, this.y + this.size / 3,
      this.x + this.size / 2, this.y - this.size / 2,
      this.x, this.y);
    ctx.fill();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.size > 0.2) this.size -= 0.05;
  }
}

const particles = [];

function createHeartParticles() {
  const numParticles = 20;
  for (let i = 0; i < numParticles; i++) {
    const size = Math.random() * 20 + 10;
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const speedX = (Math.random() - 0.5) * 3;
    const speedY = (Math.random() - 0.5) * 3;
    const color = `rgba(255, 0, 0, ${Math.random() * 0.8 + 0.2})`;
    particles.push(new HeartParticle(x, y, size, color, speedX, speedY));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle, index) => {
    particle.update();
    particle.draw();
    if (particle.size <= 0.2) {
      particles.splice(index, 1);
    }
  });

  if (particles.length < 100) {
    createHeartParticles();
  }

  requestAnimationFrame(animate);
}

createHeartParticles();
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});