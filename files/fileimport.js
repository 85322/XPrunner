let errorSound;
let bgmSound;
let chimeSound;
let slider;
let playerSprite;
let obstacleSprite;
let itemSprite;
let backgroundSprite;
let bluescreenSprite;
let blissSprite;
let winSound;


function preload(){
    errorSound = loadSound(`Sound/Windows_XP_Error_Sound_Effect.mp3`);
    bgmSound = loadSound(`Sound/Windows_XP_Installation_Music.mp3`);
    chimeSound = loadSound(`Sound/Windows_XP_Sound_Chimes.mp3`);
    winSound = loadSound(`Sound/Windows_XP_Tada_Sound_Effect.mp3`)
    
    playerSprite = loadImage(`Sprites/windows_logo.png`);
    obstacleSprite = loadImage(`Sprites/IE_logo.png`);
    itemSprite = loadImage(`Sprites/star_logo3.png`);
    backgroundSprite = loadImage(`Sprites/xp_logon2.png`);
    bluescreenSprite = loadImage(`Sprites/bluescreen.png`);
    blissSprite = loadImage(`Sprites/bliss.png`);
    }