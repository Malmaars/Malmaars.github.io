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

        this.orbitingRef = $("#" + orbitingElementName);
        var orbitOffset = this.orbitingRef.position();
        
        this.distance = Math.sqrt(Math.pow(offset.left - orbitOffset.left, 2) + Math.pow(offset.top - orbitOffset.top, 2));
        this.radians = Math.atan2(offset.top - orbitOffset.top, offset.left - orbitOffset.left);
    }

    //get the distance between the planet and what it orbits

    UpdatePlanet(){
        this.OrbitPlanet();
    }

    OrbitPlanet() {

        //I can make something orbit by fetching the center. I can determine position by its radians
        var orbitOffset = this.orbitingRef.position();
        this.orbitingPosition = new vector2(orbitOffset.left, orbitOffset.top);

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
        xPos += orbitCenter.x + xPos * distance;
        yPos += orbitCenter.y + yPos * distance;

    
        return new vector2(xPos, yPos);
    }
    
    //element is the element we want to set the position of, the position is a vector2 
    SetPosition(element, newPosition){
        element.left = newPosition.x + "px";
        element.top = newPosition.y + "px";
    }

}

const planets = [
   new OrbitingPlanet("planetOne", "sun", 0.005), 
   new OrbitingPlanet("planetTwo", "sun", 0.0025),
   new OrbitingPlanet("planetTwoMoon", "planetTwo", -0.01),
   new OrbitingPlanet("planetTwoMoonOrbit", "planetTwo", 0),
   new OrbitingPlanet("planetThree", "sun", 0.001),
   new OrbitingPlanet("planetThreeMoonOne", "planetThree", 0.01),
   new OrbitingPlanet("planetThreeMoonTwo", "planetThree", 0.01),
   new OrbitingPlanet("planetThreeMoonThree", "planetThree", 0.01),
   new OrbitingPlanet("planetThreeMoonFour", "planetThree", 0.01),
   new OrbitingPlanet("planetThreeMoonFive", "planetThree", 0.01),
   new OrbitingPlanet("planetThreeMoonSix", "planetThree", 0.01),
   new OrbitingPlanet("planetThreeMoonOrbit", "planetThree", 0),
   new OrbitingPlanet("planetFour", "sun", 0.0015),
   new OrbitingPlanet("planetFive", "sun", 0.0015)
]

function Start(){
    //initialize everything here
}

//setInterval(Update, 10);

function Update(){
    
}

function Animate(){
    for (let i = 0; i < planets.length; i++){
        planets[i].UpdatePlanet();
    }

    requestAnimationFrame(Animate);
}
Animate();



