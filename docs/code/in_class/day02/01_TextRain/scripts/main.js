let capture;

let w = 640;
let h = 480;
let x = 14

let threshold01 = 80;
let threshold02 = 160;
let brightnessThreshold = 80;

let threshCanvas;

let characters = [];


function setup() {
  createCanvas(w, h);
  threshCanvas = createGraphics(w, h);
  capture = createCapture(VIDEO);
  capture.hide();
  pixelDensity(1);
  
  textSize(16);
  
  let sourceText = "this is a lot of falling text around me";
  
  let xSpacing = 14;
  
  for (let c of sourceText) {
    
    // let newC = new Character(c, x, random(80));
    characters.push(new Character(c, x, 14));
    x+=xSpacing;
  }
}

function draw() {
  push();
  translate(width, 0);
  scale(-1, 1);
  image(capture, 0, 0);
  pop();

  loadPixels();
  threshCanvas.loadPixels();
  capture.loadPixels();
  
  threshold01 = map(mouseX, 0, width, 1, 255);

  
  for (let y = 0; y < h; y++ ) {
    for (let x = 0; x < w; x++ ) {
      let index = (x + y*w)*4;
      //seperate each color channel
      let r = capture.pixels[index];
      let g = capture.pixels[index+1];
      let b = capture.pixels[index+2];
      
      let totalBrightness = r + g + b;
      
      let brightness = totalBrightness/3.0;
      
      if(brightness < threshold01){
        // set pixels to black
        // were going to set the pixel values of the capture values.
        capture.pixels[index] = 0;
        capture.pixels[index+1] = 0;
        capture.pixels[index+2] = 0;
        
      } else if(brightness > threshold01 && brightness < threshold02) { 
        
        capture.pixels[index] = 255;
        capture.pixels[index+1] = 0;
        capture.pixels[index+2] = 0;
        
        
      }
      else {
        
        capture.pixels[index] = 0;
        capture.pixels[index+1] = 255;
        capture.pixels[index+2] = 255;   
      }
      
      
    }
    
  }
  
  capture.updatePixels();
  
   for(let i = 0; i < characters.length; i++) {
      
      // while the FallingLetter is not at the top of the screen AND
      // it's touch a dark area that is below our threshold, move the letter up
      while(characters[i].y > 0 && getBrightness(capture.pixels, i) < brightnessThreshold) {
        characters[i].y--;
      }
      
      // if a character reaches the bottom of the screen, reset it to the top
      if(characters[i].y >= h) {
        characters[i].y = 0;
        
        // otherwise, make the character descend.
      } else {
        characters[i].y++;
      }
    }
  
  updatePixels();
  
    for (let c of characters) {
    text(c.c, c.x, c.y);
    }
  
//     c.y++;
    
      
//        if(c.y > threshold02) {
//       c.y = threshold02;
//     }
      
      
//       if(c.y > height) {
//       c.y = 0;
//     }
  
//     }
  
}



function getBrightness(_pixels, _i) {
  
  // create a placeholder variable so we don't have to type as much
  let c = characters[_i];
  
  // convert the (x, y) coordinate of the current camera feed pixel into
  // its single-dimensional array version. Note that we use (w-fl.x). That
  // is because we're mirroring our webcam feed when we draw it, and so we
  // need to make sure we "mirror" the pixel on which we're calculating the
  // brightness
  
  let index = ((w-c.x) + (c.y * w)) * 4;
  
  let r = _pixels[index];
  let g = _pixels[index+1];
  let b = _pixels[index+2];
  
  let colorTotal = r + g + b;
  let brightness = colorTotal/3.0; // a number out of 255
  
  return brightness;
}
    
 
  


  



class Character {
    
  constructor(_c, _x, _y) {

      this.x = _x;
      this.y = _y;
      this.c = _c;
    }
  }