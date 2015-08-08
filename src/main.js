var width = 740;
var height = 560;

window.onload = function(){
  var game = new Phaser.Game(width, height, Phaser.CANVAS, document.getElementById("main"));

  game.state.add('Boot', SAGDX.Boot);
  game.state.add('Preloader', SAGDX.Preloader);
  game.state.add('StartMenu', SAGDX.StartMenu);
  //game.state.add('Level', SAGDX.Level);
  //game.state.add('Result', SAGDX.Result);
  game.state.start('Boot');
}
