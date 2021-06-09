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

    for (let i = 0; i < 2; i++) {
      obstacles[i] = new Obstacle();   
    }
    
    player = new Player();
    floor = new Floor(0, 445);
    ceiling = new Floor(0, 30);
    items = new Items();

    startUpSound.play();
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
    volumeButton.show();
    image(volumeSprite2, volumeButton.x, volumeButton.y);
    volumeButton2.show();
    image(volumeSprite, volumeButton2.x, volumeButton2.y);
    image(hiscoreButtonSprite, hiscoreButton.x, hiscoreButton.y)
    
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

const itemSpeedIncrease = () => {
  items.speed = items.speed - 1.5;
}

const bonusReset = () => { 
  if(items.x < -430){
  bonus = 0;
}
}

bonusReset(); 

let bonusColor = 0;

const bonusStateColorCheck = () => {
  switch (bonus) {
    case 1:
      bonusColor = colors.color1;
      break;
    case 2:
      bonusColor = colors.color2;
      break;
    case 3:
      bonusColor = colors.color3;
      break; 
    case 4:
      bonusColor = colors.color4; 
      break;
    case 5:
      bonusColor = colors.color5;  
      break; 
    case 6:
      bonusColor = colors.color6; 
      break;
    case 7:
      bonusColor = colors.color7; 
      break;
    case 8:
      bonusColor = colors.color8; 
      break;
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
      bonusColor = colors.color9; 
      break;
    default: bonusColor = colors.color10;
  }
}

bonusStateColorCheck();

//Object movement, collision and creation
const distanceCollisionCalc = (objectPosX, objectPosY) => {
  let d = dist(player.x, player.y, objectPosX, objectPosY);

  if (d < 50) {
    score();
    itemSpeedIncrease();
    chimeSound.play();
    items.x = 700;
    items.y = random (100, 300);
  }
}

distanceCollisionCalc(items.x, items.y);

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

//Application states
const gameOver = () => {
  bgmSound.setVolume(0);
  obstacles.length = 0;
  speaker = 0;
  fill(255, 255);
  background(bluescreenSprite, width, height);
  text(`High Score: ${points}`, (width/2 -100), 60);
  hiscoreButton2.x = width/2 - 25;
  hiscoreButton2.y = height/2 + 90;
  noLoop();
}

const win = () => {
    winSound.play();
    bgmSound.setVolume(0);
    obstacles.length = 0;
    speaker = 0;  
    background(blissSprite, width, height);
    fill(0, 255);
    text(`High Score: ${points}\nYou win!`, (width/2 -100), height/2);
    noLoop();
}

const gameStateCheck = (requiredWinPointsValue) => {
  if (player.lives <= -1) {
    gameOver();
  } if (points >= requiredWinPointsValue) {
    win();
  }
}

gameStateCheck(requiredWinPointsValue);

const uiDisplay = () => {
  if (player.lives > -1 && points < requiredWinPointsValue){
  fill(255, 255, 255);
  text(`Points: ${points}`, 540, 60);
  text(`Lives: ${player.lives}`, 540, 80); 
  text(`F1 = Help  R = Reset  Space = Jump`, 10, 25);
  text(` ${Math.floor(volumeButtonValue*100)}%`, 630, 25);
  fill(bonusColor);
  text(`Bonus: ${bonus} x`, 290, 100);
}
}

uiDisplay();

const obstacleDifficulty = (pointThresholdDifficulty, obstacleArrayLength) => {
  if (points >= pointThresholdDifficulty && obstacles.length < obstacleArrayLength) {
  obstacles.push(new Obstacle()); //punkte und index check um anzahl neuer objekte zu kontrollieren in draw()
}
}

obstacleDifficulty(1000, 3);
obstacleDifficulty(3000, 4);
obstacleDifficulty(6000, 5);
obstacleDifficulty(8000, 9);
obstacleDifficulty(9000, 10 );

//Sound
const speakerIconCheck = () => {
if (speaker.state){
  image(speakeronSprite, speaker.x, speaker.y);
} else {
  image(speakeroffSprite, speaker.x, speaker.y);
}
}

speakerIconCheck();

const volumeSetting = (volumeButtonValue) => {
  const v = volumeButtonValue;
  if (speaker.state) {
    bgmSound.setVolume(v);
  } 
    errorSound.setVolume(v);
    chimeSound.setVolume(v);
}

volumeSetting(volumeButtonValue);

const bgmTracker = () => {
  const startUpisPlaying = startUpSound.isPlaying();
  const bgmIsPlaying = bgmSound.isPlaying();
    if (!startUpisPlaying && !bgmIsPlaying) {
      bgmSound.loop();
    } else if (startUpisPlaying){
      bgmSound.stop();
    }
  }

bgmTracker();

}

