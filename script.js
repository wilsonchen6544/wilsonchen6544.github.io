const html = document.documentElement;
const canvas = document.getElementById("mac");
const context = canvas.getContext("2d");
var done = false;
const frameCount = 75;
const currentFrame = index => (
  `pictures/${index.toString().padStart('1')}.png`
)
const images = [null] // since everything else is 1-indexed, explicitly fill images[0]
document.getElementById("loader").style.backgroundImage = "url(pictures/loading.png)";
const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    images[i] = new Image();
    images[i].src = currentFrame(i);
  }
  done = true;
};

img = new Image()
img.src = currentFrame(1);

canvas.width=1920;
canvas.height=1300;

img.onload=function(){
  context.drawImage(img, 0, 0);
}
const updateImage = index => {
  context.drawImage(images[index], 0, 0); 
}

window.addEventListener('scroll', () => {  
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(frameCount - 1, Math.ceil(scrollFraction * frameCount * 1.7));
  
  if (frameIndex + 1 != 75) {
    requestAnimationFrame(() => updateImage(frameIndex + 1))
  }

  if (frameIndex == 74) {
    
    document.getElementById("mac").style.display = "none"
    
    document.getElementById("tets").style.background = "url(pictures/background.png)";
    document.getElementById("tets").style.backgroundPostion = "center"
    document.getElementById("tets").style.backgroundRepeat = "no-repeat"
    document.getElementById("tets").style.backgroundSize = "cover"
    document.getElementById("tets").style.backgroundAttachment = "fixed"

  } else if (frameIndex > 71) {

    document.getElementById("mac").style.maxHeight = "400vh"
    document.getElementById("mac").style.maxWidth = "400vh"

  } else {
    document.getElementById("tets").style.background = "black"
    
    document.getElementById("mac").style.display = "block"
    document.getElementById("mac").style.maxHeight = "100vh"
    document.getElementById("mac").style.maxWidth = "100vw"
  }

});

preloadImages()

function myFunction() {

  if (done) { 
      setTimeout(showPage, 2000); 
  } else {
      preloadImages();
      myFunction() 
  }
}
function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("main").style.display = "block";
}
