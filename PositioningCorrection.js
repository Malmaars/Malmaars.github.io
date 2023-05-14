function ScaleRelevantObjects(){
    // I'll use this function to scale some specific things that will otherwise break out of view
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    var scalingValue;
    if(windowHeight < windowWidth){
      //use height
      var halfScreenHeightVw = (windowHeight / 100) * (100 / windowHeight);
      scalingValue = halfScreenHeightVw;
      console.log("using vh");


    }
    else{
      //use width
      var halfScreenWidthVw = (windowWidth / 100) * (100 / windowWidth);
      scalingValue = halfScreenWidthVw;
      console.log("using vw");
    }
    var solarSystem = document.getElementById("solarSystem").style;
    solarSystem.transform = `scale(${scalingValue})`;
}

function changeVWtoVH(element){
    //we'll just be changing their height and width here
    var elementStyle = document.getElementById(element).style;
    var width = parseFloat(elementStyle.getPropertyValue('width'));
    var height = parseFloat(elementStyle.getPropertyValue('height'));

    elementStyle.width = width + "vh";
    elementStyle.height = height + "vh";
}

function changeVHtoVW(elementStyle){
  //we'll just be changing their height and width here
  var elementStyle = document.getElementById(element).style;
  var width = parseFloat(elementStyle.getPropertyValue('width'));
  var height = parseFloat(elementStyle.getPropertyValue('height'));

  elementStyle.width = width + "vw";
  elementStyle.height = height + "vw";
}

ScaleRelevantObjects();
window.addEventListener('resize', ScaleRelevantObjects)