 var PLAY=1;
var END=0;
var gamestate=PLAY;
var coingroup;
var traingroup;
var path,pathImage;
var jake,jakeImage;
var coin,coinImage;
var train,trainImage;
var leftBoundary,rightBoundary;
var sound;
var score=0;
var restart,restartImage;
var gameover,gameoverImage;
var back,backImage;
function preload(){
  pathImage=loadImage("path.png");
  jakeImage = loadAnimation("Jake1.png","Jake2.png","jake3.png","jake4.PNG","jake5.png");
  coinImage=loadImage("coin.png");
  trainImage=loadImage("thomas.png");
  restartImage=loadImage("reload.png");
  gameoverImage=loadImage("gameover.png")
  backImage=loadImage("Cyan.png")
  sound=loadSound("Subway.mp3")
}
function setup() {
  createCanvas(400, 400);
  path=createSprite(200,200)
  path.addImage(pathImage)
  path.scale=1.2
  jake=createSprite(300,300,59,200)
  jake.addAnimation("jakerunning",jakeImage)
  jake.scale=0.5
  leftBoundary=createSprite(0,0,100,800);
leftBoundary.visible = false;

//create right Boundary
rightBoundary=createSprite(410,0,100,800);
rightBoundary.visible = false;
  

    back=createSprite(200,200,25,10) ;
   back.addImage(backImage);
    back.scale=0.4;
  
     restart=createSprite(200,250,25,10) ;
   restart.addImage(restartImage);
    restart.scale=0.2;
    
    gameover=createSprite(200,150,25,10) ;
   gameover.addImage(gameoverImage);
  gameover.scale=0.4
  coingroup=new Group ();
  traingroup=new Group ();

  sound.loop();
}

function draw() {
    background(220);
  jake.x=World.mouseX
  
  edges= createEdgeSprites();
  jake.collide(edges[3]);
  jake.collide(leftBoundary);
  jake.collide(rightBoundary);
if (gamestate===PLAY){
  back.visible=false;
  gameover.visible=false;
  restart.visible=false;
    // movingpath
    path.velocityY = 6
  
  if(path.y>600){
    path.y=30;
}
  
    spawncoins();
  if(traingroup.isTouching(jake)){
    jake.visible=false;
    sound.stop();
gamestate=END;

    }
  }

 if(jake.isTouching(coingroup)) {
   score=score+1
   coingroup.destroyEach();
 }
  
    if(mousePressedOver(restart)) {
      reset();
    }
  drawSprites();
  textSize(19)
  fill("white")
  text("score:"+score,280,50)

  
  
if(gamestate===END){
    coingroup.setVelocityYEach(0);
  coingroup.destroyEach();
    traingroup.setVelocityYEach(0);
  traingroup.destroyEach();
      back.visible=true;
    gameover.visible=true;
    restart.visible=true;
}
}
function spawncoins(){
   if (frameCount % 200 === 0) {
    var coin = createSprite(100,50);
    coin.x = Math.round(random(60,320));
    coin.addImage(coinImage);
    coin.velocityY = 3;
     coin.scale=0.4

   train=createSprite(100,50)
  train.x = Math.round(random(100,200));
     train.debug=false;
     train.setCollider("circle",0,0,30)
  train.addImage(trainImage)
     train.velocityY = 3;
     train.scale=0.2;
     coingroup.add(coin);
     traingroup.add(train);
     
}
}
function reset(){
  gamestate=PLAY;
  coingroup.destroyEach();
  traingroup.destroyEach();
  jake.visible=true;
score=0;
}

