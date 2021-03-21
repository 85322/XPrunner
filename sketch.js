'use strict';

class Obstacle {
  constructor(){
    this.x = 350;
    this.y = random(width, width * -1);
    this.speed = random(-1, -5);
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
const players = 0;

class Player {
  constructor(){
    this.x = 0;
    this.y = 0;
    
  }
  show(){
    stroke(255); 
    fill(red);
    rect(this.x, this.y, 150, 150,);
  }
}

function setup (){
    createCanvas (700, 450, WEBGL);
    textSize(25);
    let ExoBlack = loadFont('assets/Exo-Black.otf');
    textFont(ExoBlack);
    
    for (let i = 0; i < 10; i++) {
      obstacles[i] = new Obstacle(random(2, 15));   
      print(obstacles[i]);
    }
  }
  
  function draw(){ 
    background(0, 0, 0);
  
    new Player();

    obstacles.forEach(obstacles => {
      obstacles.move();
      obstacles.show();
      
    if (obstacles.x < width*-1) {
      obstacles.x = 350;
      obstacles.y = Math.floor(random(250,-250));    
    }
  });

    // rotateX(millis() / 1000);
    // rotateY(millis() / 1000);
    // text("random \nobstacles", -50, -50);
  }