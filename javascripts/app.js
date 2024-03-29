// Rover Object Goes Here
// ======================

// ======================

function Rover(initialDirection, initialPosition, manager) {
  this.direction =  initialDirection;
  this.position = initialPosition;
  this.travelLog = [initialPosition]
  this.turnLeft = function(){
    console.log("turnLeft was called!");
    switch(this.direction) {
      case("N"):
        this.direction = "W"
        break;
      case("W"):
        this.direction = "S"
        break;
      case("S"):
        this.direction = "E";
        break;
      case("E"):
        this.direction = "N"
        break;
    }
  }
  this.turnRight = function(){
    console.log("turnRight was called!");
    switch(this.direction) {
      case("N"):
        this.direction = "E"
        break;
      case("E"):
        this.direction = "S"
        break;
      case("S"):
        this.direction = "W";
        break;
      case("W"):
        this.direction = "N"
        break;
    }
  }
  this.moveForward = function(){
    console.log("moveForward was called")
    switch(this.direction) {
      case("N"):
        if(this.position[1] + 1 > 9) {
          console.log("No can do sir");
          return;
        }
        else this.position[1]++;
        break;
      case("E"):
        if(this.position[0] + 1 > 9) {
          console.log("No can do sir");
          return;
        }
        else this.position[0]++;
        break;
      case("S"):
        if(this.position[1] - 1 < 0) {
          console.log("No can do sir");
          return;
        }
        else this.position[1]--;
        break;
      case("W"):
        if(this.position[0] - 1 < 0) {
          console.log("No can do sir");
          return;
        }
        else this.position[0]--;
        break;
    }
  
    this.travelLog.push(this.position);
    manager.checkForObstacleCollision(this); // calling the method of rovermanager
    manager.checkForRoverCollision(rover1, rover2) // calling the method of rovermanager
  }
  this.moveBackwards = function(){
    console.log("move backwards was called")
    switch(this.direction) {
      case("N"):
        if(this.position[1] - 1 < 0) {
          console.log("No can do sir");
          return;
        }
        else this.position[1]--;
        break;
      case("E"):
        if(this.position[0] - 1 < 0) {
          console.log("No can do sir");
          return;
        }
        else this.position[0]--;
        break;
      case("S"):
        if(this.position[1] + 1 > 9) {
          console.log("No can do sir");
          return;
        }
        else this.position[1]++;
        break;
      case("W"):
        if(this.position[0] + 1 > 9) {
          console.log("No can do sir");
          return;
        }
        else this.position[0]++;
        break;
    }
    this.travelLog.push(this.position);  
    manager.checkForObstacleCollision(this); // calling the method of rovermanager
    manager.checkForRoverCollision(rover1, rover2) // calling the method of rovermanager
  }
  this.instructRover = function(stringOfCommands) {
    stringOfCommands = stringOfCommands.toLowerCase()
    let commands = "frlb";
    for(var i = 0; i < stringOfCommands.length; i++) {
      if(!commands.includes(stringOfCommands[i])) {
        console.log("INVALID INPUT")
        return;
      }
      switch(stringOfCommands[i]) {
        case("f"):
          this.moveForward();
          break;
        case("l"):
          this.turnLeft();
          break;
        case("r"):
          this.turnRight();
          break;
        case("b"):
          this.moveBackwards();
          break;
      }
    }
  }
}

var rover1 = new Rover("N", [4,4])
var rover2 = new Rover("W", [4,8])
var rover3 = new Rover("W", [5,8])

/* The rover manager is aware of all the rovers and the obstacles
  an instance of rover manager is also passed to the rovers so that the rovers can
  call the collision detection functions every time they move
*/
function RoverManager(obstacles){
  this.rovers = [] //added dynamically through the addRover method
  this.obstacles = obstacles;
  this.checkForObstacleCollision = function(rover) {
    for(let i = 0; i<this.obstacles.length; i++) {
      if(this.obstacles[i][0] === rover.position[0] 
        && this.obstacles[i][1] === rover.position[1]) alert("Obstacle BOEM!");
    }
  }
  this.checkForRoverCollision = function(rover){
    for(let i = 0; i < this.rovers.length; i++) {
      if(this.rovers[i].position[0] === rover.position[0] 
        && this.rovers[i].position[1] === rover.position[1]
        && rover !== this.rovers[i] )alert("Rover BOEM!");
    }
  }
  this.addRover = function(rover) {
    this.rovers.push(rover);
  }
}
var roverManager = new RoverManager([[3,3], [6,7]]);
var rover1 = new Rover("N", [5,5], roverManager)
var rover2 = new Rover("N", [9,5], roverManager)
roverManager.addRover(rover1);
roverManager.addRover(rover2);

/* Test the code */
rover1.instructRover("rffff"); // should alert rover BOEM!
rover1.instructRover("llffffrbblff"); // should alert obstacle BOEM!
rover2.instructRover("lfffrff") // should also alert obstacle BOEM!
