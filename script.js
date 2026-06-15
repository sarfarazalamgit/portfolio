// ===== Particle Network Background =====
const canvas = document.getElementById('hero-bg');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null };

// Resize canvas to fit window
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Track mouse movement
canvas.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
canvas.addEventListener('mouseleave', () => {
  mouse.x = null;
  mouse.y = null;
});

// Particle Class
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.2;
    this.vy = (Math.random() - 0.5) * 0.2;
    this.radius = 2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off edges
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

    // Mouse interaction (repel effect)
    if (mouse.x && mouse.y) {
      let dx = this.x - mouse.x;
      let dy = this.y - mouse.y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        this.vx += dx * 0.0005;
        this.vy += dy * 0.0005;
      }
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,255,170,0.6)';
    ctx.fill();
  }
}

// Initialize particles
for (let i = 0; i < 40; i++) {
  particles.push(new Particle());
}

// Draw lines between nearby particles
function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0,255,170,${0.15 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

// Animation Loop
function animate() {
  // Fade effect for trails
  ctx.fillStyle = 'rgba(18,18,18,0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  connectParticles();
  requestAnimationFrame(animate);
}

animate();

// ===== Typing Animation =====
const line1Text = "Hey there 👋";
const line2Text = "I am MD SARFARAZ ALAM";
const line3Text = "Frontend Developer";

function typeText(elementId, text, speed = 100, callback) {
  let i = 0;
  const elem = document.getElementById(elementId);
  elem.innerHTML = ''; // Clear previous text

  function typing() {
    if (i < text.length) {
      elem.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else if (callback) {
      callback();
    }
  }

  typing();
}

// Start the sequence after a short delay
setTimeout(() => {
  typeText("line1", line1Text, 100, () => {
    typeText("line2", line2Text, 100, () => {
      typeText("line3", line3Text, 100, () => {
        // Add blinking cursor to the last line
        document.getElementById("line3").classList.add("blink");

        // Show the resume button
        const btn = document.querySelector(".resume-btn");
        btn.classList.add("show");
      });
    });
  });
}, 500);

// ===== Scroll Spy for Navigation =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

function scrollSpy() {
  const scrollPos = window.scrollY + window.innerHeight / 2;

  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach(link => link.classList.remove("active"));
      const activeLink = document.querySelector(`nav a[href="#${id}"]`);
      if (activeLink) activeLink.classList.add("active");
    }
  });
}

// Listen for scroll events
window.addEventListener("scroll", scrollSpy);

// Run once on load to set the initial active link
scrollSpy();