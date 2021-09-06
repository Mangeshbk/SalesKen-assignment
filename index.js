let canvas = document.getElementById("canvas-bars");
let context = canvas.getContext("2d");
var changingLength = 1;
canvas.width = 1300;
canvas.height = 400;
let btn_icon = document.getElementById("ctrl-icon");
let play_pause = document.getElementById("play-pause");
//   let audio = new Audio();
//   audio.src = "./assets/flute_music.mp3";
let audio = document.getElementById("audio");
let isPlaying = false;

//initializing to create bars
var width = 5;
var height = [];
var X = 5;
var Y = [];

for (let i = 0; i <= 130; i++) {
  Y.push(Math.floor(Math.random() * 80) + 10);
  height.push(Math.floor(Math.random() * 200) + 100);
}

for (let i = 0; i <= 130; i++) {
  context.beginPath();
  context.fillStyle = "#DADADB";
  if (i == 130) height[i] = 500;
  context.fillRect(X, Y[i], width, height[i]);
  context.closePath();
  X = X + 10;
}

nameTag(48, 0, "#11D122", "Introduction");
nameTag(205, 0, "#22DD8C", "one_six");
nameTag(905, 0, "#1A00B8", "Profile");
nameTag(1048, 30, "#926666", "Rapport Building-Empathy");
nameTag(1112, 0, "#67A543", "Rapport Building-Energy");

// filleing the bars colors w.r.t change
function fillBar(val) {
  var length = val;
  console.log(val);
  X = 5;
  // changing bars color
  context.fillStyle = "#C895A6";
  for (let i = 0; i < length; i++) {
    context.beginPath();
    context.fillRect(X, Y[i], width, height[i]);
    context.closePath();
    X = X + 10;
  }
  // resetting bars color
  context.fillStyle = "#DADADB";
  for (let i = length; i <= 130; i++) {
    context.beginPath();
    context.fillRect(X, Y[i], width, height[i]);
    context.closePath();
    X = X + 10;
  }
  // resetting duration after completing cycle
  if (changingLength >= 130) {
    audio.pause();
    changingLength = 0;
    btn_icon.src =
      "https://icon-library.com/images/android-triangle-icon/android-triangle-icon-7.jpg";
    clearInterval(interval);
  }
}

// Function For Creating Tags;
function nameTag(X, Y, backgroungColor, note) {
  let tagWidth = note.length * 6.6;
  let notePosition = X + tagWidth / 2;

  //creating rectangle box
  context.fillStyle = backgroungColor;
  context.beginPath();
  context.fillRect(X, Y, tagWidth, 20);

  //Text inside the Rectangle box
  context.fillStyle = "#fff";
  context.font = "10pt bold";
  context.fillText(note, X + 5, Y + 15);

  //Direction line for tag
  context.beginPath();
  context.moveTo(notePosition, Y + 20);
  context.lineTo(notePosition, 100);
  context.strokeStyle = backgroungColor;
  context.stroke();
  context.closePath();

  // Circlular point at the Bottom of tag
  context.beginPath();
  context.arc(notePosition, 100, 5, 0, Math.PI * 2);
  context.fillStyle = backgroungColor;
  context.fill();
  context.closePath();
}

// jumping to clicked bars
canvas.addEventListener("click", jumpOnCanvas);
function jumpOnCanvas(e) {
  var change_value = Math.round(e.layerX / 10);
  audio.currentTime = change_value;
  console.log(change_value);
  changingLength = change_value;
  fillBar(change_value);

  // hover circular effet onClicking;

  // setTimeout(() => {
  //   context.beginPath();
  //   context.arc(e.offsetX, e.offsetY, 30, 0, Math.PI * 2);
  //   context.strokeStyle = "#C895A6";
  //   context.lineWidth = 3;
  //   context.stroke();
  //   context.closePath();
  // }, 150);
}

// play pause contolling function
play_pause.addEventListener("click", playAudio);

var changingLength = 1;
var interval;
function playAudio() {
  let audio = document.getElementById("audio");

  if (interval == undefined) {
    audio.play();
    btn_icon.src =
      "https://creazilla-store.fra1.digitaloceanspaces.com/emojis/56573/pause-button-emoji-clipart-xl.png";

    interval = setInterval(() => {
      fillBar(changingLength);
      changingLength++;
    }, 1000);
    console.log("play");
  } else {
    audio.pause();
    console.log("pause");
    btn_icon.src =
      "https://icon-library.com/images/android-triangle-icon/android-triangle-icon-7.jpg";
    clearInterval(interval);
    interval = undefined;
  }
}

// just trying
//   function PlayAudio() {
//     isPlaying ? audio.pause() : audio.play();
//     if (!isPlaying) {
//       fillBar(changingLength);
//       interval = setInterval(() => {
//         fillBar(changingLength);
//         changingLength++;
//       }, 1000);
//     } else {
//       clearInterval(interval);
//     }
//   }
//   var time;
//   audio.onplaying = function () {
//     isPlaying = true;
//     //audio.currentTime = change_value;
//     console.log(audio.currentTime);
//     console.log((time = change_value));
//     btn_icon.src =
//       "https://creazilla-store.fra1.digitaloceanspaces.com/emojis/56573/pause-button-emoji-clipart-xl.png";
//   };
//   audio.onpause = function () {
//     isPlaying = false;

//     btn_icon.src =
//       "https://icon-library.com/images/android-triangle-icon/android-triangle-icon-7.jpg";
//   };
