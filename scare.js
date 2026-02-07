// 1 soniya kutish
setTimeout(()=>{
  document.querySelector(".loading").remove();
  showScare();
},1000);

function showScare(){
  const s=document.getElementById("scare");
  s.style.opacity="1";
  s.style.transform="scale(1.4)";

  demonSound();
  whisperSound();
  shake();
  flash();
  vibrate();

  // Ko‘z nuri yonib boshlash
  setTimeout(()=>{
    document.querySelectorAll(".eye-glow").forEach(e=>{
      e.style.opacity="1";
    });
  },120);
}

/* DAHSHATLI PAST OVOZ */
function demonSound(){
  const c=new (window.AudioContext||window.webkitAudioContext)();
  const o=c.createOscillator(), g=c.createGain();
  o.type="sawtooth";
  o.frequency.setValueAtTime(60,c.currentTime);
  o.frequency.linearRampToValueAtTime(18,c.currentTime+1.2);
  g.gain.setValueAtTime(0.9,c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.01,c.currentTime+1.2);
  o.connect(g); g.connect(c.destination);
  o.start(); o.stop(c.currentTime+1.2);
}

/* SHIVIR SHOVQIN */
function whisperSound(){
  const c=new (window.AudioContext||window.webkitAudioContext)();
  const buffer=c.createBuffer(1, c.sampleRate*0.8, c.sampleRate);
  const data=buffer.getChannelData(0);
  for(let i=0;i<data.length;i++) data[i]=(Math.random()*2-1)*0.4;
  const noise=c.createBufferSource();
  const gain=c.createGain();
  noise.buffer=buffer;
  gain.gain.value=0.3;
  noise.connect(gain);
  gain.connect(c.destination);
  noise.start();
}

/* EKRAN SILKINISHI */
function shake(){
  let i=0;
  const t=setInterval(()=>{
    document.body.style.transform=
      `translate(${Math.random()*35-17}px,${Math.random()*35-17}px)`;
    if(++i>25){clearInterval(t);document.body.style.transform="none"}
  },25);
}

/* FLASH */
function flash(){
  document.body.style.background="#fff";
  setTimeout(()=>document.body.style.background="#000",80);
}

/* VIBRATSIYA */
function vibrate(){
  if(navigator.vibrate) navigator.vibrate([100,50,200,50,300]);
}
