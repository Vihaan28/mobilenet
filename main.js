var previousresult ="";

function setup() {
  canvas = createCanvas(400, 400);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier( "MobileNet" , modalLoaded);
}

function draw(){

  image(video , 0 , 0 , 400 , 400);
  classifier.classify(video , gotResult);
}

function modalLoaded(){
  console.log("MODAL LOADED!!");
}

function gotResult(error,result){
 if(error){
   console.error(error);
 }
 else{
   if((result[0].confidence > 0.5) && (previousresult != result[0].label)){

    console.log(result);
    previousresult = result[0].label;

    document.getElementById("prediction").innerHTML = result[0].label;
    document.getElementById("prediction_con").innerHTML = result[0].confidence;

    var synth = window.speechSynthesis;
    speak_data = 'object detected is' + result[0].label;
    var utterthis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterthis);
   }
 }
}



