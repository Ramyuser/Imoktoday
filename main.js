Webcam.set({
    width: 350,
    height: 300,
    image_formant: "png",
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("results").innerHTML = '<img id= "captureimage " src=" ' + data_uri + '" / > ';
    });
}
console.log("ml5 version:", ml5.version);
classfier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/ZggTXvgOZ/model.json", modelLoaded);

function modelLoaded() {
    console.log("model Loaded");
}

function check() {
    img = document.getElementById('captureimage');
    classfier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("results_name").innerHTML = results(0).lable;
        document.getElementById("results_accuracy").innerHTML = results(0).confidince.tofixed;
    }
}