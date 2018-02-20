var mic;

 function setup() {
   createCanvas(500, 500);
   mic = new p5.AudioIn();
   amp = new p5.Amplitude();
   mic.start();
 }

 function draw() {
   background(0);
   var vol = mic.getLevel();
   var diam = map(vol, 0, 0.3, 10, 200);
   fill(255, 0, 255);
   ellipse(width / 2, height / 2, diam, diam);
 }
