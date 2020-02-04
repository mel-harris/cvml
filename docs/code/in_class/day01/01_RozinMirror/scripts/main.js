// this is how you leave notes for yourself in comments

let myCapture;

function setup() {
  let canvas = createCanvas(640, 480);


  myCapture = createCapture(VIDEO);
  myCapture.hide();
  fill(255, 0, 255);
  noStroke();
}

function draw() {
  background(0);
  // fill(random(255), random(255), random(255))
  // load pixel data into myCapture object
  myCapture.loadPixels();

  const stepSize = round(constrain(mouseX / 8, 6, 32));

  for (let y = 0; y < height; y += stepSize) {
    // this says "don't do every single y pixel, only every x amount"
    for (let x = 0; x < width; x += stepSize) {
      const i = y * width + x;
      // this turns these two dimensions into one 
      const darkness = (255 - myCapture.pixels[i * 4]) / 255
      // the [i*4] reduces the 4 value information in RGBA to just one. this reduces the intake of information.
      const radius = stepSize * darkness;
   
      ellipse(x, y, radius, radius);
        stroke(245, 0, 0);
        strokeWeight(map(radius, 0, stepSize, 0, 2));
        fill(map(radius, 0, stepSize, 0, 255), 0, 240, 240);
      
    }
  }
}