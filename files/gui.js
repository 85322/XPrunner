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
    obstacles = [0];
    lives = 5;
    obstacles.x = 700;
    obstacles.y = random (150, 350);
    items.x = 700;
    items.y = random (150, 350);
    player.x = 0;
    bonus = 0;
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

  const speakerButton = () => {
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
        //bgmSound.setVolume(volumeButtonValue);
      }
    }

volumeButton2 = new VolumeButton(610, 3);

const volumeButtonPLusFunc = () => {
  const d = dist(mouseX, mouseY, volumeButton2.x, volumeButton2.y);
    if (d < 35 && volumeButtonValue <= 0.9 ) {
      volumeButtonValue = volumeButtonValue + 0.1;
      //bgmSound.setVolume(volumeButtonValue);
    }
  }

function mouseClicked(){ 
  speakerButton();
  volumeButtonPLusFunc();
  volumeButtonMinusFunc();
}

mouseClicked();




    