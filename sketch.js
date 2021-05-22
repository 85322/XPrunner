'use strict';

let player;

class Obstacle {
  constructor(){
    this.x = 350;
    this.y = 0;
    this.speed = random(-2, -7);
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

class Player {
  constructor(){
    this.x = -300;
    this.y = 150;
    this.speed = random(0, 0);
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
  }

  function draw(){ 
    background(135, 206, 235);
  
    //rect(0, 0, 50, 50,);

    //Floor
    noStroke();
    fill(0, 128, 0);
    rect(-350, 100, width, height);

    //Player
    player.move();
    player.show();

    //Obstacles
    obstacles.forEach(obstacles => {
      obstacles.move();
      obstacles.show();
      
    if (obstacles.x < width*-1) {
      
      obstacles.x = 350;
      obstacles.y = randomObstacle(ObstaclePositionArrayValues);    
    }
 
  });

    // rotateX(millis() / 1000);
    // rotateY(millis() / 1000);
    // text("random \nobstacles", -50, -50);
  }