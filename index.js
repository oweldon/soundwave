var mic;
var volhistory = [];

 function setup() {
   createCanvas(500, 500);
   angleMode(DEGREES);
   mic = new p5.AudioIn();
   mic.start();
 }

 function draw() {
   background(0);
   var vol = mic.getLevel();
   volhistory.push(vol);
   stroke(255);
   noFill();

   translate(width / 2, height / 2);
   beginShape();
   for(var i = 0; i < 360; i++){
     var r = map(volhistory[i], 0, 1, 10, 100);
     var x = r * cos(i);
     var y = r * sin(i);
     // var y = map(volhistory[i], 0, 1, height/2, 0);
     vertex(x, y);
   }
   endShape();

   if(volhistory.length > 360){
     volhistory.splice(0, 1);
   }

   var diam = map(vol, 0, 0.3, 10, 200);
   fill(255, 0, 255);
   // ellipse(width / 2, height / 2, diam, diam);
 }
