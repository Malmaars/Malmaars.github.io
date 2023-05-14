class vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
plus(otherVec) {
  return new Vec(this.x + otherVec.x, this.y + otherVec.y);
}

minus(otherVec) {
  return new Vec(this.x - otherVec.x, this.y - otherVec.y);
}

get length() {
  return Math.sqrt(this.x * this.x + this.y * this.y);
}

toString() {
  return `Vec{x: ${this.x}, y: ${this.y}}`;
}
}

class OrbitingPlanet
{
  //planetElement is the element we want to move, orbitingElement is what it orbits around, distance is the distance between the planet and what it orbits
  constructor(planetElementName, orbitingElementName, rotationSpeed, ){
      
      //set the radians to its start position instead of just 0

      this.planetElement = document.getElementById(planetElementName).style;
      this.rotationSpeed = rotationSpeed;
      this.orbitingElement = document.getElementById(orbitingElementName).style;
      
      var planetRef = $("#" + planetElementName);
      var offset = planetRef.position();
      //this.distance = offset.left;

      var offsetInVw = {
        left: (offset.left / $(window).width()) * 100,
        top: (offset.top / $(window).width()) * 100
      };

      this.orbitingRef = $("#" + orbitingElementName);
      var orbitOffset = this.orbitingRef.position();

      var orbitOffsetInVw = {
        left: (orbitOffset.left / $(window).width()) * 100,
        top: (orbitOffset.top / $(window).width()) * 100
      };

      
      this.distance = Math.sqrt(Math.pow(offsetInVw.left - orbitOffsetInVw.left, 2) + Math.pow(offsetInVw.top - orbitOffsetInVw.top, 2));
      this.radians = Math.atan2(offsetInVw.top - orbitOffsetInVw.top, offsetInVw.left - orbitOffsetInVw.left);
  }

  //get the distance between the planet and what it orbits

  UpdatePlanet(){
      this.OrbitPlanet();
  }

  OrbitPlanet() {

      //I can make something orbit by fetching the center. I can determine position by its radians
      var orbitOffset = this.orbitingRef.position();
      var orbitOffsetInVw = {
        left: (orbitOffset.left / $(window).width()) * 100,
        top: (orbitOffset.top / $(window).width()) * 100
      };
      
      this.orbitingPosition = new vector2(orbitOffsetInVw.left, orbitOffsetInVw.top);

      //before delving into any time based things, let's try orbiting the planets first
      this.SetPosition(this.planetElement, this.CalculatePosition(this.orbitingPosition, this.distance, this.radians));
      this.radians += this.rotationSpeed;
      if(this.radians > Math.PI*2){
          this.radians -= Math.PI*2;
      }
  }
  
  
  //returns a vector2. orbitCenter is the location from which it orbits, basically its offset distance and radians are both floats
  CalculatePosition(orbitCenter, distance, radians){
  
      //x = cos(a), y = sin(a)
      var xPos = Math.cos(radians);
      var yPos = Math.sin(radians);

      //add the offset of the center and add the new distance from it
      //I don't know why, but I need to do -1 here???
      xPos += orbitCenter.x + xPos * (distance - 1);
      yPos += orbitCenter.y + yPos * (distance - 1);

      return new vector2(xPos, yPos);
  }
  
  //element is the element we want to set the position of, the position is a vector2 
  SetPosition(element, newPosition){
      element.left = newPosition.x + "vw";
      element.top = newPosition.y + "vw";
  }

}

const planets = [
 new OrbitingPlanet("planetOneCenter", "sun", 0.005), 
 new OrbitingPlanet("planetOne", "planetOneCenter", -0.003), 
 new OrbitingPlanet("planetOneSecondHalf", "planetOneCenter", -0.003), 
 new OrbitingPlanet("planetTwo", "sun", 0.0025),
 new OrbitingPlanet("planetTwoMoon", "planetTwo", 0.02),
 new OrbitingPlanet("planetThree", "sun", 0.001),
 new OrbitingPlanet("planetThreeMoonOne", "planetThree", -0.005),
 new OrbitingPlanet("planetThreeMoonTwo", "planetThree", -0.005),
 new OrbitingPlanet("planetThreeMoonThree", "planetThree", -0.005),
 new OrbitingPlanet("planetThreeMoonFour", "planetThree", -0.005),
 new OrbitingPlanet("planetThreeMoonFive", "planetThree", -0.005),
 new OrbitingPlanet("planetThreeMoonSix", "planetThree", -0.005),
 new OrbitingPlanet("planetThreeMoonSeven", "planetThree", -0.005),
 new OrbitingPlanet("planetThreeMoonEight", "planetThree", -0.005),
 new OrbitingPlanet("planetThreeMoonNine", "planetThree", -0.005),
 new OrbitingPlanet("planetThreeMoonTen", "planetThree", -0.005),
 new OrbitingPlanet("planetThreeMoonEleven", "planetThree", -0.005),
 new OrbitingPlanet("planetThreeMoonTwelve", "planetThree", -0.005),    
 new OrbitingPlanet("planetFour", "sun", 0.0015),
 new OrbitingPlanet("planetFive", "sun", 0.0015)
]

function Animate(){
  for (let i = 0; i < planets.length; i++){
      planets[i].UpdatePlanet();
  }

  requestAnimationFrame(Animate);
}
Animate();