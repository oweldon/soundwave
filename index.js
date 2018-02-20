var mic;
function setup(){
  createCanvas(200, 200);
  mic = new p5.AudioIn();
  mic.start();
}
