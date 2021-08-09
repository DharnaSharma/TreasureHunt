var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

var restart, restartImg;
var touchSound, runSound, swordSound, runningSound;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  
  restartImg = loadImage("restart.png");
  touchSound = loadSound("checkPoint.mp3");
  runSound=loadSound("jump.mp3");
  runningSound=loadSound("running.wav");
  swordSound=loadSound("swordslash.mp3");
  
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
restart=createSprite(width/2,2*height/3)  ;
  restart.scale=0.5;
  restart.addImage(restartImg);
  restart.visible=false;
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  boy.y = 3*height/4;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  runSound.play();
    
  //code to reset the background
  if(path.y > height){
    path.y = height/2;
  }
      var randomObject = Math.round(random(1,4));
    switch (randomObject){

      case 1 : createCash();
        break;
      case 2 : createDiamonds();
        break;
      case 3 : createJwellery();
        break;
      case 4 : createSword();
        break;
    
    }
    
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
      touchSound.play();
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+100;
      touchSound.play();
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection= treasureCollection + 150;
      touchSound.play();
      
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState=END;
        boy.addAnimation("SahilRunning",endImg);
        boy.x=width/2;
        boy.y=height/2;
        boy.scale=0.6;
        swordSound.play();
        restart.visible=true;
        
        cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();
        
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);
  }
if(mousePressedOver(restart)){
  reset();
}
  
}

function createCash() {
  if (World.frameCount % 150 == 0) {
  var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = height-20;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 150 == 0) {
  var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = height-20;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 150 == 0) {
  var jwellery = createSprite(Math.round(random(50, width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = height-20;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = height-20;
  swordGroup.add(sword);
  }
}

function reset(){
  gameState=PLAY;
  restart.visible=false;
  
  cashG.destroyEach();
  diamondsG.destroyEach();
  jwelleryG.destroyEach();
  swordGroup.destroyEach();
 
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.08;

}