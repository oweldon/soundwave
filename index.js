var mic;
var analyzer;
var fft;
var peakDetect;
var peaks;
var volhistory = [];

function setup() {
    createCanvas(700, 500);
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
    var spectrum = fft.analyze();

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
