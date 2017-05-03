function appendStats(){
  stats = new Stats();
  stats.showPanel(1);
  document.body.appendChild(stats.dom);
  stats.dom.id = 'stats';
}