var currentPopUp;
var popUpExists = false;

document.getElementById('ThrowBot').addEventListener('click', function(event) {SpawnPage(
  "ThrowBot",
  "Developer/Designer",
  "A game made for the speed jam. It was made in 3 days, with the team consisting of 4 members. 2 artists, 1 sound designer and me as the developer and game designer. <br> The goal of the jam was to make a game focused on speedrunning.",
  ["images/Projects/THROWBOT_20title_20screen.jpg","images/Projects/ThrowBotScreenshot.png","images/Projects/ThrowBotGameplay.gif","images/Projects/Cinematic_20Frame_203.jpg"],
  "https://matotam.itch.io/throwbot",
  "Go to game"
);});

//The plan is to use this function to create the pop-up. In the parameters we can pass the unique information,
//Such as the title, images, description, and link
async function SpawnPage(title, roles, description, images, link, buttonText){

  if(currentPopUp != null){
    return;
  }

  currentPopUp =  document.createElement('div');
  currentPopUp.className = "projectPopUp";
  currentPopUp.setAttribute("id", "popUp");

  //load the images and check their aspect ratio, this will determine the size of the box
  
  //1: get the width of the popup
  //1.1: set the width of the popup based one the screen size

  //for now we'll do it with a fixed width
  currentPopUp.style.width = "1200px";

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
  console.log("Original width=" + imgWidth + ", " + "Original height=" + imgHeight)

  //3: get the ratio of the images
  var imgRatio = imgWidth / imgHeight;
  console.log(imgRatio);

  //4: set the width of the images to 50% the container, than calculate their actual height
  var parentWidth = parseInt(currentPopUp.style.width) * 0.585;
  var newHeight = parentWidth / imgRatio  

  //5: set the height of the popup to 2x the image height 
  console.log("creating popup");
  document.body.insertBefore(currentPopUp,document.getElementById("border"));
  await delay(10);
  SetSizeInPixels(1200, newHeight);
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

  currentPopUp.getElementsByClassName("popUpImage")[0].style.opacity = "0";
  currentPopUp.getElementsByClassName("popUpRight")[0].style.opacity = "0";


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