NSTC.Score = function(game){};
NSTC.Score.prototype = {
  init: function(levelResults){
    this.definition = levelResults;
  },
  create: function(){
    this.game.add.text(50, 50, this.definition.name, { fill: '#FFF' });
    this.scoreDisplay = this.game.add.text(500, 50, "SCORE: "+this.definition.score, { fill: '#FFF' });
    this.hitDisplay = this.game.add.text(400, 150, "SCORE: "+this.definition.hit+"/"+this.definition.total, { fill: '#FFF' });
  },
  update: function(){
    this.game.keyManager.update();
    if(this.game.keyManager.isReleased('enter')){
      this.state.start('StartMenu');
    }
  },
}
