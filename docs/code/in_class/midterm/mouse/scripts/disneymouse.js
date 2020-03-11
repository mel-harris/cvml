let trail = [];

let capture;
let a = 0;
let w = 640;
let h = 480;


function setup() {
  createCanvas(w, h);
  capture = createCapture(VIDEO);
  
  capture.hide();
   
}

function draw() {
 // background(220);
  noFill();
  
   push();
  translate(w, 0);
  scale(-1, 1);
  image(capture,0,0);
  pop();
  
    line(mouseX, mouseY, pmouseX, pmouseY);
  draw_trail();
  print(pmouseX + ' -> ' + mouseX);
  strokeWeight(15);
    stroke(51, 200, 255);
  
 

}

function mouseMoved(){

  trail.push([mouseX,mouseY]);
  while(trail.length > 100){
    trail.shift();
  }
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