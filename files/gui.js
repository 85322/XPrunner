//Slider
slider = createSlider(0, 1, 0.5, 0.01);

const volumeSetting = (slidervalue) => {

    const v = slidervalue;
      bgmSound.setVolume(v);
      errorSound.setVolume(v);
      chimeSound.setVolume(v);
}

volumeSetting(slider.value());

//Hoykeys
const Action = {help()    {
    (window.alert(`• Reach 10.000 points to win! \n\n• Collect stars to create an increasing bonus point streak! \n\n• Avoid Internet Explorer! \n\n\n\n----------------\nby github.com/Anon853 \n2021`)) 
        },reset(){
        location.reload();
    }
};
        
const keyAction = {
    F1: { keydown: Action.help},
    R: { keydown: Action.reset}
};
        
const keyHandler = (ev) => {
    if (ev.repeat) return;  
    if (!(ev.key in keyAction) || !(ev.type in keyAction[ev.key])) return;
    keyAction[ev.key][ev.type]();
};
        
['keydown', 'keyup'].forEach((evType) => {
document.body.addEventListener(evType, keyHandler);
});

//Sound buttons
document.getElementById(`soundbtnoff`).onclick=function(){
    bgmSound.stop();
  } 
document.getElementById(`soundbton`).onclick=function(){
    bgmSound.loop();
  } 
