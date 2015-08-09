NSTC.Finger = function(state, x, y){
  this.state = state;
  this.game = this.state.game;
  var selectedGraphic = new Phaser.Graphics().beginFill(0x0000FF).drawCircle(0,0,50,50);
  Phaser.Sprite.call(this, this.game, x, y, selectedGraphic.generateTexture());
  this.state.fingers.add(this);

  this.cVars = {
    lineX: x,
    lineY: y
  }

  this.update = function(){
  }
}

NSTC.Finger.prototype = Object.create(Phaser.Sprite.prototype);
NSTC.Finger.prototype.constructor = NSTC.Finger;
