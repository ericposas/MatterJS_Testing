window.onload = function(){
  appendStats();
  createWorldObjects();
  init();
  startEngine([boxA, boxB, ground, leftwall, rightwall, boxC]);  //, mouseConst]);
  //applyForcesToSmallBox();
  keys();
  //alert('boxA: ' + boxA.id + ', boxB: ' + boxB.id);
  
  //create a console on the page so I don't have to 'inspect' via the browser for console.log statement
  createConsole();
}


function createWorldObjects(){
  // create two boxes and a ground
  boxA = Matter.Bodies.rectangle(400,400,40,40, {
    inertia: Infinity, //<--- set 'inertia' to 'Infinity' to prevent rotation of box(character)
    id: 'smBox',
    render: {
      fillStyle: '#666',
      sprite: {
        xScale:0.4,
        yScale:0.4,
        texture: 'box.min.jpg'
      }
    }
  });
  //boxA.render.sprite.texture = "box.jpg";
  boxB = Matter.Bodies.rectangle(430,0,80,80, {
    id: 'lgBox',
    render: {
      fillStyle: '#666',
      sprite: {
        xScale:0.8,
        yScale:0.8,
        texture: 'box.min.jpg'
      }
    }
  });
  boxC = Matter.Bodies.rectangle(630,0,100,100, {
    id: 'lgBox2',
    render: {
      fillStyle: '#666',
      sprite: {
        xScale:1.0,
        yScale:1.0,
        texture: 'box.min.jpg'
      }
    }
  });
  ground = Matter.Bodies.rectangle(800,610,1620,60,{
    id: 'ground',
    isStatic:true,
    render: {
      fillStyle: '#666'
    }
  });
  leftwall = Matter.Bodies.rectangle(0,200,40,800, {
    id: 'leftwall',
    isStatic:true,
    render: {
      fillStyle: '#666'
    }
  });
  rightwall = Matter.Bodies.rectangle(1600,200,40,800, {
    id: 'rightwall',
    isStatic:true,
    render: {
      fillStyle: '#666'
    }
  });
}

// Initializer for Matter.js world 
function init(){
  body = document.querySelector('body');
  // module aliases
  Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Composites = Matter.Composites,
  Constraint = Matter.Constraint,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint,
  Events = Matter.Events;
  
  // create an engine
  engine = Engine.create(
      body,{
        density: 0.0005,
        frictionAir: 0.06,
        restitution: 0.3,
        friction: 0.3,
        render: {
          options: {
            showAngleIndicator: false,
            isStatic: true,
            wireframes: false,
            visible: false
        }
      }
    }
  );
  
  Events.on(engine, 'collisionStart', function(e){
    var pairs = e.pairs;
    // change obj col to show those starting a collision
    for(var i = 0; i < pairs.length; i++){
      var pair = pairs[i];
      pair.bodyA.render.fillStyle = '#FF0000';
      pair.bodyB.render.fillStyle = '#FF0000';
      if(pair.bodyA.id == 'lgBox'){
        comment("you've touched the bigger box.");
      }
      switch (pair.bodyA.id){
        case 'leftwall':
          if(pair.bodyB.id == 'smBox'){
            touchingWall = true;
            comment("you're touching the " + pair.bodyA.id + ".");
            // rebound char/box if hitting a wall
            Matter.Body.applyForce(boxA, boxA.position, { x:0.25, y:0 });
          }
          break;
        case 'rightwall':
          if(pair.bodyB.id == 'smBox'){
            touchingWall = true;
            comment("you're touching the " + pair.bodyA.id + ".");
            Matter.Body.applyForce(boxA, boxA.position, { x:-0.25, y:0 });
          }
          break;
        default:
          touchingWall = false;
      }
    }
  });
  
  Events.on(engine, 'collisionEnd', function(e){
    var pairs = e.pairs;
    // change obj col to show those starting a collision
    for(var i = 0; i < pairs.length; i++){
      var pair = pairs[i];
      pair.bodyA.render.fillStyle = '#666';
      pair.bodyB.render.fillStyle = '#666';
      // testing for end of wall collision 
      switch (pair.bodyA.id){
        case 'leftwall':
          if(pair.bodyB.id == 'smBox'){
            touchingWall = false;
          }
          break;
        case 'rightwall':
          if(pair.bodyB.id == 'smBox'){
            touchingWall = false;
          }
          break;
        default:
          touchingWall = false;
      }
    }
  });
  
  // added a mouse constraint.. meaning, we can now interact with objects, pick them up, etc. 
  /*mouseConst = MouseConstraint.create(engine, {
    mouse: Mouse.create(body),
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false
      }
    }
  });*/
}

function startEngine(arr){
  // add all of the bodies to the world
  World.add(engine.world, arr);
  // run engine
  Engine.run(engine);
  // create a runner
  //Runner.run(runner, engine);
  gameLoop();
  function gameLoop(){
    //ad stats to game loop
    stats.begin();
    testKeys();
    //testWallTouch();
    Engine.update(engine, 1000/60, 1);
    stats.end();
    requestAnimationFrame(gameLoop);
  }
  function testKeys(){
    if(keyspressed.rightarrow == true){
      moveBodiesLeft();
    }
    if(keyspressed.leftarrow == true){
      moveBodiesRight();
    }
  }
}

function moveBodiesLeft(){
  //if(leftwall.position.x < leftMostPosition){
    accelerate();
    Matter.Body.translate(leftwall, { x:(-1*rate), y:0 });
    Matter.Body.translate(boxB, { x:(-1*rate), y:0 });
    Matter.Body.translate(boxC, { x:(-1*rate), y:0 });
    Matter.Body.translate(ground, { x:(-1*rate), y:0 });
    Matter.Body.translate(rightwall, { x:(-1*rate), y:0 });
  //}
}

function moveBodiesRight(){
  //if(rightwall.position.x > rightMostPosition){
    accelerate();
    Matter.Body.translate(leftwall, { x:rate, y:0 });
    Matter.Body.translate(boxB, { x:rate, y:0 });
    Matter.Body.translate(boxC, { x:rate, y:0 });
    Matter.Body.translate(ground, { x:rate, y:0 });
    Matter.Body.translate(rightwall, { x:rate, y:0 });
  //}
}

setInterval(function(){
  comment('Left wall position x: ' + leftwall.position.x);
  comment('Right wall position x: ' + rightwall.position.x);
}, 1000);

/* function applyForcesToSmallBox(){
  TweenLite.delayedCall(2.5, function(){
    //alert(boxA.position.x + ', ' + boxA.position.y);
    Matter.Body.applyForce(boxA, boxA.position, { x:0.15, y:0.05 });
  });
  
  TweenLite.delayedCall(3, function(){
    //alert(boxA.position.x + ', ' + boxA.position.y);
    Matter.Body.rotate(boxA,60);
    Matter.Body.applyForce(boxA, boxA.position, { x:0.1, y:-0.1 });
  });
  
  TweenLite.delayedCall(3.5, function(){
    Matter.Body.applyForce(boxA, boxA.position, { x:0, y:0.15 });
  });
  
  TweenLite.delayedCall(5, function(){
    
  });
} */

/* function moveSmBox(){
  Matter.Body.applyForce(boxA, boxA.position, { x:0.01, y:0.1 });
} */


