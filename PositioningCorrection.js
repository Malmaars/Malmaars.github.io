const planetNames = [
  "planetOneCenter", 
  "planetOneOrbit",
  "planetOne", 
  "planetOneSecondHalf", 
  "planetTwo",
  "planetTwoOrbit",
  "planetTwoMoon",
  "planetThree",
  "planetThreeOrbit",
  "planetThreeMoonOne",
  "planetThreeMoonTwo",
  "planetThreeMoonThree",
  "planetThreeMoonFour",
  "planetThreeMoonFive",
  "planetThreeMoonSix",
  "planetThreeMoonSeven",
  "planetThreeMoonEight",
  "planetThreeMoonNine",
  "planetThreeMoonTen",
  "planetThreeMoonEleven",
  "planetThreeMoonTwelve",    
  "planetFour",
  "planetFourOrbit",
  "planetFive"
 ]

function ScaleRelevantObjects(){
    // I'll use this function to scale some specific things that will otherwise break out of view
    var windowWidth = window.innerWidth || document.documentElement.clientWidth;
    var windowHeight = window.innerHeight || document.documentElement.clientHeight;

    var scalingValue;
    if(windowHeight < windowWidth){
      //use height
      var halfScreenHeightVw = (windowHeight / 100) * (100 / windowHeight);
      scalingValue = halfScreenHeightVw;
      console.log("using vh");

      for (let i = 0; i < planetNames.length; i++){
        changeVWtoVH(planetNames[i]);
    }
    }
    else{
      //use width
      var halfScreenWidthVw = (windowWidth / 100) * (100 / windowWidth);
      scalingValue = halfScreenWidthVw;
      console.log("using vw");
    }
}

function changeVWtoVH(elementName){
    //we'll just be changing their height and width here
    var element = document.getElementById(elementName);
    var computedStyle = getComputedStyle(element);
    
    var windowHeight = window.innerHeight; // Get the window width in pixels
    var widthInPixels = parseFloat(computedStyle.width);
    var widthInVh = (widthInPixels / windowHeight) * 100;

    var heightInPixels = parseFloat(computedStyle.height);
    var heightInVh = (heightInPixels / windowHeight) * 100;

    element.style.width = widthInVh + "vh";
    element.style.height = heightInVh + "vh";
}

function changeVHtoVW(elementName){
  //we'll just be changing their height and width here
  var element = document.getElementById(elementName);
  var computedStyle = getComputedStyle(element);
  var widthInPixels = parseFloat(computedStyle.width);
  var windowWidth = window.innerWidth; // Get the window width in pixels
  var widthInVw = (widthInPixels / windowWidth) * 100;

  var heightInPixels = parseFloat(computedStyle.height);
  var heightInVw = (heightInPixels / windowWidth) * 100;

  element.style.width = widthInVw + "vw";
  element.style.height = heightInVw + "vw";
}

// ScaleRelevantObjects();
// window.addEventListener('resize', ScaleRelevantObjects)