NSTC.Level = function(game){};
NSTC.Level.prototype = {
  init: function(levelDefinition){
    this.definition = levelDefinition;
  },
  create: function(){
    this.fingers = this.game.add.group();

    this.oneFinger = new NSTC.Finger(this, 280, 400, 'a');
    this.twoFinger = new NSTC.Finger(this, 350, 400, 's');
    this.threeFinger = new NSTC.Finger(this, 420, 400, 'd');

    this.game.add.text(50, 50, this.definition.text, { fill: '#FFF' });
  },
  update: function(){
    this.game.keyManager.update();

    if(this.game.keyManager.isReleased('enter')){
      this.state.start('StartMenu');
    }
  },
}
