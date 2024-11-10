
const audio = document.getElementById("backsound");


function introStart(){
  gsap.timeline({
    onComplete: () => {
      gsap.timeline({ repeat: -1 })
        .to(".intro .msg-wrap", { y: 6, duration: 1})
        .to(".intro .msg-wrap", { y: 0, duration: 1})
    }
  })
   .from(".intro .msg-box", { y: 100, duration: 1})
   .from(".intro .msg-paper", { y: 3, duration: .5})
   .from(".intro .msg-paper", { scale: 0, duration: .5}, "-=0.5")
   .from(".intro .text", {opacity: 0, duration: .5})
}

function homeStart(){
  audio.play();
  gsap.timeline({
    onComplete: () => {
      document.querySelector(".overlay").style.display = "block";
      gsap.timeline({
        onComplete: () => {
          document.querySelector(".intro").classList.add("off");
          document.querySelector(".home").classList.remove("off");
          gsap.timeline({
            onComplete: () => {
              document.querySelector(".overlay").style.display = "none";
             }
          }).to(".overlay", {opacity: 0, duration: .7})
        }
      }).to(".overlay", {opacity: 1, duration: .7})
    }
  })
    .to(".intro .msg-paper", { scale: 5, rotate: 0, zIndex: 2, duration: 1})
    .to(".intro .msg-paper", { y: 1000, duration: .9}, "2")
}


window.addEventListener("DOMContentLoaded", () => {
  setTimeout(function() {
    gsap.timeline({
      onComplete: () => {
        document.querySelector(".overlay").style.display = "none";
      }
    }).to(".overlay", {opacity: 0, duration: 1})
    introStart();
  }, 2000);
});