let w = 1280;
let h = 720;
let particles = [];

let kinectron;

function setup() {
    createCanvas(w, h);
    background(0);

    kinectron = new Kinectron("10.73.23.30");

    kinectron.makeConnection();
    kinectron.startTrackedBodies(drawBody);
    console.log(kinectron);

    const NUM_PARTICLES = 1000;

    for(let i = 0; i < NUM_PARTICLES; i++) {
        let p = new Particle();
        particles.push(p);
    }
}




function draw() {
    
}

function drawBody(body) {
    background(0);

    // console.log(body);

    // for(let i = 0; i < body.joints.length; i++) {
    //     fill(255, 0, 0);
    //     ellipse(body, joints[i].depthX*w, body.joints[i].depthY*h, 20, 20);
    // }

    let lh = createVector(body.joints[7].depthX*w, body.joints[7].depthY*h);
    let rh = createVector(body.joints[11].depthX*w, body.joints[11].depthY*h);
  
    fill(0, 255, 0);
    ellipse(lh.x, lh.y, 20, 20);

    fill(0, 0, 255);
    ellipse(rh.x, rh.y, 20, 20);

    
    let mPos = p5.Vector.lerp(lh, rh, 0.5);
    forceScaler = -30;

    fill(255, 0, 0);
   
    for(let i = 0; i < particles.length; i++) {

            let p = particles [i]
            let d = dist(mPos.x, mPos.y, p.pos.x, p.pos.y);
            let magnitude = forceScaler / (d+15);
            let forceDirection = p.pos.sub(mPos);
            forceDirection.normalize();
            let newForce = forceDirection.mult(magnitude);
            p.force.add(newForce);

    p.update();
    p.draw();
    }

}



class Particle {
    constructor() {
      this.pos = createVector(w/2, h/2);
      this.vel = createVector(random(-10, 10), random(-10, 10));
      this.accel = createVector(random(-0.1, 0.1), random(-0.1, 0.1));
      this.color = [random(255), 255, 255];
      this.radius = random(4, 16);
      this.force = createVector(0, 0);
      this.drag = 0.97;
    }

    update() {
        this.vel.add(this.force);
        this.vel.mult(this.drag);
        this.pos.add(this.vel);
    }

    draw() {
        ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
    }
 
  }
  