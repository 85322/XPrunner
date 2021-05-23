'use strict';

let player;
let ground = true;

class Player {
  constructor(){
    this.x = -300;
    this.y = 150; 
    this.speedY = 0;
    this.speedX = 0;
    this.red = random(0, 255);
    this.green = random(0, 255);
    this.blue = random(0, 255);
    this.gravitation = 2;
}   
  move(){
    this.x = this.x + this.speedX;
    this.y = this.y + this.speedY;
    this.speedX = this.speedX * 0.1; 
    this.speedY = this.speedY * 0.5 + this.gravitation;
  }
  show(){
    stroke(255); 
    fill(this.red, this.green, this.blue);
    rect(this.x, this.y, 50, 50,);
  }
}

class Obstacle {
  constructor(){
    this.x = 350;
    this.y = 0;
    this.speed = random(-3, -7);
    this.red = random(0, 255);
    this.green = random(0, 255);
    this.blue = random(0, 255);
}

  move(){
    this.x = this.x + this.speed;
  }

  show(){
    stroke(255); 
    fill(this.red, this.green, this.blue);
    rect(this.x, this.y, 50, 50,);
  }
}

const obstacles = [];

const ObstaclePositionArrayValues = [0,150];

function randomObstacle(ObstaclePositionArrayValues) {
  return ObstaclePositionArrayValues[Math.floor(Math.random() * ObstaclePositionArrayValues.length)];
}

class Floor {
  constructor(){
    this.x = -350;
    this.y = 250;
    this.width = width;
    this.height = -50;
  }
  show(){
    noStroke(); 
    fill(0,0,255);
    rect(this.x, this.y, this.width, this.height,);
}
}

function setup (){
    createCanvas (700, 450, WEBGL);
    textSize(25);
    let ExoBlack = loadFont('assets/Exo-Black.otf');
    textFont(ExoBlack);
    
    for (let i = 0; i < 3; i++) {
      obstacles[i] = new Obstacle();   
      print(obstacles[i]);

    }
    player = new Player();
    floor = new Floor();
  }

  function draw(){ 
    background(135, 206, 235);

    //Floor
    floor.show();

    //Floorbackground
    // noStroke();
    // fill(0, 128, 0);
    // rect(-350, 100, width, height);

    //Player
    player.move();
    player.show();

   if (keyIsDown(32)) {
    player.speedY = -150;
    ground = false;
    print(ground);  
  } 

  if (player.y = 150) {
    ground = true;
  } else {
    ground = false;
  }

  if (ground) {
    player.gravitation = 0;
  } else {
    player.gravitation = 0.5;
  }
  
    //Obstacles
    obstacles.forEach(obstacles => {
      obstacles.move();
      obstacles.show();
      
    if (obstacles.x < width*-1) {
      obstacles.speed =  random(-3, -10);
      obstacles.x = 350;
      obstacles.y = randomObstacle(ObstaclePositionArrayValues);    
    }
 
  });

    // rotateX(millis() / 1000);
    // rotateY(millis() / 1000);
    // text("random \obstacles", -50, -50);
  }