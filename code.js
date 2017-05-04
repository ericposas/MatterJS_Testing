window.onload = function(){
  appendStats();
  createWorldObjects();
  init();
  startEngine([boxA, ground, leftwall, rightwall, platform1, platform2, platform3]);
  keys();
  
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
  ground = Matter.Bodies.rectangle(800,610,1620,60,{
    id: 'ground',
    isStatic: true,
    render: {
      fillStyle: '#666'
    }
  });
  platform1 = Matter.Bodies.rectangle(600, 400, 800, 40, {
    id: 'platform1',
    isStatic: true,
    render: {
      fillStyle: '#666'
    }
  });
  platform2 = Matter.Bodies.rectangle(1000, 200, 120, 40, {
    id: 'platform2',
    isStatic: true,
    render: {
      fillStyle: '#666'
    }
  });
  platform3 = Matter.Bodies.rectangle(500, 260, 80, 40, {
    id: 'platform3',
    isStatic: true,
    render: {
      fillStyle: '#666'
    }
  });
  //move platform3 up and down 
  /* TweenLite.delayedCall(2, function(){
    var y_pos = platform3.position.y;
    TweenLite.to(platform3.position, 10, { y:y_pos });
    y_pos-=0.05;
    Matter.Body.translate(platform3, { x:platform3.position.x, y:y_pos });
  }); */
  
  leftwall = Matter.Bodies.rectangle(-20,200,40,800, {
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
}

function startEngine(arr){
  // add all of the bodies to the world
  World.add(engine.world, arr);
  // run engine
  Engine.run(engine);
  
  gameLoop();
  function gameLoop(){
    //ad stats to game loop
    stats.begin();
    testKeys();
    movePlatform();
    //testWallTouch();
    Engine.update(engine, 1000/60, 1);
    stats.end();
    requestAnimationFrame(gameLoop);
  }
  function testKeys(){
    var platforms = [platform1, platform2, platform3];
    if(keyspressed.rightarrow == true){
      moveBodiesLeft(platforms);
    }
    if(keyspressed.leftarrow == true){
      moveBodiesRight(platforms);
    }
  }
}

setInterval(switchPlatformDirection, 3000);

function switchPlatformDirection(){
  if(moveupwards == true){
    moveupwards = false;
  }else{
    moveupwards = true;
  }
}

function movePlatform(){
  if(moveupwards == false){
    Matter.Body.translate(platform3, { x:0, y:0.5 }); 
  }else{
    Matter.Body.translate(platform3, { x:0, y:-0.5 });
  }
}

function moveBodiesLeft(bodies){
  accelerate();
  for(var i = 0; i < bodies.length; i++){
    Matter.Body.translate(bodies[i], { x:(-1*rate), y:0 });
  }
}

function moveBodiesRight(bodies){
  accelerate();
  for(var i = 0; i < bodies.length; i++){
    Matter.Body.translate(bodies[i], { x:rate, y:0 });
  }
}

