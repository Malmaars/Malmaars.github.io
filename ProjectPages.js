var currentPopUp;
var popUpExists = false;

//The plan is to use this function to create the pop-up. In the parameters we can pass the unique information,
//Such as the title, images, description, and link
function SpawnPage(title, roles, disciplines, description, images, link, buttonText){
  var windowWidth = window.innerWidth || document.documentElement.clientWidth;
  var windowHeight = window.innerHeight || document.documentElement.clientHeight;

  if(windowHeight < windowWidth){
    SpawnHorizontalPage(title, roles, disciplines, description, images, link, buttonText);
  }
  else{
    SpawnVerticalPage(title, roles, disciplines, description, images, link, buttonText);    
  }
}

async function SpawnHorizontalPage(title, roles, disciplines, description, images, link, buttonText){

  if(currentPopUp != null){
    return;
  }

  currentPopUp =  document.createElement('div');
  currentPopUp.className = "projectPopUp";
  currentPopUp.setAttribute("id", "popUp");

  //load the images and check their aspect ratio, this will determine the size of the box
  
  //1: get the width of the popup
  //1.1: set the width of the popup based on the screen size

  var mediaWidth = document.documentElement.clientWidth;

  //turns out a bunch of if-elses is the most efficient way to do this? I know, I don't like it either
  if(mediaWidth >= 1580){ currentPopUp.style.width = "1400px"; } else
  if(mediaWidth < 1580 && mediaWidth > 1360){ currentPopUp.style.width = "1200px";} else
  if(mediaWidth < 1360 && mediaWidth > 1150){ currentPopUp.style.width = "1000px";} else
  if(mediaWidth < 1150 && mediaWidth > 960){ currentPopUp.style.width = "800px";} else
  if(mediaWidth < 960 && mediaWidth > 680){ currentPopUp.style.width = "600px";} else
  if(mediaWidth < 680 || mediaWidth == null) { currentPopUp.style.width = "400px";}

  var popUpImageParent = document.createElement('div');
  popUpImageParent.className = "popUpImage";
  currentPopUp.appendChild(popUpImageParent);

  popUpImageParent.style.opacity = "0";

  var popUpTextParent = document.createElement('div');
  popUpTextParent.className = "popUpRight";
  currentPopUp.appendChild(popUpTextParent);

  popUpTextParent.style.opacity = "0";

  var titleElement = document.createElement('h3');
  titleElement.textContent = title;
  popUpTextParent.appendChild(titleElement);

  var roleElement = document.createElement("div");
  roleElement.className = "roleText";
  roleElement.textContent = roles;
  popUpTextParent.appendChild(roleElement);

  var disciplineElement = document.createElement("div");
  disciplineElement.className = "disciplineText";
  disciplineElement.textContent = disciplines;
  popUpTextParent.appendChild(disciplineElement);

  var descriptionElement = document.createElement("div");
  descriptionElement.className = "popUpDescription";
  descriptionElement.innerHTML = description;
  popUpTextParent.appendChild(descriptionElement);

  //button
  if(buttonText != null && link != null){
    var buttonDiv = document.createElement("div");
    buttonDiv.className = "popUpButton"
    var buttonLink = document.createElement("a");
    buttonLink.href = link;
    buttonLink.target = "blank";
    var innerButtonDiv = document.createElement("div");
    innerButtonDiv.className = "popUpLink";
    innerButtonDiv.innerText = buttonText;

    buttonLink.appendChild(innerButtonDiv);
    buttonDiv.appendChild(buttonLink);
    popUpTextParent.appendChild(buttonDiv);
  }

  var closeButton = document.createElement("div");
  closeButton.className = "popUpClose";

  var closeImage = document.createElement('img');
  closeImage.className = 'centered';
  closeImage.src = "images/SimpleCrossGrey.png";
  closeButton.appendChild(closeImage);

  currentPopUp.appendChild(closeButton);
  closeButton.addEventListener('click',DeletePopUp);

  let img;
  
    //2: calculate the width of the image side
    for (let i = 0; i < images.length; i++){
      var fileExt = images[i].substr(images[i].lastIndexOf('.') + 1);
      
      if(fileExt == "webm"){
        console.log("creating video");
        img = document.createElement('video');
        img.autoplay = true;
        img.muted = true;
        img.loop = true;
        img.playsInline = true;
      }else{
      img = document.createElement('img');
      }

      console.log(images[i]);
      img.src = images[i];
      popUpImageParent.appendChild(img);
    }


  var imgWidth = img.naturalWidth;
  var imgHeight = img.naturalHeight;

  //3: get the ratio of the images
  var imgRatio = imgWidth / imgHeight;

  //4: set the width of the images to 50% the container, than calculate their actual height
  if(imgWidth != null && imgHeight != null && imgWidth != 0 && imgHeight != 0){
  var parentWidth = parseInt(currentPopUp.style.width) * 0.585;
  var newHeight = parentWidth / imgRatio;
  console.log(newHeight);  
  }

  else{
    var newHeight = 800; 
  }

  //5: set the height of the popup to 2x the image height 
  document.body.insertBefore(currentPopUp,document.getElementById("border"));
  await delay(10);
  SetSizeInPixels(parseInt(currentPopUp.style.width), newHeight);
  await delay(500);
  popUpImageParent.style.opacity = "1";
  popUpTextParent.style.opacity = "1";
  popUpExists = true;
}

async function SpawnVerticalPage(title, roles, disciplines, description, images, link, buttonText){
  if(currentPopUp != null){
    return;
  }

  currentPopUp =  document.createElement('div');
  currentPopUp.className = "projectPopUpVertical";
  currentPopUp.setAttribute("id", "popUp");

  //load the images and check their aspect ratio, this will determine the size of the box
  
  //1: get the width of the popup
  //1.1: set the width of the popup based on the screen size

  var mediaWidth = document.documentElement.clientWidth;

  //turns out a bunch of if-elses is the most efficient way to do this? I know, I don't like it either
  if(mediaWidth >= 1580){ currentPopUp.style.width = "1400px"; } else
  if(mediaWidth < 1580 && mediaWidth > 1360){ currentPopUp.style.width = "1200px";} else
  if(mediaWidth < 1360 && mediaWidth > 1150){ currentPopUp.style.width = "1000px";} else
  if(mediaWidth < 1150 && mediaWidth > 960){ currentPopUp.style.width = "800px";} else
  if(mediaWidth < 960 && mediaWidth > 680){ currentPopUp.style.width = "600px";} else
  if(mediaWidth < 680 && mediaWidth > 480) { currentPopUp.style.width = "400px";} else
  if(mediaWidth < 480 || mediaWidth == null) { currentPopUp.style.width = "300px";}

  var popUpImageParent = document.createElement('div');
  popUpImageParent.className = "popUpImageVertical";
  currentPopUp.appendChild(popUpImageParent);

  popUpImageParent.style.opacity = "0";

  var popUpTextParent = document.createElement('div');
  popUpTextParent.className = "popUpBottom";
  currentPopUp.appendChild(popUpTextParent);

  popUpTextParent.style.opacity = "0";

  var titleElement = document.createElement('h3');
  titleElement.textContent = title;
  popUpTextParent.appendChild(titleElement);

  var roleElement = document.createElement("div");
  roleElement.className = "roleText";
  roleElement.textContent = roles;
  popUpTextParent.appendChild(roleElement);

  var disciplineElement = document.createElement("div");
  disciplineElement.className = "disciplineText";
  disciplineElement.textContent = disciplines;
  popUpTextParent.appendChild(disciplineElement);

  var descriptionElement = document.createElement("div");
  descriptionElement.className = "popUpDescription";
  descriptionElement.innerHTML = description;
  popUpTextParent.appendChild(descriptionElement);

  //button
  if(buttonText != null && link != null){
    var buttonDiv = document.createElement("div");
    buttonDiv.className = "popUpButton"
    var buttonLink = document.createElement("a");
    buttonLink.href = link;
    buttonLink.target = "blank";
    var innerButtonDiv = document.createElement("div");
    innerButtonDiv.className = "popUpLink";
    innerButtonDiv.innerText = buttonText;

    buttonLink.appendChild(innerButtonDiv);
    buttonDiv.appendChild(buttonLink);
    popUpTextParent.appendChild(buttonDiv);
  }

  var closeButton = document.createElement("div");
  closeButton.className = "popUpClose";

  var closeImage = document.createElement('img');
  closeImage.className = 'centered';
  closeImage.src = "images/SimpleCrossGrey.png";
  closeButton.appendChild(closeImage);

  currentPopUp.appendChild(closeButton);
  closeButton.addEventListener('click',DeletePopUp);

  let img;
  
    //2: calculate the width of the image side
    for (let i = 0; i < images.length; i++){
      var fileExt = images[i].substr(images[i].lastIndexOf('.') + 1);
      
      if(fileExt == "webm"){
        console.log("creating video");
        img = document.createElement('video');
        img.autoplay = true;
        img.muted = true;
        img.loop = true;
        img.playsInline = true;
      }else{
      img = document.createElement('img');
      }
      img.src = images[i];
      popUpImageParent.appendChild(img);
    }


  var imgWidth = img.naturalWidth;
  var imgHeight = img.naturalHeight;

  //3: get the ratio of the images
  var imgRatio = imgWidth / imgHeight;

  //4: set the width of the images to 50% the container, than calculate their actual height
  if(imgWidth != null && imgHeight != null){
  var parentWidth = parseInt(currentPopUp.style.width) * 0.585;
  var newWidth = parentWidth / imgRatio  
  }

  //5: set the height of the popup to 2x the image height 
  document.body.insertBefore(currentPopUp,document.getElementById("border"));
  await delay(10);
  SetSizeInPixels(parseInt(currentPopUp.style.width), 0);
  currentPopUp.style.height = "auto";

  var newHeight = parseInt(currentPopUp.offsetHeight);

  await delay(10);

  SetSizeInPixels(parseInt(currentPopUp.style.width), 0);

  await delay(10);

  SetSizeInPixels(parseInt(currentPopUp.style.width), newHeight);
  

  await delay(500);
  popUpImageParent.style.opacity = "1";
  popUpTextParent.style.opacity = "1";
  popUpExists = true;
}

function SetSizeInPercentage(percentage){
  currentPopUp.style.width = percentage + "%";
  currentPopUp.style.height = percentage + "%";
}

function SetSizeInPixels(pxWidth, pxHeight){
  currentPopUp.style.width = pxWidth + "px";
  currentPopUp.style.height = pxHeight + "px";
}

async function DeletePopUp(){

  if(currentPopUp == null || popUpExists == false){
    return;
  }

  if(currentPopUp.getElementsByClassName("popUpImage").length > 0){
  currentPopUp.getElementsByClassName("popUpImage")[0].style.opacity = "0";
  currentPopUp.getElementsByClassName("popUpRight")[0].style.opacity = "0";
  }

  if(currentPopUp.getElementsByClassName("popUpImageVertical").length > 0){
  currentPopUp.getElementsByClassName("popUpImageVertical")[0].style.opacity = "0";
  currentPopUp.getElementsByClassName("popUpBottom")[0].style.opacity = "0";
  }


  await delay(500);
  currentPopUp.getElementsByClassName("popUpClose")[0].style.opacity = "0";
  SetSizeInPercentage(0);
  //currentPopUp.style.outline = "none";
  await delay(400);
  currentPopUp.remove();
  currentPopUp = null;
  popUpExists = false;
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

$(document).ready(function(){
  $(document).click(function(e){
      if ($(e.target).is('#popUp,#popUp *')) {
          return;
      }
      else
      {
          DeletePopUp();
      }
  });
});

function ResizePopUp(){
  if(currentPopUp == null){ return; }

  DeletePopUp();

}

addEventListener('resize', ResizePopUp)

var images = [];
function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}

function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod|Windows Phone|BlackBerry|Mobile/i.test(navigator.userAgent);
}

preload(
  "images/Projects/THROWBOT_20title_20screen.jpg","images/Projects/ThrowBotScreenshot.jpg",/* "images/Projects/ThrowBotGameplay.gif", */"images/Projects/Cinematic_20Frame_203.jpg",
  "images/Projects/AntInferno.png",/* "images/Projects/GunFile.gif", */"images/Projects/GunFile2.png","images/Projects/GunFile3.png",
  /* "images/Projects/Energizer.gif", */"images/Projects/Energizer2.png","images/Projects/Energizer3.png","images/Projects/Energizer4.png",
  "images/Projects/PackCheck1.jpg","images/Projects/PackCheck4.jpg","images/Projects/PackCheck2.jpg",/* "images/Projects/PackCheck.gif", */
  "images/Projects/Knowhere1.jpg","images/Projects/Knowhere2.jpg",/* "images/Projects/Train.gif", */"images/Projects/Knowhere4.jpg",
  "images/Projects/Whole1.jpg",/* "images/Projects/Whole.gif", */"images/Projects/Whole3.jpg","images/Projects/Whole4.jpg",
  "images/Projects/ThreeJsSite1.png", /* "images/Projects/ThreeJs.gif", */ "images/Projects/ThreeJsSite3.png", "images/Projects/ThreeJsSite4.png",
  "images/Projects/Kwal2.jpg",/* "images/Projects/Kwal.gif", */"images/Projects/Kwal3.png","images/Projects/Kwal4.png",
  "images/Projects/BrickBreaker1.png","images/Projects/BrickBreaker3.png",/* "images/Projects/BrickBreaker2.gif", */"images/Projects/BrickBreaker4.png",
  "images/Projects/Utablia1.jpg","images/Projects/Utablia2.jpg", "images/Projects/Utablia4.jpg"
);


document.getElementById('ThrowBot').addEventListener('click', function(event) {SpawnPage(
  "ThrowBot",
  "Developer/Designer",
  "C# - Unity",
  "A game made for the speed jam in 2023. It was made in 3 days, with the team consisting of 4 members. 2 artists, 1 sound designer and me as the developer and game designer. <br> The goal of the jam was to make a game focused on speedrunning.",
  ["images/Projects/THROWBOT_20title_20screen.jpg","images/Projects/ThrowBotScreenshot.png","images/Projects/ThrowBotGameplay.webm","images/Projects/Cinematic_20Frame_203.jpg"],
  "https://matotam.itch.io/throwbot",
  "Go to game"
);});
document.getElementById('GunFile').addEventListener('click', function(event) {SpawnPage(
  "Gun File: Root",
  "Developer/Designer",
  "C# - Unity",
  "A game made for the global game jam in 2023. The jam lasted 2 days. I made it in collaboration with one artist, making the team called <b>Ant Inferno</b>. <br> The game is very experimental, and overshot it's small scope a little, but I'm proud of it nonetheless. The theme of the jam was <b>roots</b>, and we tried to make the interpretation of the theme unique.",
  ["images/Projects/AntInferno.png","images/Projects/GunFile2.png","images/Projects/GunFile.webm","images/Projects/GunFile3.png"],
  "https://matotam.itch.io/access-gun-file-root",
  "Go to game"
);});
document.getElementById('Energizer').addEventListener('click', function(event) {SpawnPage(
  "Energizer 3D",
  "Developer/Designer",
  "C# - Unity",
  "A game made for the 32 bit jam in 2022. I made this together with my brother, which was his first game jam. This jam lasted 2 weeks, so we took it at a leisurely, more healthy pace. <br> The goal of the jam was to create a game that felt like a ps1 or N64 game. We emulated this feel by using low resolution textures and low poly models. <br> I wanted the janky N64 feel as well, so although I am satisfied with the movement, I made the camera extra convoluted and a little difficult to work with on purpose. <br> Besides the whole design and development, I am also responsible for a few art assets: the particle effects and the skybox.",
  ["images/Projects/Energizer3.png","images/Projects/Energizer2.png","images/Projects/Energizer.webm","images/Projects/Energizer4.png"],
  "https://smos-bois.itch.io/energizer-3d",
  "Go to game"
);});
document.getElementById('PackCheck').addEventListener('click', function(event) {SpawnPage(
  "Pack Check",
  "Developer/Designer",
  "C# - Unity",
  "A game made for the Quarantine jam in 2020. I made this together with 1 other artist (a student friend of mine). This was made in 2 days. <br> I made this in the first year I started coding. I was still following the Game Designer course at the time (instead of the Game Development course). Even though it was made a while ago, I believe it holds up really well. The game plays well, and there are some fun design choices we made, such as the customers getting visibly nervous when asked about illegal items. <br>",
  ["images/Projects/PackCheck1.jpg","images/Projects/PackCheck4.jpg","images/Projects/PackCheck.webm","images/Projects/PackCheck2.jpg"],
  "https://smos-bois.itch.io/pack-check",
  "Go to game"
);});
document.getElementById('Knowhere').addEventListener('click', function(event) {SpawnPage(
  "The Knowhere Express",
  "Developer",
  "C# - Unity",
  "A game made for the Global Game Jam in 2022. The jam lasted 2 days. I made this with a very large group, the maximum amount of people for one group allowed. 2 game designers, 4 artists, and 1 sound designer, with me as the sole developer. <br> The game as a whole is an experimental take on the afterlife. We wanted to focus on getting the feeling right. We mixed high detail assets with low detail assets, to create a weird, unusual feeling. <br> There are parts of the game that are lacking in quality, but that's an expected result during game jams.",
  ["images/Projects/Knowhere1.jpg","images/Projects/Knowhere2.jpg","images/Projects/Train.webm","images/Projects/Knowhere4.jpg"],
  "https://mirnavsteenbergen.itch.io/the-knowhere-express",
  "Go to game"
);});
document.getElementById('Whole').addEventListener('click', function(event) {SpawnPage(
  "The (W)hole",
  "Developer/Designer/Writer",
  "C# - Unity",
  "The (W)hole was a school project in the first year of my study. It took several weeks, with a group of 3 artists, and 3 designers, where I was one of the designers. <br> Although this was when I wanted to focus on development, a lot of the development has to be credited to Pim van Wieren. I worked on the dialogue system and the movement. I was also in charge of the writing. Where we did the overall story as a group, I wrote all of the dialogue (and made the sounds), and designed the puzzles that correspond with them.",
  ["images/Projects/Whole1.jpg","images/Projects/Whole3.jpg","images/Projects/Whole.webm","images/Projects/Whole4.jpg"],
  "https://aronbg.itch.io/hole",
  "Go to game"
);});
document.getElementById('ThreeJs').addEventListener('click', function(event) {SpawnPage(
  "Three Js Site",
  "Everything",
  "ThreeJS - HTML - CSS - Javascript",
  "Before making the site you're on right now, I wanted to make something even more interactive, more engaging. I wanted to make a 3D game environment within a site. I thought I could accomplish this by using the language three js, which I learned specifically for this site. <br> After pouring a lot of hours into the site, which included modeling all assets and making my own barebones physics system, I did some playtesting. It turned out not every device could handle the website, and it often got stuck loading. <br> I decided to kill my darlings, and start a new website (this one).",
  ["images/Projects/ThreeJsSite1.png","images/Projects/ThreeJsSite3.png","images/Projects/ThreeJs.webm","images/Projects/ThreeJsSite4.png"],
  "https://malmaars.github.io/threejs-doneright/",
  "Go to prototype"
);});
document.getElementById('Kwal').addEventListener('click', function(event) {SpawnPage(
  "Jellyfish controller",
  "Everything",
  "Physical - Arduino - Unity - C#",
  "In the first year of college, one assignment was to make something using arduino. The assignment was very open-ended. I decided to make a special controller. The controller was based off jellyfish, which I had done extensive research on before. Like jellyfish would, the controller detects light. <br> This happens through multiple light sensors, which connect to the arduino, which then connects to a laptop. The received data translates to the game, where a jellyfish will move to a direction. The direction differs on where the controller receives light. <br> This is one of my personal favorite projects, I really enjoyed the physical work, building the controller. There was a plan to develop it further, but the emergence of covid stopped that.",
  ["images/Projects/Kwal3.png","images/Projects/Kwal2.jpg","images/Projects/Kwal.webm","images/Projects/Kwal4.png"],
  "https://youtube.com/shorts/USdGcHCOjiE",
  "Go to video"
);});
document.getElementById('BrickBreaker').addEventListener('click', function(event) {SpawnPage(
  "Pinball Brickbreaker",
  "Everything",
  "Physical",
  "I was tasked to, within a week, make a physical thing that has some kind of motion in it, and is not driven by electronics. I chose to make something interactive. I really like pinball machines, and I wondered why there wasn't a pinball machine about brickbreaker yet. It seems compatible on paper. So I set out to make just that, a brickbreaker pinball machine. <br> After testing some cardboard prototypes, the final prototype consisted of lasercut wood, with the addition of a spring (stolen from a pen) and a marble <a href='ILied.html' target='_blank' class='pLink'>(stolen from a child)</a>. The bricks are designed so they fall into a fitted slot when hit hard enough, becoming part of the flat surface, they can be pushed back up from the bottom. The bricks are all in a half-circle shape, so the ball won't get stuck, and will roll down from any position.",
  ["images/Projects/BrickBreaker1.png","images/Projects/BrickBreaker3.png","images/Projects/BrickBreaker2.webm","images/Projects/BrickBreaker4.png"],
);});

document.getElementById('Utablia').addEventListener('click', function(event) {SpawnPage(
  "Utablia",
  "Developer/Designer",
  "Physical - Unity - C# - Reactivision",
  "As a context project for HKU, we were tasked with creating an experience that could stand on the <a href='https://sencity.nl/' target='_blank' class='pLink'>Sencity Festival</a>, a festival for the deaf and hard of hearing. We designed a table where people could draw different environments, to which the animals on the table would react. We kept in mind that the interaction of the festival-goers would be very short. The result of this is that the experience is easy to understand from the start, we wanted to encourage the festival-goers to try different things and experiment with the table, while trying to reach goals on the table. <br> Although it wasn't expected from HKU, we managed to stand on Sencity, and I was pleased to see the festival-goers were experiencing the type of interaction we designed the table for, it got strangers talking with each other, and connected deaf and hearing people. <br> This project took about 5 months, but due to complications I only had about 3 months to work on it, I was in charge of all the technology involved in the table. The program runs in Unity with the help of reacTIVision. For the hardware I reused the beamer with infrared cameras from a reactable, which is how we tracked the pawns people could use for drawing. <br><br><br>",
  ["images/Projects/Utablia1.jpg","images/Projects/Utablia2.jpg","images/Projects/Utablia.webm","images/Projects/Utablia4.jpg"],
);});