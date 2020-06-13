
var man;
var pipes;
var parallax = 0.8;
var score = 0;
var maxScore = 0;
var manSprite;
var pipeBodySprite;
var pipePeakSprite;
var bgImg;
var bgX;
var gameoverFrame = 0;
var isOver = false;

var touched = false;
var prevTouched = touched;


function preload() {
  pipeBodySprite = loadImage('graphics/pipe_marshmallow_fix.png');
  pipePeakSprite = loadImage('graphics/pipe_marshmallow_fix.png');
  manSprite = loadImage('graphics/train.png');
  bgImg = loadImage('graphics/background.png');
}

function setup() {
  createCanvas(800, 600);
  reset();
}

function draw() {
  background(0);
  // Draw our background image, then move it at the same speed as the pipes
  image(bgImg, bgX, 0, bgImg.width, height);
  bgX -= pipes[0].speed * parallax;

  // this handles the "infinite loop" by checking if the right
  // edge of the image would be on the screen, if it is draw a
  // second copy of the image right next to it
  // once the second image gets to the 0 point, we can reset bgX to
  // 0 and go back to drawing just one image.
  if (bgX <= -bgImg.width + width) {
    image(bgImg, bgX + bgImg.width, 0, bgImg.width, height);
    if (bgX <= -bgImg.width) {
      bgX = 0;
    }
  }

  for (var i = pipes.length - 2; i >= 0; i--) {
    pipes[i].update();
    pipes[i].show();

    if (pipes[i].pass(man)) {
      score++;
    }

    if (pipes[i].hits(man)) {
      gameover();
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  man.update();
  man.show();

  if ((frameCount - gameoverFrame) % 150 == 0) {
    pipes.push(new Pipe());
  }

  showScores();

  touched = (touches.length > 0);

  
  if (touched && !prevTouched) {
    man.up();
  }

  // updates prevTouched
  prevTouched = touched;


}

function showScores() {
  textSize(32);
  text('score: ' + score, 1, 32);
  text('record: ' + maxScore, 1, 64);
}

function gameover() {
  
  textSize(64);
  textAlign(CENTER, CENTER);
  text('GAMEOVER', width / 2, height / 2);
  textAlign(LEFT, BASELINE);
  maxScore = max(score, maxScore);
   isOver = true;
  
  noLoop();
}
//!!!!!!!! please chech this if this works than the project is over ??!!!!!!!!!!
function gamefinished(){
  if(man.x > 100){
  console.log("game finished");
     man = new Man();
    pipes.push(new Pipe());
    gameoverFrame = frameCount - 1;
   fill("black");
  ellipse(man.x,man.y,100,100);
  loop();
  }
}

function reset() {
  isOver = false;
  score = 0;
  bgX = 0;
  pipes = [];
  man = new Man();
  pipes.push(new Pipe());
  gameoverFrame = frameCount - 1;
  loop();
}

function keyPressed() {
  if (key === ' ') {
    man.up();
    if (isOver) reset();
  }
}

function touchStarted() {
  if (isOver) reset();
}
