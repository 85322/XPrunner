//Hoykeys
const Action = {help()    {
    (window.alert(`• Reach 10.000 points to win! \n\n• Collect stars to create an increasing bonus point streak! \n\n• Avoid Internet Explorer! \n\n\n\n----------------\nby github.com/Anon853 \n2021`)) 
        },reset(){
        location.reload();
    }
};
        
const keyAction = {
    F1: { keydown: Action.help},
    r: { keydown: Action.reset}
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

speaker = new Speaker();

  const speakerbutton = () => {
    const d = dist(mouseX, mouseY, speaker.x, speaker.y);
      if (d < 35 && !speaker.state) {
        bgmSound.setVolume(1);
        speaker.state = true;
      } else if (d < 35 && speaker.state){
        bgmSound.setVolume(0);
        speaker.state = false;
      }
    }
  
  function mouseClicked(){ 
    speakerbutton();
  }
  
  mouseClicked();
  
