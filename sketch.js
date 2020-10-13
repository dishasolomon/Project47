var bBalloon, yBalloon, rBalloon;
var bBalloonImg, yBalloonImg, rBalloonImg;
var pBalloon, oBalloon;
var pBalloonImg, oBalloonImg;
var bird1, bird1Img;
var bird2, bird2Img;
var bow, bowImg, arrowImg, arrow;
var score = 0;
var birdScore = 50;

var background1, background2;

var gameState = "start";

var arrowSound, popSound

function preload(){

  bBalloonImg = loadImage("images/BlueBalloon.png");
  yBalloonImg = loadImage("images/YellowBalloon.png");
  rBalloonImg = loadImage("images/RedBalloon.png");
  pBalloonImg = loadImage("images/PinkBalloon.png");
  oBalloonImg = loadImage("images/OrangeBalloon.png");

  bird1Img = loadImage("images/Bird1.png");
  bird2Img = loadImage("images/Bird2.png");

  bowImg = loadImage("images/Bow.png");
  arrowImg = loadImage("images/Arrow.png");

  background1 = loadImage("images/forestBackground.jpg");
  background2 = loadImage("images/morningBackground.jpg");

  arrowSound = loadSound("Sounds/Arrow+Swoosh+1.mp3");
  popSound = loadSound("Sounds/Pop-sound-effect.mp3");
}
function setup() {
  createCanvas(800,400);

  bow = createSprite(770,100,50,50);
  bow.addImage(bowImg);
  bow.scale = 0.4;

  bBalloonGroup = new Group();
  yBalloonGroup = new Group();
  rBalloonGroup = new Group();
  pBalloonGroup = new Group();
  oBalloonGroup = new Group();

  bird1Group = new Group();
  bird2Group = new Group();

  arrowGroup = new Group();
}

function draw() {
  background(background1);

  bow.y = mouseY;

  if(gameState === "start"){
    background(background1);

    textFont("ARIAL BLACK");
    textSize(25);
    fill(255,255,255);
    text("Press 's' to start", 320,200);
    textSize(15);
    text("Rules: Your goal is to shoot as many balloons as possible",190,240);
    text("Each balloon will get you some points", 275,280);
    text("But shooting birds reduces your life!", 285,320);
    text("Score as many points as you can before you run out of lives", 185,360);
    if(keyDown("s")){
      gameState = "play";
    }
  }

  if(gameState === "play"){
    background(background2)
    Balloon();
    Bird();

    if(keyDown("space")){
      drawArrow();
      arrowSound.play();
    }
  
    for(var i = 0; i < bBalloonGroup.length; i++){
      if(bBalloonGroup.get(i).isTouching(arrowGroup)){
        bBalloonGroup.get(i).destroy();
        score = score+5;
        popSound.play();
      }
    }
  
    for(var i = 0; i < rBalloonGroup.length; i++){
      if(rBalloonGroup.get(i).isTouching(arrowGroup)){
        rBalloonGroup.get(i).destroy();
        score = score+4;
        popSound.play();
      }
    }
  
    for(var i = 0; i < yBalloonGroup.length; i++){
      if(yBalloonGroup.get(i).isTouching(arrowGroup)){
        yBalloonGroup.get(i).destroy();
        score = score+1;
        popSound.play();
      }
    }
  
    for(var i = 0; i < pBalloonGroup.length; i++){
      if(pBalloonGroup.get(i).isTouching(arrowGroup)){
        pBalloonGroup.get(i).destroy();
        score = score + 2;
        popSound.play();
      }
    }
  
    for(var i = 0; i < oBalloonGroup.length; i++){
      if(oBalloonGroup.get(i).isTouching(arrowGroup)){
        oBalloonGroup.get(i).destroy();
        score = score + 3;
        popSound.play();
      }
    }
  
    for(var i = 0; i < bird1Group.length; i++){
      if(bird1Group.get(i).isTouching(arrowGroup)){
        bird1Group.get(i).destroy();
        arrowGroup.destroyEach();
        birdScore = birdScore - 2;
      }
    }
  
    for(var i = 0; i < bird2Group.length; i++){
      if(bird2Group.get(i).isTouching(arrowGroup)){
        bird2Group.get(i).destroy();
        arrowGroup.destroyEach();
        birdScore = birdScore - 2;
      }
    }
  
    if(birdScore === 0){
      gameState = "end";
    }
  }

  if(gameState === "end"){
    background(background2);

    bBalloonGroup.destroyEach();
    yBalloonGroup.destroyEach();
    rBalloonGroup.destroyEach();
    pBalloonGroup.destroyEach();
    oBalloonGroup.destroyEach();

    textSize(25);
    textFont("ARIAL BLACK");
    stroke("green");
    fill("green");
    text("Game Over", 370,200);
    text("You scored "+score+" points!", 300,230);
    text("Press 'r' to restart the game!", 260,260);

    if(keyDown("r")){
      gameState = "play";
      score = 0;
      birdScore = 50;
    }
  }

  strokeWeight(1);
  stroke("green");
  textSize(25);
  textFont("ARIAL BLACK");
  fill("green");
  text("Score: "+score, 50,60);
  text("Life: "+birdScore, 50,100);

  drawSprites();

}

function Balloon(){
  if(frameCount % 60 === 0){
    bBalloon = createSprite(random(0,700),400,50,50);
    bBalloon.velocityY = random(-1,-4);
    bBalloon.addImage(bBalloonImg);
    bBalloon.scale = 0.14;

    bBalloon.lifetime = 700;
    bBalloonGroup.add(bBalloon);
  }

  if(frameCount % 131 === 0){
    yBalloon = createSprite(random(0,700),400,50,50);
    yBalloon.velocityY = random(-1,-4);
    yBalloon.addImage(yBalloonImg);
    yBalloon.scale = 0.14;

    oBalloon = createSprite(random(0,700),400,50,50);
    oBalloon.velocityY = random(-1,-4);
    oBalloon.addImage(oBalloonImg);
    oBalloon.scale = 0.36;

    yBalloon.lifetime = 700;
    yBalloonGroup.add(yBalloon);
    oBalloon.lifetime = 700;
    oBalloonGroup.add(oBalloon);
  }

  if(frameCount % 187 === 0){
    rBalloon = createSprite(random(0,700),400,50,50);
    rBalloon.velocityY = random(-1,-4);
    rBalloon.addImage(rBalloonImg);
    rBalloon.scale = 0.14;

    pBalloon = createSprite(random(0,700),400,50,50);
    pBalloon.velocityY = random(-1,-4);
    pBalloon.addImage(pBalloonImg);
    pBalloon.scale = 0.14;

    rBalloon.lifetime = 700;
    rBalloonGroup.add(rBalloon);
    pBalloon.lifetime = 700;
    pBalloonGroup.add(pBalloon);
  }
}

function Bird(){
  if(frameCount % 162 === 0){
    bird1 = createSprite(0,random(380,400),50,50);
    bird1.velocityX = random(2,5);
    bird1.velocityY = random(-2,-4);
    bird1.addImage(bird1Img);
    bird1.scale = 0.11;
    bird1.lifetime = 175;
    bird1Group.add(bird1);
  }

  if(frameCount % 275 === 0){
    bird2 = createSprite(400,random(380,400),50,50);
    bird2.velocityX = random(-2,-5);
    bird2.velocityY = random(-2,-4);
    bird2.addImage(bird2Img);
    bird2.scale = 0.13;
    bird2.lifetime = 175
    bird2Group.add(bird2);
  }
}

function drawArrow(){
  arrow = createSprite(750,10,50,50);
  arrow.addImage(arrowImg);
  arrow.y = bow.y;
  arrow.scale = 0.1;
  arrow.velocityX = -7

  arrow.lifetime = 188;
  arrowGroup.add(arrow);
}
