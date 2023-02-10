/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE; //60 fps
  var BOARD_WIDTH = $("#board").width(); //its the maximum X-coordinate on screen
  var BOARD_HEIGHT = $(window).height();
  var KEY = {
    "LEFT": 37,
    "RIGHT": 39,
    "UP": 38,
    "DOWN": 40
  }

  var positionX = 0;
  var positionY = 0;
  var speedX = 0;
  var speedY = 0;

  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    //updates gameitem's postion
    //checks for collisions
    repositionBox();
  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    //press up key to move the box in -Y direction
    //press down key to move the box in +Y direction
    //press left for -X and right for +X
    //console.log(event.which); //shows which key triggered even
    changeSpeedX(-5, event.which, KEY.LEFT);
    changeSpeedX(5, event.which, KEY.RIGHT);
    changeSpeedY(-5, event.which, KEY.UP);
    changeSpeedY(5, event.which, KEY.DOWN);
    //Moves the box using helper function
    /*
    if (event.which === KEY.LEFT) {
      //console.log("left arrow pressed");
      speedX = -5;
    }
    if (event.which === KEY.UP) {
     // console.log("right arrow pressed");
      speedY= -5;
    }
    if (event.which === KEY.RIGHT) {
      //console.log("up arrow pressed");
      speedX = 5;
    }
    if (event.which === KEY.DOWN) {
      //console.log("down arrow pressed");
      speedY = 5;
    }
    */
  }
  function handleKeyUp(event) {
    changeSpeedX(0, event.which, KEY.LEFT);
    changeSpeedX(0, event.which, KEY.RIGHT);
    changeSpeedY(0, event.which, KEY.UP);
    changeSpeedY(0, event.which, KEY.DOWN);
    /*if (event.which === KEY.LEFT) {
      speedX = 0;
    }
    if (event.which === KEY.UP) {
      speedY= 0;
    }
    if (event.which === KEY.RIGHT) {
      speedX = 0;
    }
    if (event.which === KEY.DOWN) {
      speedY = 0;
    }
    */
    //Stops the box from moving after you let go of key using helper functions
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function repositionBox() {
    //changes X location
    positionX += speedX; //updates the X
    $("#walker").css("left", positionX); //redraws it to new X
    //changes Y location
    positionY += speedY;  //updates the Y
    $("#walker").css("top", positionY); //redraws it to new Y
  }

  function changeSpeedX(newSpeed, keycode, arrowKey) {
    if (keycode === arrowKey) {
      speedX = newSpeed;
    }
  }

  function changeSpeedY(newSpeed, keycode, arrowKey) {
    if (keycode === arrowKey) {
      speedY = newSpeed;
    }
  }
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

}
