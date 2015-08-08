NSTC.StartMenu = function(game){};
NSTC.StartMenu.prototype = {
  create: function(){
    this.game.add.text(50, 50, "OUT_OF_LINE!", { fill: '#FFF' });
  },
  update: function(){
    if(this.game.input.keyboard.isDown(13)){
      this.state.start('Level', true, false, {text: "A level from data!"});
    }
  }
}
