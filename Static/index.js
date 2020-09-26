var buttons = {
    play: document.getElementById("btn-play"),
    pause: document.getElementById("btn-pause"),
    stop: document.getElementById("btn-stop")
};

// Create an instance of wave surfer with its configuration
var Spectrum = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'purple',
    progressColor: "red",
    plugins: [
        WaveSurfer.spectrogram.create({
            wavesurfer: Spectrum,
            container: "#spectogram",
            labels: true,
        })
    ]
});

// Handle Play button
buttons.play.addEventListener("click", function(){
    Spectrum.play();

    // Enable/Disable respectively buttons
    buttons.stop.disabled = false;
    buttons.pause.disabled = false;
    buttons.play.disabled = true;
}, false);

// Handle Pause button
buttons.pause.addEventListener("click", function(){
    Spectrum.pause();

    // Enable/Disable respectively buttons
    buttons.pause.disabled = true;
    buttons.play.disabled = false;
}, false);


// Handle Stop button
buttons.stop.addEventListener("click", function(){
    Spectrum.stop();

    // Enable/Disable respectively buttons
    buttons.pause.disabled = true;
    buttons.play.disabled = false;
    buttons.stop.disabled = true;
}, false);


// Add a listener to enable the play button once it's ready
Spectrum.on('ready', function () {
    buttons.play.disabled = false;
});

// If you want a responsive mode (so when the user resizes the window)
// the spectrum will be still playable
window.addEventListener("resize", function(){
    // Get the current progress according to the cursor position
    var currentProgress = Spectrum.getCurrentTime() / Spectrum.getDuration();

    // Reset graph
    Spectrum.empty();
    Spectrum.drawBuffer();
    // Set original position
    Spectrum.seekTo(currentProgress);

    // Enable/Disable respectively buttons
    buttons.pause.disabled = true;
    buttons.play.disabled = false;
    buttons.stop.disabled = false;
}, false);

document.addEventListener('DOMContentLoaded', function() {
    // Load a colormap json file to be passed to the spectrogram.create method.
    WaveSurfer.util
        .fetchFile({ url: 'hot-colormap.json', responseType: 'json' })
        .on('success', colorMap => {
            initAndLoadSpectrogram(colorMap);
        });
    });

// Load the audio file from your domain !
Spectrum.load('static/Visualizations/american_crow.mp3');