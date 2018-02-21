var mic;
var fft;
var analyzer;
var fft;
var peakDetect;
var peaks;

function setup() {
    createCanvas(500, 500);
    colorMode(HSB);
    mic = new p5.AudioIn();
    fft = new p5.FFT(0.9, 512);
    analyzer = new p5.Amplitude();
    peakDetect = new p5.PeakDetect();
    mic.start();
    fft.setInput(mic);
    analyzer.setInput(mic);
    // peaks = mic.getPeaks();
}

var r = 0, g = 0, b = 0, o = 0;

function draw() {
    background(0);
    var spectrum = fft.analyze();
    peakDetect.update(fft);
    fill('rgba(50,50,50,1)');
    stroke('rgba(50,50,50,1)');
    strokeWeight(1);

    for (var i = 0; i< spectrum.length; i+=10){
        var x = map(i, 0, spectrum.length, 0, width);
        var h = -height + map(spectrum[i], 0, 255, height, 0);
        fill(i, 255, 255)
        rect(x, height, (width / spectrum.length) * 10, h )
    }

    var waveform = fft.waveform();
    noFill();
    beginShape();

    stroke(255,255,255); // waveform is white
    strokeWeight(1);
    for (var i = 0; i< waveform.length; i+=10){
        var x = map(i, 0, waveform.length, 0, width);
        var y = map( waveform[i]/10, -1, 1, 0, height);
        vertex(x,y);
    }
    endShape();

    var rms = 0;
    if ( peakDetect.isDetected ) {
        rms = analyzer.getLevel();
        r = 127;
        g = -127;
        b = -188;
        o = .5;

    } else {
        r = r * .85;
        g = g * .85;
        b = b * .85;
        o = o * .85;
        rms = analyzer.getLevel();
    }
    fill('rgba('+parseInt(127 + r)+','+parseInt(127 + g)+','+parseInt(127 + b)+','+(.5 + o)+')');
    fill('rgb(159, 6, 170)');
    // Get the average (root mean square) amplitude
    var rms = analyzer.getLevel();

    stroke(0);
    strokeWeight(0);

    // Draw an ellipse with size based on volume
    ellipse(width / 2, height / 2, 10 + rms * (height / 2), 10 + rms * (height / 2));
}
