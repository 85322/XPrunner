//Hoykeys
const Action = {
  help(){(
    window.alert(`• Reach 10.000 points to win \n\n• Collect stars for an increasing bonus point streak \n\n• Avoid Internet Explorer \n\n•Click speaker to mute music \n\n\n\n----------------\nby github.com/Anon853 \n2021`))
  },
  reset(){
    location.reload();
  },
  reset2(){ 
    points = 0;
    player.lives = 5;
    bonus = 0; //gehen
    
    obstacles.x = 700; //gehen nicht
    obstacles.y = random (150, 350);
    items.x = 700;
    items.y = random (150, 350);
    player.x = 0;
    //obstacles = 0;
  }
};
        
const keyAction = {
    F1: { keydown: Action.help},
    r: { keydown: Action.reset},
    p: {keydown: Action.reset2}
};
        
const keyHandler = (ev) => {
    if (ev.repeat) return;  
    if (!(ev.key in keyAction) || !(ev.type in keyAction[ev.key])) return;
    keyAction[ev.key][ev.type]();
};
        
['keydown', 'keyup'].forEach((evType) => {
document.body.addEventListener(evType, keyHandler);
});

//Sound
speaker = new Speaker(490, 3);

  const speakerButtonFunc = () => {
    const d = dist(mouseX, mouseY, speaker.x, speaker.y);
      if (d < 35 && !speaker.state) {
        bgmSound.setVolume(1);
        speaker.state = true;
      } else if (d < 30 && speaker.state){
        bgmSound.setVolume(0);
        speaker.state = false;
      }
    }
 
volumeButton = new VolumeButton(550, 3);    

let volumeButtonValue = 1;

const volumeButtonMinusFunc = () => {
  const d = dist(mouseX, mouseY, volumeButton.x, volumeButton.y);
      if (d < 35 && volumeButtonValue > 0.1 ) {
        volumeButtonValue = volumeButtonValue - 0.1;
      }
    }

volumeButton2 = new VolumeButton(610, 3);

const volumeButtonPLusFunc = () => {
  const d = dist(mouseX, mouseY, volumeButton2.x, volumeButton2.y);
    if (d < 35 && volumeButtonValue <= 0.9 ) {
      volumeButtonValue = volumeButtonValue + 0.1;
    }
  }

hiscoreButton = new HiscoreButton(430, 0);

const hiscoreButtonFunc = () => {
  const d = dist(mouseX, mouseY, hiscoreButton.x + 25, hiscoreButton.y + 25);
    if (d < 25 ) {
      // for (let i = 0; i < hiscore.hiscoreValues.length; i++) {
       //hiscore.hiscoreValues.sort();
        console.log(hiscore.hiscoreValues.sort(function(a, b){return a - b}));
        alert(`${hiscore.hiscoreValues.sort(function(a, b){return a + b})}`);
    }
      //alert(`${hiscore.cars[1]}`);
      hiscore.hiscoreValues.push("333");
    }
  //}

hiscoreButton2 = new HiscoreButton(-500, -500);

const hiscoreButtonEndscreenFunc = () => {
  const d = dist(mouseX, mouseY, hiscoreButton2.x + 25, hiscoreButton2.y + 25);
    if (d < 25 ) {
      alert(colors.color1);
    }
  }

function mouseClicked(){ 
  speakerButtonFunc();
  volumeButtonPLusFunc();
  volumeButtonMinusFunc();
  hiscoreButtonFunc();
  hiscoreButtonEndscreenFunc();
}

mouseClicked();

