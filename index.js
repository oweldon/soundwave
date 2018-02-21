var mic;
var fft;
var volhistory = [];
var w;

 function setup() {
   createCanvas(512, 512);
   colorMode(HSB);
   angleMode(DEGREES);
   mic = new p5.AudioIn();
   mic.start();
   fft = new p5.FFT(0.9, 64);
   fft.setInput(mic);
   w = width / 64;
 }

 function draw() {
   background(0);
   var spectrum = fft.analyze();
   noStroke();
   for(var i = 0; i < spectrum.length; i++){
     var amp = spectrum[i];
     var y = map(amp, 0, 256, height, 0);
     fill(i, 255, 255);
     rect(i*w, y, w - 2 , height - y);
   }
   stroke(255);
   noFill();
 }
