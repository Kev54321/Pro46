var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie
var zombieGroup
var bullet
var bulletGroup
var bulletImage
var heart1_image
var heart2_image
var heart3_image
var heart1
var heart2
var heart3
var life= 3
var score= 0
var bullets= 60
var gameState= "play"
var explosion
var win
var lose

function preload(){
  explosion= loadSound("assets/lose.mp3")
  win = loadSound("assets/win.mp3")
  lose = loadSound("assets/explosion.mp3")
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombie_image = loadImage("assets/zombie.png")
  bgImg = loadImage("assets/bg.jpeg")
  bulletImage= loadImage("assets/bullet.png")
  heart1_image= loadImage("assets/heart_1.png")
  heart2_image= loadImage("assets/heart_2.png")
  heart3_image= loadImage("assets/heart_3.png")


}

function setup() {
zombieGroup = new Group();
  bulletGroup = new Group();
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1


  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,200,400)

   heart1 = createSprite(displayWidth-150, 40, 20, 20);
heart1.addImage("heart1",heart1_image)
heart1.scale = 0.5
heart1.visible = false;

heart2 = createSprite(displayWidth-150, 40, 20, 20);
heart2.addImage("heart2",heart2_image)
heart2.scale = 0.5
heart2.visible = false;

heart3 = createSprite(displayWidth-170, 40, 20, 20);
heart3.addImage("heart3",heart3_image)
heart3.scale = 0.5
heart3.visible = true;
}


function draw() {

  background(0); 
  if (!explosion.isPlaying()){
     explosion.play();
      explosion.setVolume(0.1); 
  }

     if(gameState==="play"){


if(life ==3){
  heart3.visible = true
  heart2.visible = false
  heart1.visible = false
}

if(life ==2){
  heart3.visible = false
  heart2.visible = true
  heart1.visible = false
}

if(life ==1){
  heart3.visible = false
  heart2.visible = false
  heart1.visible = true
}

 
  spawnzombie();
     }
if(life==0){
  gameState="Lost"
}
if(score==10){
  gameState="Won"
}
explosion.play();

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
 
  bullet= createSprite(displayWidth-1150, player.y-30, 20, 10)
  bullet.addImage(bulletImage);
  bullet.scale = 0.04
  bullet.velocityX= 20
  bullet.shapeColor= "black"
bulletGroup.add(bullet);
bullet.depth = player.depth
player.depth = player.depth +1; 
explosion.play();
if(bullets>0){
  bullets = bullets-1
}
}
if(bullets==0){
  gameState="bullets"
}
if(zombieGroup.isTouching(bulletGroup)){
  for(i=0; i<zombieGroup.length; i++){
if(zombieGroup[i].isTouching(bulletGroup)){
  zombieGroup[i].destroy();
  bulletGroup.destroyEach();
  score = score + 2
  explosion.play();
}
  }
}

if(zombieGroup.isTouching(player)){
  for(i=0; i<zombieGroup.length; i++){
if(zombieGroup[i].isTouching(player)){
  
  zombieGroup.destroyEach();
  life= life-1;
  lose.play();

}
  }
}


//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

drawSprites();
textSize(20)
fill("white");
text("Score: " + score, displayWidth-230, displayHeight/2-280)
text("Bullets: " + bullets, displayWidth-230, displayHeight/2-250)
if(gameState=="Won"){
  win.play();
  textSize(100);
  fill("green");
  text("You Won!", 400, 400);
  zombieGroup.destroyEach();
  player.destroy();

}
if(gameState=="Lost"){
  textSize(100);
  fill("red");
  text("You Lost!", 400, 400);
  zombieGroup.destroyEach();
  player.destroy();
  lose.play();
}
if(gameState=="bullets"){
  textSize(100);
  fill("yellow");
  text("You ran out of bullets", 100, 400);
  zombieGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();
}
}

function spawnzombie(){
  if(frameCount%60 === 0){
   zombie = createSprite(random(500, 1100), random(100, 600), 40, 40)
   zombie.addImage(zombie_image)
   zombie.scale = 0.15
   zombie.velocityX = -3
   zombie.lifetime = 500
   zombieGroup.add(zombie)
   zombie.debug= true;
   zombie.setCollider("rectangle", 0, 0, 400, 500)
  }
}