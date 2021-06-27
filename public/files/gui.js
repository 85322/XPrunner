//Hoykeys
const Action = {
  help(){(
    window.alert(`• Reach 10.000 points to win \n\n• Collect stars for an increasing bonus point streak \n\n• Avoid Internet Explorer \n\n•Click speaker to mute music \n\n\n\n----------------\nby github.com/Anon853 \n2021`))
  },
  reset(){
    location.reload();
  },
  reset2(){ //canvas reset unfertig
    points = 0;//gehen
    player.lives = 5;
    bonus = 0; 
    
    obstacles.x = 700; //gehen nicht //existierendes array ansprechen
    obstacles.y = random (150, 350);
    items.x = 700;
    items.y = random (150, 350);
    player.x = 0;
    obstacles = 0;
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

speaker = new Speaker(510, 3);

  const speakerButtonFunc = () => { //BGM mute funktion
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

//Score

const scoreInput = () => {
  let name = prompt("Please enter your name", "Player");
  alert('Sending Name: ' + JSON.stringify(name) + '\n\nScore of: ' + points + '\n\nCheck /all in API for full details');
  loadJSON('add/' + name + '/' + points); //GET request als indirekter POST ins JSON file zu schreiben
}

const getDataJSON = (data) => {
  let parsedScores = Object.values(data); 

  parsedScores.sort((function(a, b){return a - b})); //parsing key values aus JSON file

  console.log("Data length: " + data);
  console.log("Data Scores + Names : " + JSON.stringify(data));
  console.log("Scores in order : " + JSON.stringify(parsedScores));
  alert("Scores in order : " + JSON.stringify(parsedScores) + "\n\nCheck /all in API for full details");
}


hiscoreButton = new HiscoreButton(430, 0);

const hiscoreButtonFunc = () => {
  const d = dist(mouseX, mouseY, hiscoreButton.x + 25, hiscoreButton.y + 25);
    if (d < 25 ) { 
        loadJSON('all', getDataJSON);
 }
}

hiscoreButton2 = new HiscoreButton(-500, -500);

const hiscoreButtonEndscreenFunc = () => {
  const d = dist(mouseX, mouseY, hiscoreButton2.x + 25, hiscoreButton2.y + 25);
    if (d < 25 ) {
      scoreInput();
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