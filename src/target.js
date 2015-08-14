NSTC.Target = function(state, leftFinger, rightFinger, percentPosition){
  this.state = state;
  this.game = this.state.game;

  this.cVars = {
    position: leftFinger.line.getPositionAt(percentPosition),
    active: false,
    hit: false
  };

  this.leftFinger = leftFinger;
  this.rightFinger = rightFinger;

  this.inactiveGraphic = new Phaser.Graphics().beginFill(0xFF0000).drawCircle(0,0,50,50);
  this.activeGraphic = new Phaser.Graphics().beginFill(0x00FF00).drawCircle(0,0,50,50);
  this.hitGraphic = new Phaser.Graphics().beginFill(0x888888).drawCircle(0,0,50,50);
  Phaser.Sprite.call(this, this.game, this.leftFinger.line.path[this.cVars.position].x, leftFinger.y+50, this.inactiveGraphic.generateTexture());
  this.state.targets.add(this);
  this.anchor.setTo(0.5,0.5);


  this.cUpdate = function(){
    // If both fingers have passed us, become inactive
    if(this.leftFinger && (this.leftFinger.cVars.position > this.cVars.position)){
      this.kill();
    }
  };
}

NSTC.Target.prototype = Object.create(Phaser.Sprite.prototype);
NSTC.Target.prototype.constructor = NSTC.Target;
