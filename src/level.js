NSTC.Level = function(game){};
NSTC.Level.prototype = {
  init: function(levelDefinition){
    this.definition = levelDefinition;
  },
  create: function(){
    this.game.add.text(50, 50, this.definition.text, { fill: '#FFF' });
  },
  update: function(){
    if(this.game.input.keyboard.isDown(13)){
      this.state.start('StartMenu');
    }
  },
}
