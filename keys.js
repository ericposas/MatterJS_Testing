var spacebar = 32, leftarrow = 37, rightarrow = 39, uparrow = 38, downarrow = 40;


function keys(){
  document.body.addEventListener('keypress', function(e){
    //comment("spacebar pressed.");
    if(e.keyCode == spacebar && ((boxA.position.y > 552) || (boxA.render.fillStyle == '#FF0000'))){ //fillStyle '#FF0000' indicates touching a surface 
      if(touchingWall == false){
        // jump
        Matter.Body.applyForce(boxA, boxA.position, { x:0, y:-0.075 });
      }
    }
  });
  // ARROW KEYS
  addKeys();
}

function keydowns(e){
  // right
  if(e.keyCode == rightarrow){
    keyspressed.rightarrow = true;
  }
  // left
  if(e.keyCode == leftarrow){
    keyspressed.leftarrow = true;
  }
}

function keyups(e){
  // right
  if(e.keyCode == rightarrow){
    keyspressed.rightarrow = false;
    decelerate();
  }
  // left
  if(e.keyCode == leftarrow){
    keyspressed.leftarrow = false;
    decelerate();
  }
}

function addKeys(){
  document.body.addEventListener('keydown', keydowns);
  document.body.addEventListener('keyup', keyups);
}

function removeKeys(){
  document.body.removeEventListener('keydown', keydowns);
  document.body.removeEventListener('keyup', keyups);
}