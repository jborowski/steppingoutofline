window.onload = function(){
  var game = new Phaser.Game(width, height, Phaser.CANVAS, document.getElementById("main"));

  game.state.add('Boot', NSTC.Boot);
  game.state.add('Preloader', NSTC.Preloader);
  game.state.add('StartMenu', NSTC.StartMenu);
  game.state.add('Level', NSTC.Level);
  game.state.start('Boot');
}
