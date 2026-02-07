// 1 soniya kutish
setTimeout(()=>{
  document.querySelector(".loading").remove();
  showScare();
},1000);

function showScare(){
  const s=document.getElementById("scare");
  s.style.opacity="1";
  s.style.transform="scale(1.4)";

  screamSound();    // 🔊 AYOL QICHQIRIG'I
  whisperSound();   // shivir shovqin
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

/* 👩 AYOL QICHQIRIG'I (kod bilan high-pitch) */
function screamSound(){
  const ctx=new (window.AudioContext||window.webkitAudioContext)();
  const osc=ctx.createOscillator();
  const gain=ctx.createGain();

  osc.type="sine";
  osc.frequency.setValueAtTime(600,ctx.currentTime);  // yuqori pitch
  osc.frequency.exponentialRampToValueAtTime(1200,ctx.currentTime+0.6); // tezlik bilan ko‘tariladi

  gain.gain.setValueAtTime(0.7,ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+0.6);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime+0.6);
}

/* SHIVIR SHOVQIN */
function whisperSound(){
  const c=new (window.AudioContext||window.webkitAudioContext)();
  const buffer=c.createBuffer(1, c.sampleRate*0.8, c.sampleRate);
  const data=buffer.getChannelData(0);
  for(let i=0;i<data.length;i++) data[i]=(Math.random()*2-1)*0.3;
  const noise=c.createBufferSource();
  const gain=c.createGain();
  noise.buffer=buffer;
  gain.gain.value=0.2;
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
