NSTC.Target = function(state, leftFinger, rightFinger, timer, x, y){
  this.state = state;
  this.game = this.state.game;
  this.inactiveGraphic = new Phaser.Graphics().beginFill(0xFF0000).drawCircle(0,0,50,50);
  this.activeGraphic = new Phaser.Graphics().beginFill(0x00FF00).drawCircle(0,0,50,50);
  this.hitGraphic = new Phaser.Graphics().beginFill(0x888888).drawCircle(0,0,50,50);
  Phaser.Sprite.call(this, this.game, x, y, this.inactiveGraphic.generateTexture());
  this.state.fingers.add(this);

  this.cVars = {
    leftFinger: leftFinger,
    rightFinger: rightFinger,
    timer: timer,
    active: false,
    hit: false
  };

  this.update = function(){
    // If inactive, see if we should become active yet
    if(!this.cVars.active && this.cVars.timer < this.game.time.now){
      this.cVars.active = true;
      this.texture = this.activeGraphic.generateTexture();
    }

    // If active, see if we're being touched by any fingers
    if(this.cVars.active && !this.cVars.hit){
      if(this.cVars.leftFinger.isRight() || this.cVars.rightFinger.isLeft()){
        this.cVars.hit = true;
        this.texture = this.hitGraphic.generateTexture();
      }
    }
  };
}

NSTC.Target.prototype = Object.create(Phaser.Sprite.prototype);
NSTC.Target.prototype.constructor = NSTC.Target;
