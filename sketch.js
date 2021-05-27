'use strict';


let player;
let items;
let ceiling;

class Player {
  constructor(){
    this.x = -300;
    this.y = 127; 
    this.speedY = 10;
    this.speedX = 0;
    this.red = random(0, 255);
    this.green = random(0, 255);
    this.blue = random(0, 255);
    this.gravitation = 0.5; 
  }    
  move(){
    this.y = this.y + this.speedY;
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
  cough(){
    this.y = this.y + 100;
  }
}

const obstacles = [];

const ObstaclePositionArrayValues = [0,150];

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
    rect(this.x, this.y, this.width, this.height,);
}
}

class Items {
  constructor(){
      this.x = 350;
      this.y = 0;
      this.speed = random(-3, -7);
  }
    move(){
      this.x = this.x + this.speed;
    }
    show(){
      stroke(255); 
      fill(255,255,255);
      rect(this.x, this.y, 50, 50);
    }
  }

function setup (){
    createCanvas (700, 450, WEBGL);
    textSize(25);
    let ExoBlack = loadFont('assets/Exo-Black.otf');
    textFont(ExoBlack);
    
    for (let i = 0; i < 2; i++) {
      obstacles[i] = new Obstacle();   
      print(obstacles[i]);

    }
    player = new Player();
    floor = new Floor(-350, 250);
    ceiling = new Floor(-350, -175);
    items = new Items();
  }

  function draw(){ 
    background(135, 206, 235);

    items.show();
    items.move();
    floor.show();
    player.move();
    player.show();
    ceiling.show();

   //Movement & behavior
   if (keyIsDown(32)) {
    player.speedY = -20;
    floor.ground = false; 
    print("Jump pressed");
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
  
    //Obstacles
    obstacles.forEach(obstacles => {
      obstacles.move();
      obstacles.show();
      
    if (obstacles.x < width*-1) {
      obstacles.speed = -10;
      obstacles.x = 350;
      obstacles.y = randomObstacle(ObstaclePositionArrayValues);    
    }

    if (keyIsDown(82)){
      obstacles.cough();
      print("R PRESSED");
    } 

    //Items
    if (items.x < width*-1) {
      items.speed =  random(-3, -10);
      items.x = 350;
      items.y = randomObstacle(ObstaclePositionArrayValues);    
    }
 
  });
    //Misc
    
    // rotateX(millis() / 1000);
    // rotateY(millis() / 1000);
    text("Points: ", -340, -200);
    fill(0, 102, 153, 51);


   }