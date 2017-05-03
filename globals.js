// Global Matter.js World variables
var body, Engine, Render, World, Bodies, Composite, Composites, Constraint, Mouse, MouseConstraint, Events, Runner, engine, render;
// Mouse 
var mouseConst;
// Bodies are globally set 
var boxA, boxB, ground, leftwall, rightwall, boxC;

// keyspressed 
var keyspressed = {
  rightarrow : false,
  leftarrow : false
};
// touching wall
var touchingWall = false;
var stats;

// accelleration
var rate = 1, maxrate = 10, accel = 0.25;
function accelerate(){
  if(rate < maxrate){
    rate+=accel;
  }else{
    //comment('reached max rate of ' + maxrate);
  }
}
function decelerate(){
  rate = 1;
}
// wall positions for world scrolling 
var leftMostPosition = 200, rightMostPosition = 600;


/* var box = {
  isJumping : false
} */

/* TweenLite.delayedCall(3, function(){
  alert(boxA.position.y);
}); */