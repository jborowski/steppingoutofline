if(!NSTC){NSTC={};}
NSTC.StartMenu = function(game){};
NSTC.StartMenu.prototype = {
  // Settings
  create: function(){
    this.keyboard = this.game.input.keyboard;

    this.game.add.text(50, 50, "OUT_OF_LINE!", { fill: '#FFF' });
  },
  update: function(){
    if(this.keyboard.isDown(13)){
      alert("ENTER!");
    }
  }
}
