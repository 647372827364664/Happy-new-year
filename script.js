const pages = document.querySelectorAll(".page");
let currentPage = 0;

// Ensure the canvas is responsive
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function nextPage() {
  // Hide the current page and show the next page
  if (currentPage < pages.length - 1) {
    pages[currentPage].classList.add("hidden");
    currentPage++;
    pages[currentPage].classList.remove("hidden");
  } else {
    console.error("No more pages to navigate.");
  }
}

function restartCard() {
  // Restart the card from the first page
  pages.forEach((page) => page.classList.add("hidden"));
  currentPage = 0;
  pages[currentPage].classList.remove("hidden");
}

function saveReflection() {
  const reflection = document.getElementById("reflection").value;
  const savedReflection = document.getElementById("saved-reflection");
  savedReflection.textContent = `Your reflection: "${reflection}" has been saved!`;
}

function saveGoal() {
  const goal = document.getElementById("goal").value;
  const savedGoal = document.getElementById("saved-goal");
  savedGoal.textContent = `Your 2025 goal: "${goal}" has been saved!`;
}

/* Fireworks Animation */
const fireworks = [];

function createFirework() {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    size: Math.random() * 3 + 1,
    speed: Math.random() * 2 + 1, // Slower fireworks
    particles: [],
  };
}

function createParticles(firework) {
  for (let i = 0; i < 100; i++) {
    firework.particles.push({
      x: firework.x,
      y: firework.y,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 3,
      color: firework.color,
    });
  }
}

function animateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((firework, index) => {
    if (!firework.particles.length) {
      firework.y -= firework.speed;
      ctx.beginPath();
      ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2);
      ctx.fillStyle = firework.color;
      ctx.fill();

      if (firework.y < canvas.height / 2) {
        createParticles(firework);
      }
    } else {
      firework.particles.forEach((particle, particleIndex) => {
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Remove particles when they slow down
        if (particle.speed > 0) {
          particle.speed *= 0.98;
        } else {
          firework.particles.splice(particleIndex, 1);
        }
      });

      // Remove the firework after all particles disappear
      if (firework.particles.length === 0) {
        fireworks.splice(index, 1);
      }
    }
  });

  requestAnimationFrame(animateFireworks);
}

function showFireworks() {
  fireworks.push(createFirework());
  fireworks.push(createFirework());
  animateFireworks();
}
