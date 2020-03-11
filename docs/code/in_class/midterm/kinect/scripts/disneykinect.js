let trail = [];
let kinectron;

let hands;
let pHands;
let a = 0;
let w = 1280;
let h = 720;


function setup() {
  createCanvas(w, h);
  // capture = createCapture(VIDEO);
  
  // capture.hide();
  kinectron = new Kinectron("10.72.29.116");
  
  // kinectron.makeConnection();

  kinectron.makeConnection();
  kinectron.startTrackedJoint(kinectron.HANDTIPRIGHT, drawRightHand);
  // kinectron.startTrackedBodies(drawRightHand);

  // console.log(kinectron);
}

function draw() {
 // background(220);
  noFill();
  
   push();
  translate(w, 0);
  scale(-1, 1);
  image(capture,0,0);
  pop();
  
    line(handX, handY, phandX, phandY);
  draw_trail();
  print(phandX + ' -> ' + handX);
  strokeWeight(15);
    stroke(51, 200, 255);
  
 

}

function drawBody(body) {
  let hand  = getPos(body.joints[kinectron.HANDTIPRIGHT]);

}

function handMoved() {

  trail.push([handX, handY]);
  while(trail.length > 100){
    trail.shift();

  // kinectron.getJoints(drawJoint);
  // let hand = getPos(body.joints[kinectron.HANDTIPRIGHT]);


  }
  // hands[hand.trackingId] = hand;
  // not sure if this is right^^^
  //   a = 0;
  // }
  // a += 8;
//  println(trail);
}

function draw_trail(){
  beginShape();
  for(var i = 0; i < trail.length; i++){
    vertex(trail[i][0], trail[i][1]);
    if (a > 400) {
      trail.shift();
      a = 0;
    }
    a += 8;
  }
  endShape();
}
//  trail.push([mouseX, mouseY]);
//   while(trail.length > 100) {
//   // for(let i = 0; i < trail.length; i++) {
//   // noStroke();
//   // fill(255, 20, 189, a);
//   // ellipse(trail[i][0], trail[i][1], 8);
//     if(a > 100) {
//       trail.shift();
//       // a = 0;
//     }
//     // a += 10;
//   }
//   // console.log(trail.length);

// }

// function draw_tail(){
//   beginShape();
//   for(var i = 0; i < trail.length;i++){
//     vertex(trail[i][0], trail[i][1]);
//   }
//   endShape();
// }