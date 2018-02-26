var mic;
var analyzer;
var fft;
var peakDetect;
var peaks;
var volhistory = [];

function setup() {
    createCanvas(700, 500);
    system = new ParticleSystem(createVector(width/2, 50));
    colorMode(RGB);
    angleMode(DEGREES);
    mic = new p5.AudioIn();
    fft = new p5.FFT(0.9, 1024);
    analyzer = new p5.Amplitude();
    peakDetect = new p5.PeakDetect();
    mic.start();
    fft.setInput(mic);
    analyzer.setInput(mic);
    t = 0;
}

function draw() {
    background(0);
    system.addParticle();
    system.run();
    var spectrum = fft.analyze();


  // var x = width * noise(t);
  // var y = height * noise(t+5);
  // var r = 255 * noise(t+10);
  // var g = 255 * noise(t+15);
  // var b = 255 * noise(t+20);
  //
  // noStroke();
  // fill(r, g, b);
  // ellipse(x, y, 120, 120);
  //
  // t = t + 0.01;

    // bargraph
    for(var i = 0; i< spectrum.length; i+=10){
        var x = map(i, 0, spectrum.length, 0, width);
        var h = -height + map(spectrum[i], 0, 255, height, 0);
        fill(i, 0, 200, 200,100);
        rect(x, height, (width / spectrum.length) * 10, h );
    }

    //waveform
    var waveform = fft.waveform();
    noFill();
    beginShape();

    stroke(255,255,255);
    strokeWeight(3);
    for(var i = 0; i< waveform.length; i++){
        var x = map(i, 0, waveform.length, 0, width);
        var y = map( waveform[i]/10, -1, 1, 0, height);
        vertex(x,y);
    }
    endShape();

    var bass = fft.getEnergy('lowMid');
    if(bass){
      stroke(1);
      fill('purple');
      beginShape();
      ellipse(width / 2, height / 2, bass/200 * (height / 2), bass/200 * (height / 2));
      endShape();
    }
    var highmid = fft.getEnergy('highMid');
    if(highmid){
      stroke(1);
      fill(13, 17, 255);
      beginShape();
      ellipse(50, 50, highmid/250 * (height / 2), highmid/250 * (height / 2));
      endShape();

      beginShape();
      ellipse(50, 450, highmid/250 * (height / 2), highmid/250 * (height / 2));
      endShape();

      beginShape();
      ellipse(650, 50, highmid/250 * (height / 2), highmid/250 * (height / 2));
      endShape();

      beginShape();
      ellipse(650, 450, highmid/250 * (height / 2), highmid/250 * (height / 2));
      endShape();

      beginShape();
      ellipse(width / 2, height / 2, highmid/250 * (height / 2), highmid/250 * (height / 2));
      endShape();
    }
    // console.log("highmid:" + highmid);
    var treble = fft.getEnergy('treble');

    if(treble){
      stroke(1);
      fill(255, 196, 13);
      beginShape();
      ellipse(50, 50, treble/250 * (height / 2), treble/250 * (height / 2));
      endShape();

      beginShape();
      ellipse(50, 450, treble/250 * (height / 2), treble/250 * (height / 2));
      endShape();

      beginShape();
      ellipse(650, 50, treble/250 * (height / 2), treble/250 * (height / 2));
      endShape();

      beginShape();
      ellipse(650, 450, treble/250 * (height / 2), treble/250 * (height / 2));
      endShape();

      beginShape();
      ellipse(width / 2, height / 2, treble/250 * (height / 2), treble/250 * (height / 2));
      endShape();
    }
}

// Particles
var Particle = function(position) {
  this.acceleration = createVector(0, 0.05);
  this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.position = position.copy();
  this.lifespan = 255.0;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  stroke(200, this.lifespan);
  strokeWeight(2);
  fill(0, 255, 0, this.lifespan);
  ellipse(this.position.x, this.position.y, 12, 12);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  if (this.lifespan < 0) {
    return true;
  } else {
    return false;
  }
};

var ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};
