NSTC.Target = function(state, leftFinger, rightFinger, timer, x, y){
  this.state = state;
  this.game = this.state.game;
  this.inactiveGraphic = new Phaser.Graphics().beginFill(0xFF0000).drawCircle(0,0,50,50);
  this.activeGraphic = new Phaser.Graphics().beginFill(0x00FF00).drawCircle(0,0,50,50);
  this.hitGraphic = new Phaser.Graphics().beginFill(0x888888).drawCircle(0,0,50,50);
  Phaser.Sprite.call(this, this.game, x, y, this.inactiveGraphic.generateTexture());
  this.state.targets.add(this);

  this.cVars = {
    leftFinger: leftFinger,
    rightFinger: rightFinger,
    timer: timer,
    active: false,
    hit: false
  };

  this.update = function(){
    // If inactive, see if we should become active yet
    if(!this.cVars.active && this.cVars.timer < this.state.music.currentTime){
      this.cVars.active = true;
      this.texture = this.activeGraphic.generateTexture();
    }

    // If active, see if we're being touched by any fingers
    if(this.cVars.active && !this.cVars.hit){
      if(this.cVars.leftFinger.isRight() || this.cVars.rightFinger.isLeft()){
        this.cVars.hit = true;
        this.kill();
      }
    }

    if(this.cVars.hit && this.cVars.timer > this.state.music.currentTime){
      this.texture = this.inactiveGraphic.generateTexture();
      this.cVars.hit = false;
      this.cVars.active = false;
      this.revive();
    }
  };
}

NSTC.Target.prototype = Object.create(Phaser.Sprite.prototype);
NSTC.Target.prototype.constructor = NSTC.Target;
