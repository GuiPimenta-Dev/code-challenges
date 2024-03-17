let particles = [];
let quadtree;
let useQuadtree = false;

function setup() {
  createCanvas(600, 400);

  let canvas = document.querySelector("#defaultCanvas0");
  let canvasContainer = document.getElementById("canvas-container");
  if (canvas && canvasContainer) {
    canvasContainer.appendChild(canvas);
  }

  // Set up slider event listener
  let particleSlider = document.getElementById("particleSlider");
  particleSlider.addEventListener("input", () => {
    updateParticles(particleSlider.value);
  });

  // Initialize particles
  updateParticles(particleSlider.value);

  // Set up toggle button event listener
  document
    .getElementById("toggleButton")
    .addEventListener("click", toggleQuadtree);
}

function draw() {
  background(0);

  if (useQuadtree) {
    // With Quadtree
    let boundary = new Rectangle(300, 200, 600, 400);
    quadtree = new QuadTree(boundary, 4);
    for (let p of particles) {
      let point = new Point(p.x, p.y, p);
      quadtree.insert(point);
      p.move();
      p.render(0, 0, 255);
      p.setHighlight(false);
    }
    for (let p of particles) {
      let range = new Circle(p.x, p.y, p.r * 2);
      let points = quadtree.query(range);
      for (let point of points) {
        let other = point.userData;
        if (p !== other && p.intersects(other)) {
          p.setHighlight(true);
        }
      }
    }
  } else {
    // Without Quadtree
    for (let p of particles) {
      p.move();
      p.render(255, 0, 0);
      p.setHighlight(false);
    }
    for (let p of particles) {
      for (let other of particles) {
        if (p !== other && p.intersects(other)) {
          p.setHighlight(true);
        }
      }
    }
  }

  document.getElementById("particleCount").innerText =
    "Particles: " + particles.length;
  document.getElementById("frameRate").innerText =
    "Frame Rate: " + nf(frameRate(), 0, 2);
}

// Function to update particles based on slider value
function updateParticles(numParticles) {
  particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

// Toggle Quadtree usage
function toggleQuadtree() {
  useQuadtree = !useQuadtree;
  document.getElementById("quadtreeLabel").innerText = useQuadtree
    ? "Disable Quadtree"
    : "Enable Quadtree";
}
