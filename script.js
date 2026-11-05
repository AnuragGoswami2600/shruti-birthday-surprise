// PERSONALIZE THESE SETTINGS BEFORE SHARING
const CONFIG = {
  friendName: "Shri",             // Your best friend's name
  secretCode: "24-12-2009",          // Password to unlock
  memories: [
    { image: "assets/photos/memory-1.jpg", caption: "The little moments become the biggest memories." },
    { image: "assets/photos/memory-2.jpg", caption: "Every silly laugh is a memory worth keeping." },
    { image: "assets/photos/memory-3.jpg", caption: "More adventures, more stories, more us." }
  ],
  letter: "Thank you for being one of the brightest parts of my life. I hope this new year brings you laughter, courage, good surprises and every little thing your heart has been wishing for. No matter how busy life gets, I’m always cheering for you. Happy birthday! 💗"
};
const $ = id => document.getElementById(id);
const order = ["lock","welcome","balloons","cake","flowers","memories","letter","gift"];
let popped = 0, photoIndex = 0;

function show(name) {
  document.querySelectorAll(".scene").forEach(s => s.classList.remove("active"));
  $("s-"+name).classList.add("active");
  $("step").textContent = String(order.indexOf(name)+1).padStart(2,"0");
}
function confetti(n=60) {
  const colors=["#e987ae","#c77fe0","#ffd18c","#f6a9c8","#b9a0e8","#fff"];
  for(let i=0;i<n;i++){
    const p=document.createElement("i"); p.className="piece";
    p.style.left=Math.random()*100+"%"; p.style.background=colors[Math.floor(Math.random()*colors.length)];
    p.style.animationDelay=Math.random()+ "s"; p.style.animationDuration=(2+Math.random()*2)+"s";
    $("confetti").appendChild(p); p.addEventListener("animationend",()=>p.remove());
  }
}
$("unlock").addEventListener("submit",e=>{
  e.preventDefault();
  if($("code").value.trim().toLowerCase()===CONFIG.secretCode.toLowerCase()){
    $("friend1").textContent=CONFIG.friendName; $("friend2").textContent=CONFIG.friendName.toUpperCase();
    $("letter-text").textContent=CONFIG.letter; $("error").textContent="";
    show("welcome"); confetti(45);
  } else { $("error").textContent="Not quite! Try the secret code hint again 💗"; $("code").value=""; }
});
document.querySelectorAll("[data-next]").forEach(b=>b.addEventListener("click",()=>show(b.dataset.next)));
document.querySelectorAll(".balloon").forEach(b=>b.addEventListener("click",()=>{
  if(b.classList.contains("popped"))return;
  b.classList.add("popped"); popped++; $("balloon-progress").textContent=`${popped} of 4 popped`; confetti(12);
  if(popped===4){$("balloon-progress").textContent="All popped! Your wish is ready ✨";$("balloon-next").classList.remove("hidden");}
}));
$("balloon-next").addEventListener("click",()=>show("cake"));
function blow(){if($("flame").classList.contains("hidden"))return;$("flame").classList.add("hidden");$("candle-note").textContent="Wish made! May it come true ✨";$("cake-next").classList.remove("hidden");confetti(80);}
$("flame").addEventListener("click",blow); $("cake-next").addEventListener("click",()=>show("flowers"));
function updatePhoto(){
  const item=CONFIG.memories[photoIndex], img=$("photo"), placeholder=$("placeholder");
  $("count").textContent=`${String(photoIndex+1).padStart(2,"0")} / ${String(CONFIG.memories.length).padStart(2,"0")}`;
  $("caption").textContent=item.caption; img.style.display="block"; placeholder.style.display="none"; img.src=item.image;
  img.onerror=()=>{img.style.display="none";placeholder.style.display="grid";placeholder.querySelector("small").textContent=item.image;};
}
function movePhoto(d){photoIndex=(photoIndex+d+CONFIG.memories.length)%CONFIG.memories.length;updatePhoto();}
$("prev").addEventListener("click",()=>movePhoto(-1)); $("next").addEventListener("click",()=>movePhoto(1));
document.querySelector('[data-next="memories"]').addEventListener("click",updatePhoto);
$("envelope").addEventListener("click",()=>{$("letter").classList.remove("hidden");$("letter-next").classList.remove("hidden");});
$("letter-next").addEventListener("click",()=>show("gift"));
$("gift").addEventListener("click",()=>{$("gift").classList.add("hidden");$("final").classList.remove("hidden");$("replay").classList.remove("hidden");confetti(130);});
$("replay").addEventListener("click",()=>{
  popped=0;photoIndex=0;document.querySelectorAll(".balloon").forEach(b=>b.classList.remove("popped"));
  $("balloon-progress").textContent="0 of 4 popped";$("balloon-next").classList.add("hidden");
  $("flame").classList.remove("hidden");$("candle-note").textContent="Your candle is waiting ✨";$("cake-next").classList.add("hidden");
  $("letter").classList.add("hidden");$("letter-next").classList.add("hidden");
  $("gift").classList.remove("hidden");$("final").classList.add("hidden");$("replay").classList.add("hidden");
  updatePhoto();show("lock");
});
