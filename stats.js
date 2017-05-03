function appendStats(){
  stats = new Stats();
  stats.showPanel(0);
  document.body.appendChild(stats.dom);
  stats.dom.id = 'stats';
}