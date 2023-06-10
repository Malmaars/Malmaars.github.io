var currentPopUp;
var popUpExists = false;

//The plan is to use this function to create the pop-up. In the parameters we can pass the unique information,
//Such as the title, images, description, and link
function SpawnPage(title, roles, description, images, link, buttonText){
  var windowWidth = window.innerWidth || document.documentElement.clientWidth;
  var windowHeight = window.innerHeight || document.documentElement.clientHeight;

  if(windowHeight < windowWidth){
    SpawnHorizontalPage(title, roles, description, images, link, buttonText);
  }
  else{
    SpawnVerticalPage(title, roles, description, images, link, buttonText);    
  }
}

async function SpawnHorizontalPage(title, roles, description, images, link, buttonText){

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

  console.log("creating popUp");

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
      img = document.createElement('img');
      img.src = images[i];
      popUpImageParent.appendChild(img);
    }


  var imgWidth = img.naturalWidth;
  var imgHeight = img.naturalHeight;

  //3: get the ratio of the images
  var imgRatio = imgWidth / imgHeight;

  //4: set the width of the images to 50% the container, than calculate their actual height
  var parentWidth = parseInt(currentPopUp.style.width) * 0.585;
  var newHeight = parentWidth / imgRatio  

  //5: set the height of the popup to 2x the image height 
  document.body.insertBefore(currentPopUp,document.getElementById("border"));
  await delay(10);
  SetSizeInPixels(parseInt(currentPopUp.style.width), newHeight);
  await delay(500);
  popUpImageParent.style.opacity = "1";
  popUpTextParent.style.opacity = "1";
  popUpExists = true;
}

async function SpawnVerticalPage(title, roles, description, images, link, buttonText){
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
  if(mediaWidth < 680 || mediaWidth == null) { currentPopUp.style.width = "400px";}


  console.log("creating popUp");

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
      img = document.createElement('img');
      img.src = images[i];
      popUpImageParent.appendChild(img);
    }


  var imgWidth = img.naturalWidth;
  var imgHeight = img.naturalHeight;

  //3: get the ratio of the images
  var imgRatio = imgWidth / imgHeight;

  //4: set the width of the images to 50% the container, than calculate their actual height
  var parentWidth = parseInt(currentPopUp.style.width) * 0.585;
  var newWidth = parentWidth / imgRatio  

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
    console.log("preloaded content");
}

function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod|Windows Phone|BlackBerry|Mobile/i.test(navigator.userAgent);
}

preload(
  "images/Projects/THROWBOT_20title_20screen.jpg","images/Projects/ThrowBotScreenshot.png","images/Projects/ThrowBotGameplay.gif","images/Projects/Cinematic_20Frame_203.jpg",
  "images/Projects/AntInferno.png","images/Projects/GunFileMain.png","images/Projects/GunFile2.png","images/Projects/GunFile3.png",
  "images/Projects/Energizer1.png","images/Projects/Energizer2.png","images/Projects/Energizer3.png","images/Projects/Energizer4.png",
  "images/Projects/PackCheck1.jpg","images/Projects/PackCheck4.jpg","images/Projects/PackCheck2.jpg","images/Projects/PackCheck3.jpg",
  "images/Projects/Knowhere1.png","images/Projects/Knowhere2.png","images/Projects/Knowhere3.png","images/Projects/Knowhere4.png",
  "images/Projects/Whole1.png","images/Projects/Whole2.png","images/Projects/Whole3.png","images/Projects/Whole4.png"
);


document.getElementById('ThrowBot').addEventListener('click', function(event) {SpawnPage(
  "ThrowBot",
  "Developer/Designer",
  "A game made for the speed jam in 2023. It was made in 3 days, with the team consisting of 4 members. 2 artists, 1 sound designer and me as the developer and game designer. <br> The goal of the jam was to make a game focused on speedrunning.",
  ["images/Projects/THROWBOT_20title_20screen.jpg","images/Projects/ThrowBotScreenshot.png","images/Projects/ThrowBotGameplay.gif","images/Projects/Cinematic_20Frame_203.jpg"],
  "https://matotam.itch.io/throwbot",
  "Go to game"
);});
document.getElementById('GunFile').addEventListener('click', function(event) {SpawnPage(
  "Gun File: Root",
  "Developer/Designer",
  "A game made for the global game jam in 2023. The jam lasted 2 days. I made it in collaboration with one artist, making the team called <b>Ant Inferno</b>. <br> The game is very experimental, and overshot it's small scope a little, but I'm proud of it nonetheless. The theme of the jam was <b>roots</b>, and we tried to make the interpretation of the theme unique.",
  ["images/Projects/AntInferno.png","images/Projects/GunFileMain.png","images/Projects/GunFile2.png","images/Projects/GunFile3.png"],
  "https://matotam.itch.io/access-gun-file-root",
  "Go to game"
);});
document.getElementById('Energizer').addEventListener('click', function(event) {SpawnPage(
  "Energizer 3D",
  "Developer/Designer",
  "A game made for the 32 bit jam in 2022. I made this together with my brother, which was his first game jam. This jam lasted 2 weeks, so we took it at a leisurely, more healthy pace. <br> The goal of the jam was to create a game that felt like a ps1 or N64 game. We emulated this feel by using low resolution textures and low poly models. <br> I wanted the janky N64 feel as well, so although I am satisfied with the movement, I made the camera extra convoluted and a little difficult to work with on purpose. <br> Besides the whole design and development, I am also responsible for a few art assets: the particle effects and the skybox.",
  ["images/Projects/Energizer1.png","images/Projects/Energizer2.png","images/Projects/Energizer3.png","images/Projects/Energizer4.png"],
  "https://smos-bois.itch.io/energizer-3d",
  "Go to game"
);});
document.getElementById('PackCheck').addEventListener('click', function(event) {SpawnPage(
  "Pack Check",
  "Developer/Designer",
  "A game made for the Quarantine jam in 2020. I made this together with 1 other artist (a student friend of mine). This was made in 2 days. <br> I made this in the first year I started coding. I was still following the Game Designer course at the time (instead of the Game Development course). Even though it was made a while ago, I believe it holds up really well. The game plays well, and there are some fun design choices we made, such as the customers getting visibly nervous when asked about illegal items. <br>",
  ["images/Projects/PackCheck1.jpg","images/Projects/PackCheck4.jpg","images/Projects/PackCheck2.jpg","images/Projects/PackCheck3.jpg"],
  "https://smos-bois.itch.io/pack-check",
  "Go to game"
);});
document.getElementById('Knowhere').addEventListener('click', function(event) {SpawnPage(
  "The Knowhere Express",
  "Developer",
  "A game made for the Global Game Jam in 2022. The jam lasted 2 days. I made this with a very large group, the maximum amount of people for one group allowed. 2 game designers, 4 artists, and 1 sound designer, with me as the sole developer. <br> The game as a whole is an experimental take on the afterlife. We wanted to focus on getting the feeling right. We mixed high detail assets with low detail assets, to create a weird, unusual feeling. <br> There are parts of the game that are lacking in quality, but that's an expected result during game jams.",
  ["images/Projects/Knowhere1.png","images/Projects/Knowhere2.png","images/Projects/Knowhere3.png","images/Projects/Knowhere4.png"],
  "https://mirnavsteenbergen.itch.io/the-knowhere-express",
  "Go to game"
);});
document.getElementById('Whole').addEventListener('click', function(event) {SpawnPage(
  "The (W)hole",
  "Developer/Designer/Writer",
  "The (W)hole was a school project in the first year of my study. It took several weeks, with a group of 3 artists, and 3 designers, where I was one of the designers. <br> Although this was when I wanted to focus on development, a lot of the development has to be credited to Pim van Wieren. I worked on the dialogue system and the movement. I was also in charge of the writing. Where we did the overall story as a group, I wrote all of the dialogue (and made the sounds), and designed the puzzles that correspond with them.",
  ["images/Projects/Whole1.png","images/Projects/Whole2.png","images/Projects/Whole3.png","images/Projects/Whole4.png"],
  "https://aronbg.itch.io/hole",
  "Go to game"
);});