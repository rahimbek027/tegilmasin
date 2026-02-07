const btn=document.getElementById("goBtn");
function clickSound(){
  const c=new (window.AudioContext||window.webkitAudioContext)();
  const o=c.createOscillator(), g=c.createGain();
  o.type="square";
  o.frequency.setValueAtTime(220,c.currentTime);
  o.frequency.exponentialRampToValueAtTime(70,c.currentTime+.12);
  g.gain.setValueAtTime(.4,c.currentTime);
  g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.12);
  o.connect(g); g.connect(c.destination);
  o.start(); o.stop(c.currentTime+.12);
}
btn.addEventListener("click",()=>{
  clickSound();
  setTimeout(()=>location.href="page2.html",200);
});
