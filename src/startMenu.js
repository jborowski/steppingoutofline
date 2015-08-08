SAGDX.StartMenu = function(game){};
SAGDX.StartMenu.prototype = {
  // Settings
  timeMultiplier: 400,

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
