// 1 soniya kutish
setTimeout(()=>{
  document.querySelector(".loading").remove();
  showScare();
},1000);

function showScare(){
  const s=document.getElementById("scare");
  s.style.opacity="1";
  s.style.transform="scale(1.3)";
  scarySound();
  shake();
  flash();
  vibrate();
}

// 😱 Dahshatli ovoz (kod bilan)
function scarySound(){
  const c=new (window.AudioContext||window.webkitAudioContext)();
  const o=c.createOscillator(), g=c.createGain();
  o.type="sawtooth";
  o.frequency.setValueAtTime(120,c.currentTime);
  o.frequency.linearRampToValueAtTime(20,c.currentTime+.9);
  g.gain.setValueAtTime(.8,c.currentTime);
  g.gain.exponentialRampToValueAtTime(.01,c.currentTime+.9);
  o.connect(g); g.connect(c.destination);
  o.start(); o.stop(c.currentTime+.9);
}

// 📳 Ekran silkinishi
function shake(){
  let i=0;
  const t=setInterval(()=>{
    document.body.style.transform=
      `translate(${Math.random()*30-15}px,${Math.random()*30-15}px)`;
    if(++i>22){clearInterval(t);document.body.style.transform="none"}
  },28);
}

// ⚡ Flash
function flash(){
  document.body.style.background="#fff";
  setTimeout(()=>document.body.style.background="#000",90);
}

// 📱 Vibratsiya
function vibrate(){
  if(navigator.vibrate){
    navigator.vibrate([80,40,120,40,200]);
  }
}
