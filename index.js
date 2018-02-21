var mic;
var volhistory = [];

 function setup() {
   createCanvas(500, 500);
   mic = new p5.AudioIn();
   mic.start();
 }

 function draw() {
   background(0);
   var vol = mic.getLevel();
   volhistory.push(vol);
   stroke(255);
   noFill();
   beginShape();
   for(var i = 0; i < volhistory.length; i++){
     var y = map(volhistory[i], 0, 1, height/2, 0);
     vertex(i, y);
   }
   endShape();

   if(volhistory.length > width){
     volhistory.splice(0, 1);
   }

   var diam = map(vol, 0, 0.3, 10, 200);
   fill(255, 0, 255);
   // ellipse(width / 2, height / 2, diam, diam);
 }
