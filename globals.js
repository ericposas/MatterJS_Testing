// Global Matter.js World variables
var body, Engine, Render, World, Bodies, Composite, Composites, Constraint, Mouse, MouseConstraint, Events, Runner, engine, render;
// Mouse 
var mouseConst;
// Bodies are globally set 
var boxA, boxB, ground, leftwall, rightwall;
// keyspressed 
var keyspressed = {
  rightarrow : false,
  leftarrow : false
};
var stats;

/* var box = {
  isJumping : false
} */

/* TweenLite.delayedCall(3, function(){
  alert(boxA.position.y);
}); */