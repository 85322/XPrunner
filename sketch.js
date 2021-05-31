'use strict';

let player;
let items;
let ceiling;
let points = 0;
let bonus = 0;
let canvas;

class Player {
  constructor(){
    this.x = 0;
    this.y = 0; 
    this.speedY = 10;
    this.speedX = 0;
    this.gravitation = 0.5; 
    this.lives = 0;
  }    
  move(){
    this.y = this.y + this.speedY;
    this.speedY = this.speedY * 0.5 + this.gravitation;
  }
  show(){
    noStroke(); 
    fill(255, 0);
    rect(this.x, this.y, 50, 50,);
  }
}

class Obstacle {
  constructor(){
    this.x = 700;
    this.y = random(100,300);
    this.speed = random(-3, -7);
}
  move(){
    this.x = this.x + this.speed;
  }
  show(){
    noStroke(); 
    fill(255, 0);
    rect(this.x, this.y, 50, 50,);
  }
}

const obstacles = [];

const ObstaclePositionArrayValues = [50, 175, 320];

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
    fill(255, 0);
    rect(this.x, this.y, this.width, this.height);
}
}

class Items {
  constructor(){
      this.x = 450;  
      this.y = random(100, 300);
      this.speed = -12;
  }
    move(){
      this.x = this.x + this.speed;
    }
    show(){
      noStroke(); 
      fill(255, 0);
      rect(this.x, this.y, 50, 50);
  }
}

//Sound & graphics
let errorSound;
let bgmSound;
let chimeSound;
let slider;
let playerSprite;
let obstacleSprite;
let itemSprite;
let backgroundSprite;
let bluescreenSprite;

function preload(){
errorSound = loadSound(`Sound/Windows_XP_Error_Sound_Effect.mp3`);
bgmSound = loadSound(`Sound/Windows_XP_Installation_Music.mp3`);
chimeSound = loadSound(`Sound/Windows_XP_Sound_Chimes.mp3`);

playerSprite = loadImage(`Sprites/windows_logo.png`);
obstacleSprite = loadImage(`Sprites/IE_logo.png`);
itemSprite = loadImage(`Sprites/star_logo3.png`);
backgroundSprite = loadImage(`Sprites/xp_logon2.png`);
bluescreenSprite = loadImage(`Sprites/bluescreen.png`);
}

function setup (){
    canvas = createCanvas (700, 450);
    textSize(25);
    let ExoBlack = loadFont('assets/Exo-Black.otf');
    textFont(ExoBlack);

    bgmSound.loop();

    document.getElementById(`soundbtnoff`).onclick=function(){
      bgmSound.stop();
    } 
    document.getElementById(`soundbton`).onclick=function(){
      bgmSound.loop();
    } 

    slider = createSlider(0, 1, 0.5, 0.01);

    for (let i = 0; i < 2; i++) {
      obstacles[i] = new Obstacle();   
    }
    
    player = new Player();
    floor = new Floor(0, 445);
    ceiling = new Floor(0, 30);
    items = new Items();

    //Keybinds
    const Action = {
      help()    {
        (window.alert(`• Reach 50.000 points to win! \n\n• Collect stars to create an increasing bonus point streak! \n\n• Avoid Internet Explorer! \n\n\n\n----------------\nby github.com/Anon853 \n2021`)) 
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
    background(backgroundSprite);

    items.show();
    items.move();
    floor.show();
    player.move();
    player.show();
    ceiling.show();
    image(playerSprite, player.x, player.y);
    image(itemSprite, items.x, items.y);

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

  if (d < 50) {
    score();
    difficulty();
    chimeSound.play();
    items.x = 700;
    items.y = random (100, 300);
  }
}

distanceCollisionCalc(items.x, items.y);



    //Obstacles
    obstacles.forEach(obstacles => {
      obstacles.move();
      obstacles.show();
      image(obstacleSprite, obstacles.x, obstacles.y);

    const d = dist(player.x, player.y, obstacles.x, obstacles.y);

    if (d < 50) {
      obstacles.x = 700;
      obstacles.y = random (150, 350);
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

  const gameOver = () => {
      document.activeElement.blur(window.alert);
      bgmSound.stop();
      background(bluescreenSprite, width, height);
      obstacles.length = 0;
      fill(255, 255);
      text(`High Score: ${points}`, (width/2 -100), 60);
      //location.reload();
  }
  
const uiAndGameOver = () => {
if (player.lives > -1) {
    fill(255, 2552, 255);
    text(`Points: ${points}`, 540, 60);
    fill(255, 255, 255);
    text(`Lives: ${player.lives}`, 540, 80);
    fill(255, 255, 255);
    text(`Bonus: ${bonus} x`, 540, 100); 
} else {
  gameOver();
} 
}

uiAndGameOver();

const volumeSetting = (slidervalue) => {

  const v = slidervalue;
    bgmSound.setVolume(v);
    errorSound.setVolume(v);
    chimeSound.setVolume(v);
  }
  volumeSetting(slider.value());
}


