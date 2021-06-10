let player;
let items;
let ceiling;
let points = 0;
let requiredWinPointsValue = 10000;
let bonus = 0;
let canvas;
let speaker;
let volumeButton;
let volumeButton2;
let hiscoreButton;

class Player {
    constructor(){
      this.x = 0;
      this.y = 0; 
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
  
  class Speaker {
    constructor(x, y){
      this.x = x;  
      this.y = y;   
      this.state = true;
    }
    show(){
      noStroke();
      fill(255, 0);
      rect(this.x, this.y, 30, 30)
    }
  }
  
  class VolumeButton {
    constructor(x, y){
      this.x = x;  
      this.y = y;   
      this.state = true;
    }
    show(){
      noStroke();
      fill(255, 0);
      rect(this.x, this.y, 30, 30)
    }
  }

  class HiscoreButton {
    constructor(x, y){
      this.x = x;  
      this.y = y;   
      this.state = true;
    }
    show(){
      noStroke();
      fill(255, 255, 255);
      rect(this.x, this.y, 50, 50)
    }
  }

class HiscoreButtonEndscreen {
  constructor(x, y){
    this.x = x;  
    this.y = y;   
    this.state = true;
  }
  show(){
    noStroke();
    fill(255, 255, 255);
    rect(this.x, this.y, 50, 50)
  }
}