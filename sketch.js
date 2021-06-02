'use strict';

function setup (){
  canvas = createCanvas (700, 450); 

  const centerCanvas = () => {
    const x = (windowWidth - width) / 2;
    const y = (windowHeight - height) / 2;
    canvas.position(x, y);
    }

    centerCanvas();

    textSize(25);
    let ExoBlack = loadFont('assets/Exo-Black.otf');
    textFont(ExoBlack);

    bgmSound.loop();

    for (let i = 0; i < 2; i++) {
      obstacles[i] = new Obstacle();   
    }
    
    player = new Player();
    floor = new Floor(0, 445);
    ceiling = new Floor(0, 30);
    items = new Items();
    sliderVolume = new Slider();

    slider = createSlider(0, 1, 0.5, 0.01);
    slider.style('width', '80px');
    slider.position(0, 0); //45x 95y
}

function draw(){ 
    background(backgroundSprite);

    items.show();
    items.move();
    floor.show();
    player.move();
    player.show();
    ceiling.show();
    speaker.show();
    image(playerSprite, player.x, player.y);
    image(itemSprite, items.x, items.y);
    sliderVolume.show();
    image(volumeSprite, sliderVolume.x, sliderVolume.y);
    
const movement = () => {
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
}

movement();

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

//Object movement and creation
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
}  
      
if (obstacles.x < width * -1) {
  obstacles.speed = -10;
  obstacles.x = width;
  obstacles.y = randomObstacle(ObstaclePositionArrayValues);    
}

if (items.x < width * -1) {
  items.speed =  -12;
  items.x = width;
  items.y = randomObstacle(ObstaclePositionArrayValues);    
}
})

const gameOver = () => {
  bgmSound.stop();
  obstacles.length = 0;
  speaker = 0;
  slider = 0; // ???
  fill(255, 255);
  background(bluescreenSprite, width, height);
  text(`High Score: ${points}`, (width/2 -100), 60);
  noLoop();
  }
  
const uiAndGameOver = () => {
if (player.lives > -1) {
    fill(255, 2552, 255);
    text(`Points: ${points}`, 540, 60);
    text(`Lives: ${player.lives}`, 540, 80);
    text(`Bonus: ${bonus} x`, 540, 100); 
    text(`F1 = Help  R = Reset  Space = Jump`, 10, 25);
} else {
  gameOver();
} 
}

uiAndGameOver();

const win = () => {
  if (points >= 10000) {
    winSound.play();
    bgmSound.stop();
    obstacles.length = 0;
    speaker = 0;
    background(blissSprite, width, height);
    fill(0, 255);
    text(`High Score: ${points}\nYou win!`, (width/2 -100), height/2);
    noLoop();
}
}

win();

const obstacleDifficulty = (pointValue, obstacleArrayLength) => {
  if (points >= pointValue && obstacles.length < obstacleArrayLength) {
  obstacles.push(new Obstacle());
}
}
obstacleDifficulty(1000, 3);
obstacleDifficulty(3000, 4);
obstacleDifficulty(6000, 5);
obstacleDifficulty(8000, 9);
obstacleDifficulty(9000, 10 );

const speakerIconCheck = () => {
if (speaker.state){
  image(speakeronSprite, speaker.x, speaker.y);
} else {
  image(speakeroffSprite, speaker.x, speaker.y);
}
}

speakerIconCheck();

const volumeSetting = (slidervalue) => {
  const v = slidervalue;
  if (speaker.state) {
    bgmSound.setVolume(v);
  } 
    errorSound.setVolume(v);
    chimeSound.setVolume(v);
}

volumeSetting(slider.value());

}