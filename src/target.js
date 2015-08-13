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
    /*
    // If active, see if we're being touched by any fingers
    if(this.cVars.active && !this.cVars.hit){
      if(this.cVars.leftFinger.isRight()){
        this.cVars.leftFinger.succeed();
        this.cVars.hit = true;
        this.kill();
      } else if(this.cVars.rightFinger.isLeft()){
        this.cVars.rightFinger.succeed();
        this.cVars.hit = true;
        this.kill();
      }
    }

    if(this.cVars.hit && this.cVars.timer > this.state.music.currentTime){
      this.texture = this.inactiveGraphic.generateTexture();
      this.cVars.hit = false;
      this.cVars.active = false;
      this.revive();
    }*/
  };
}

NSTC.Target.prototype = Object.create(Phaser.Sprite.prototype);
NSTC.Target.prototype.constructor = NSTC.Target;
