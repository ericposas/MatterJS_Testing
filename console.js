function createConsole(){
  var contit = document.createElement('div');
  contit.id = 'console-title';
  document.body.appendChild(contit);
  contit.innerHTML = "Console:";
  var win = document.createElement('div');
  document.body.appendChild(win);
  win.id = 'window';
  var con = document.createElement('div');
  document.getElementById('window').appendChild(con);
  con.id = 'console';
}

function comment(msg){
  var comment = document.createElement('div');
  document.getElementById('console').appendChild(comment);
  comment.innerHTML = msg;
  comment.classList.add('comment');
}
