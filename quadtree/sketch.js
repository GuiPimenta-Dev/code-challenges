// let qtree;

// function setup() {
//   createCanvas(400, 400);
//   background(255);
//   let boundary = new Rectangle(200, 200, 200, 200);
//   qtree = new QuadTree(boundary, 4);
//   for (let i = 0; i < 300; i++) {
//     let x = randomGaussian(width / 2, width / 8);
//     let y = randomGaussian(height / 2, height / 8);
//     let p = new Point(x, y);
//     qtree.insert(p);
//   }
// }

// function draw() {
//   background(0);
//   qtree.show();

//   stroke(0, 255, 0);
//   rectMode(CENTER);
//   let range = new Rectangle(mouseX, mouseY, 25, 25);

//   // This check has been introduced due to a bug discussed in https://github.com/CodingTrain/website/pull/556
//   if (mouseX < width && mouseY < height) {
//     rect(range.x, range.y, range.w * 2, range.h * 2);
//     let points = qtree.query(range);
//     for (let p of points) {
//       strokeWeight(4);
//       point(p.x, p.y);
//     }
//   }
// }
//######################################################################################

// Sem Quadtree
// function draw() {
//   background(0);
//   quadtree.show();

//   stroke(0, 255, 0);
//   rectMode(CENTER);
//   let range = new Rectangle(mouseX, mouseY, 100, 100);
//   rect(range.x, range.y, range.w * 2, range.h * 2);
//   let points = quadtree.query(range, []);

//   for (let p of points) {
//     strokeWeight(4);
//     point(p.x, p.y);
//   }
// }

// let particles = [];
// let quadtree;
// function setup() {
//   createCanvas(600, 400);
//   let boundary = new Rectangle(300, 200, 600, 400);
//   quadtree = new QuadTree(boundary);
//   for (let i = 0; i < 2000; i++) {
//     particles[i] = new Particle(random(width), random(height));
//   }
// }

// function draw() {
//   background(0);
//   for (let p of particles) {
//     p.move();
//     p.render();
//     p.setHighlight(false);
//   }

//   for (let p of particles) {
//     for (let other of particles) {
//       if (p !== other && p.intersects(other)) {
//         p.setHighlight(true);
//       }
//     }
//   }

//   document.getElementById("particleCount").innerText =
//     "Particles: " + particles.length;
//   document.getElementById("frameRate").innerText =
//     "Frame Rate: " + nf(frameRate(), 0, 2);
// }

//######################################################################################

// Com Quadtree

let particles = [];
function setup() {
  createCanvas(600, 400);

  for (let i = 0; i < 100; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

function draw() {
  background(0);
  let boundary = new Rectangle(300, 200, 600, 400);
  let quadtree = new QuadTree(boundary, 4);

  for (let p of particles) {
    let point = new Point(p.x, p.y, p);
    quadtree.insert(point);
    p.move();
    p.render();
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

  document.getElementById("particleCount").innerText =
    "Particles: " + particles.length;
  document.getElementById("frameRate").innerText =
    "Frame Rate: " + nf(frameRate(), 0, 2);
}
