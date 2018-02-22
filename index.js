var mic;
var analyzer;
var fft;
var peakDetect;
var peaks;

function setup() {
    createCanvas(700, 500);
    colorMode(HSB);
    mic = new p5.AudioIn();
    fft = new p5.FFT(0.9, 1024);
    analyzer = new p5.Amplitude();
    peakDetect = new p5.PeakDetect();
    mic.start();
    fft.setInput(mic);
    analyzer.setInput(mic);
}

function draw() {
    background(0);
    var spectrum = fft.analyze();
    // peakDetect.update(fft);

    //bargraph
    for(var i = 0; i< spectrum.length; i+=10){
        var x = map(i, 0, spectrum.length, 0, width);
        var h = -height + map(spectrum[i], 0, 255, height, 0);
        fill(i, 255, 255);
        rect(x, height, (width / spectrum.length) * 10, h );
    }

    //waveform
    var waveform = fft.waveform();
    noFill();
    beginShape();

    stroke(255,255,255);
    strokeWeight(3);
    for(var i = 0; i< waveform.length; i+=10){
        var x = map(i, 0, waveform.length, 0, width);
        var y = map( waveform[i]/10, -1, 1, 0, height);
        vertex(x,y);
    }
    endShape();

    //ellipse
    var rms = analyzer.getLevel();
    if(rms > 0.01){
      fill('purple')
    }else {
      fill('blue');
    }
    stroke(1);
    strokeWeight(1);
    ellipse(width / 2, height / 2, 20 + rms * (height / 2), 20 + rms * (height / 2));

    var bass = fft.getEnergy('lowMid');
    console.log(bass)
    if(bass < 400){
      stroke(1);
      fill('white');
      beginShape();
      ellipse(width / 2, height / 2, bass/150 * (height / 2), bass/150 * (height / 2));

      endShape();
    }
    // console.log("bass:" + bass);
    var highmid = fft.getEnergy('highMid');
    if(highmid < 200){
      stroke(1);
      fill('red');
      beginShape();
      ellipse(50, 50, highmid/200 * (height / 2), highmid/200 * (height / 2));

      endShape();
    }
    // console.log("highmid:" + highmid);
    var treble = fft.getEnergy('treble');
    // console.log("treble:" + treble);
}
