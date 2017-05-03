var spacebar = 32, leftarrow = 37, rightarrow = 39, uparrow = 38, downarrow = 40;


function addKeys(){
  document.body.addEventListener('keypress', function(e){
    //comment("spacebar pressed.");
    if(e.keyCode == spacebar && ((boxA.position.y > 552) || (boxA.render.fillStyle == '#FF0000'))){
      // jump
      Matter.Body.applyForce(boxA, boxA.position, { x:0, y:-0.05 });
    }
  });
  // ARROW KEYS
  document.body.addEventListener('keydown', function(e){
    // right
    if(e.keyCode == rightarrow){
      keyspressed.rightarrow = true;
      //comment('right arrow key is down.');
    }
    // left
    if(e.keyCode == leftarrow){
      keyspressed.leftarrow = true;
      //comment('left arrow key is down.');
    }
  });
  document.body.addEventListener('keyup', function(e){
    // right
    if(e.keyCode == rightarrow){
      keyspressed.rightarrow = false;
    }
    // left
    if(e.keyCode == leftarrow){
      keyspressed.leftarrow = false;
    }
  });
}

