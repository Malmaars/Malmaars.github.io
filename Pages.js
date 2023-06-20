document.getElementById('WelcomeButton').addEventListener('click', function(event) {OpenPage("welcomePage");});
document.getElementById('sun').addEventListener('click', function(event) {OpenPage("welcomePage");});
document.getElementById('AboutMeButton').addEventListener('click', function(event) {OpenPage("aboutMePage");});
document.getElementById('planetOne').addEventListener('click', function(event) {OpenPage("aboutMePage");});
document.getElementById('planetOneSecondHalf').addEventListener('click', function(event) {OpenPage("aboutMePage");});
document.getElementById('ProjectsButton').addEventListener('click', function(event) { OpenPage("projectsPage");});
document.getElementById('planetTwo').addEventListener('click', function(event) { OpenPage("projectsPage");});
document.getElementById('ExperienceButton').addEventListener('click', function(event) { OpenPage("experiencePage");});
document.getElementById('planetFour').addEventListener('click', function(event) { OpenPage("experiencePage");});
document.getElementById('planetFive').addEventListener('click', function(event) { OpenPage("experiencePage");});
document.getElementById('ContactButton').addEventListener('click', function(event) {OpenPage("contactPage");});
document.getElementById('planetThree').addEventListener('click', function(event) {OpenPage("contactPage");});

const pageElements = [
  document.getElementById("welcomePage"),
  document.getElementById("aboutMePage"),
  document.getElementById("projectsPage"),
  document.getElementById("experiencePage"),
  document.getElementById("contactPage"),
]

function Initialize(){
  for (let i = 0; i < pageElements.length; i++){
    pageElements[i].getElementsByClassName("closeButton")[0].addEventListener('click', function(event) { ClosePage(pageElements[i]);});

    pageElements[i].getElementsByClassName("smallWelcomeButton")[0].addEventListener('click', function(event) { OpenPage("welcomePage");});
    pageElements[i].getElementsByClassName("smallAboutMeButton")[0].addEventListener('click', function(event) { OpenPage("aboutMePage");});
    pageElements[i].getElementsByClassName("smallProjectsButton")[0].addEventListener('click', function(event) { OpenPage("projectsPage");});
    pageElements[i].getElementsByClassName("smallExperienceButton")[0].addEventListener('click', function(event) { OpenPage("experiencePage");});
    pageElements[i].getElementsByClassName("smallContactButton")[0].addEventListener('click', function(event) { OpenPage("contactPage");});
  }

  var smallParents = document.getElementsByClassName("smallParent");

  document.getElementById("backToMain").addEventListener('click', function(event) { ClosePage();});

  for (let k = 0; k < smallParents.length; k++){
    smallParents[k].addEventListener('mouseover', function(event) { SmallPageHover(smallParents[k]);});
    smallParents[k].addEventListener('mouseout', function(event) { SmallPageHoverExit(smallParents[k]);});
  }
}

var openPage;

Initialize();

function OpenPage(pagename){
  //first, close all other pages
  for (let i = 0; i < pageElements.length; i++){
    ClosePage(pageElements[i]);
}
  //open the page
  openPage = document.getElementById(pagename);
  FocusPlanet(pagename);
  ResizePage();
}

function ClosePage(element){
  if(element != null){
  element.style.width = "45%";
  element.style.left = "-50%";
  }

  else{
    openPage.style.width = "45%";
    openPage.style.left = "-50%";
  }
  openPage = null;
  UnFocus();
  ResizePage();
}

function ResizePage(){

  var windowWidth = window.innerWidth || document.documentElement.clientWidth;
  var windowHeight = window.innerHeight || document.documentElement.clientHeight;

  var windowClientWidth = document.documentElement.clientWidth;

  //also do some stuff with the buttons, maybe even change the stylesheet

  //get the close button
  if(openPage != null)
  {
    var closeButton = openPage.getElementsByClassName("closeButton")[0];
  }
  const border = document.getElementById("border");

  const backToMain = document.getElementById("backToMain");

  if(windowHeight < windowWidth && windowClientWidth > 985){
    if(openPage!=null)
    {
    openPage.style.width = "45%";
    openPage.style.left = "0%";
    closeButton.style.marginRight = "-4vw";
    }

    backToMain.style.marginBottom = "-30px";
    border.style.height= "96vh";
  }

  else{
    if(openPage!=null)
    {
    openPage.style.width = "100%"
    openPage.style.left = "0%";
    closeButton.style.marginRight = "4vw";
    backToMain.style.marginBottom = "0px";
    }
    else{
      backToMain.style.marginBottom = "-30px";
    }

    border.style.height= "90vh";
  }
}

ResizePage();
addEventListener('resize', ResizePage);

function SmallPageHover(parentElement){
  parentElement.parentNode.style.transitionDelay = "0s";
  parentElement.parentNode.style.width = "12.5vw";
  parentElement.parentNode.style.right = "-12.5vw";
  parentElement.style.width = "12vw";
  var pageName = parentElement.getElementsByClassName("smallPageName")[0];
  pageName.style.marginLeft = "3vw";
  parentElement.getElementsByClassName("smallPageIcon")[0].style.borderRight = "none";
}
function SmallPageHoverExit(parentElement){
  parentElement.parentNode.style.transitionDelay = "0.3s";
  parentElement.parentNode.style.width = "3.5vw";
  parentElement.parentNode.style.right = "-3.5vw";
  parentElement.style.width = "3.5vw";
  var pageName = parentElement.getElementsByClassName("smallPageName")[0];
  pageName.style.marginLeft = "-6vw";
  parentElement.getElementsByClassName("smallPageIcon")[0].style.borderRight = "solid white 0.1vw";
}

function FocusPlanet(pagename){
  //in here we dim the other planets a little when we focus on one page/planet
  for (let i = 0; i < planets.length; i++){
    planets[i].planetElement.backgroundColor = "rgba(255, 255, 255, 0.5)";
  }

  switch(pagename){
    case "welcomePage":
      document.getElementById("sun").style.backgroundColor = "rgba(255, 255, 255, 1)";
      break;
    case "aboutMePage":
      document.getElementById("planetOne").style.backgroundColor = "rgba(255, 255, 255, 1)";
      document.getElementById("planetOneSecondHalf").style.backgroundColor = "rgba(255, 255, 255, 1)";
      break;
    case "projectsPage":
      document.getElementById("planetTwo").style.backgroundColor = "rgba(255, 255, 255, 1)";
      document.getElementById("planetTwoMoon").style.backgroundColor = "rgba(255, 255, 255, 1)";
      break;
    case "experiencePage":
      document.getElementById("planetFour").style.backgroundColor = "rgba(255, 255, 255, 1)";
      document.getElementById("planetFive").style.backgroundColor = "rgba(255, 255, 255, 1)";
      break;
    case "contactPage":
      document.getElementById("planetThree").style.backgroundColor = "rgba(255, 255, 255, 1)";
      document.getElementById("planetThreeMoonOne").style.backgroundColor = "rgba(255, 255, 255, 1)";
      document.getElementById("planetThreeMoonTwo").style.backgroundColor = "rgba(255, 255, 255, 1)";
      document.getElementById("planetThreeMoonThree").style.backgroundColor = "rgba(255, 255, 255, 1)";
      document.getElementById("planetThreeMoonFour").style.backgroundColor = "rgba(255, 255, 255, 1)";
      document.getElementById("planetThreeMoonFive").style.backgroundColor = "rgba(255, 255, 255, 1)";
      document.getElementById("planetThreeMoonSix").style.backgroundColor = "rgba(255, 255, 255, 1)";
      document.getElementById("planetThreeMoonSeven").style.backgroundColor = "rgba(255, 255, 255, 1)";
      document.getElementById("planetThreeMoonEight").style.backgroundColor = "rgba(255, 255, 255, 1)";
      document.getElementById("planetThreeMoonNine").style.backgroundColor = "rgba(255, 255, 255, 1)";
      document.getElementById("planetThreeMoonTen").style.backgroundColor = "rgba(255, 255, 255, 1)";
      document.getElementById("planetThreeMoonEleven").style.backgroundColor = "rgba(255, 255, 255, 1)";
      document.getElementById("planetThreeMoonTwelve").style.backgroundColor = "rgba(255, 255, 255, 1)";
      break;

  }
}

function UnFocus(){
  for (let i = 0; i < planets.length; i++){
    planets[i].planetElement.backgroundColor = "rgba(255, 255, 255, 1)";
  }
}

OpenPage("welcomePage");