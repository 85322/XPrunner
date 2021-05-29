'use strict';

let player;
let items;
let ceiling;
let points = 0;
let bonus = 0;

class Player {
  constructor(){
    this.x = -300;
    this.y = 95; 
    this.speedY = 10;
    this.speedX = 0;
    this.gravitation = 0.5; 
    this.lives = 5;
  }    
  move(){
    this.y = this.y + this.speedY;
    this.speedY = this.speedY * 0.5 + this.gravitation;
  }
  show(){
    stroke(255); 
    fill(255,0,0);
    rect(this.x, this.y, 50, 50,);
  }
}

class Obstacle {
  constructor(){
    this.x = 350;
    this.y = random(-170,125);
    this.speed = random(-3, -7);
}
  move(){
    this.x = this.x + this.speed;
  }
  show(){
    stroke(255); 
    fill(0,0,255);
    rect(this.x, this.y, 50, 50,);
  }
}

const obstacles = [];

const ObstaclePositionArrayValues = [0,125,-170];

function randomObstacle(ObstaclePositionArrayValues) {
  return ObstaclePositionArrayValues[Math.floor(Math.random() * ObstaclePositionArrayValues.length)];
}

class Floor {
  constructor(x, y){
    this.x = x;  
    this.y = y;   
    this.width = width;
    this.height = -50;
    this.ground = true;
  }
  show(){
    noStroke(); 
    fill(0,0,255);
    rect(this.x, this.y, this.width, this.height);
}
}

class Items {
  constructor(){
      this.x = 350;  
      this.y = random(-170,125);
      this.speed = -12;
  }
    move(){
      this.x = this.x + this.speed;
    }
    show(color){
      stroke(255); 
      this.red = color;
      fill(this.red,255,255);
      rect(this.x, this.y, 50, 50);
  }
}

let errorSound;
let bgmSound;
let chimeSound;

function preload(){
errorSound = loadSound("Sound/Windows_XP_Error_Sound_Effect.mp3");
bgmSound = loadSound("Sound/Windows_XP_Installation_Music.mp3");
chimeSound = loadSound("Sound/Windows_XP_Sound_Chimes.mp3");
}

function setup (){
    createCanvas (700, 450, WEBGL);
    textSize(25);
    let ExoBlack = loadFont('assets/Exo-Black.otf');
    textFont(ExoBlack);

    bgmSound.play();
    
    for (let i = 0; i < 2; i++) {
      obstacles[i] = new Obstacle();   
      print(obstacles[i]);

    }
    player = new Player();
    floor = new Floor(-350, 230);
    ceiling = new Floor(-350, -175);
    items = new Items();

    const Action = {
      help()    {
        (window.alert("F1 = Help screen \n\nF4 = Reset")) 
      },
      
      reset(){
        location.reload();
      }
      };
      
      const keyAction = {
      F1: { keydown: Action.help},
      F4: { keydown: Action.reset}
      };
      
      const keyHandler = (ev) => {
      if (ev.repeat) return;  
      if (!(ev.key in keyAction) || !(ev.type in keyAction[ev.key])) return;
      keyAction[ev.key][ev.type]();
      };
      
      ['keydown', 'keyup'].forEach((evType) => {
      document.body.addEventListener(evType, keyHandler);
      });
    
}

function draw(){ 
    background(135, 206, 235);

    items.show(255);
    items.move();
    floor.show();
    player.move();
    player.show();
    ceiling.show();
  
   //Movement & behavior
   if (keyIsDown(32) && player.y > ceiling.y +20)  {
    player.speedY = -20;
    floor.ground = false; 
  } else {
    floor.ground = true;
  }

  if (player.y < floor.y - 125) {
    floor.ground = false;
  }

  if (floor.ground) {
    player.gravitation = 0;
  } else {
    player.gravitation = 5;
  }

const score = () => {
  points = points + 100 + (100 * bonus) ;
  bonus = bonus + 1;
}

const difficulty = () => {
  items.speed = items.speed - 1.5;
}

const bonusReset = () => { 
  if(items.x < -430){
  bonus = 0;
}
}

bonusReset(); 

const distanceCollisionCalc = (objectPosX, objectPosY) => {
  let d = dist(player.x, player.y, objectPosX, objectPosY);
  text("Dist: " + Math.floor(d), -340, -160);

  if (d < 50) {
    score();
    difficulty();
    chimeSound.play();
    items.x = 350;
    items.y = random (-170, 125);
  }
}

distanceCollisionCalc(items.x, items.y);

const gameOver = () => {
  if (player.lives < 0){
    document.activeElement.blur(window.alert);
    errorSound.play();
    window.alert("Game Over \n\nHigh Score: " + points );
    location.reload();
    
  }
}
gameOver();

    //Obstacles
    obstacles.forEach(obstacles => {
      obstacles.move();
      obstacles.show();

    let d = dist(player.x, player.y, obstacles.x, obstacles.y);

    if (d < 50) {
      obstacles.x = 400;
      obstacles.y = random (-170, 125);
      player.lives = player.lives - 1;
      errorSound.play();

      //death screen mit optionen hier ?? ();
    }  
      
    if (obstacles.x < width * -1) {
      obstacles.speed = -10;
      obstacles.x = width;
      obstacles.y = randomObstacle(ObstaclePositionArrayValues);    
    }

    //Items
    if (items.x < width * -1) {
      items.speed =  -12;
      items.x = width;
      items.y = randomObstacle(ObstaclePositionArrayValues);    
    }

  });
    //Misc
    
    // rotateX(millis() / 1000);
    // rotateY(millis() / 1000);
    fill(0, 202, 153);
    text("Points: " + points, -340, -200);
    fill(0, 202, 153);
    text("Y pos: " + Math.floor(player.y), -340, -180);
    fill(255, 255, 255);
    text("Lives: " + player.lives, -340, -140);
    fill(255, 255, 255);
    text("Bonus: " + bonus + " x", -340, -120); 
    
}


