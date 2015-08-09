NSTC.Finger = function(state, x, y, letter){
  this.state = state;
  this.game = this.state.game;
  var selectedGraphic = new Phaser.Graphics().beginFill(0x0000FF).drawCircle(0,0,50,50);
  Phaser.Sprite.call(this, this.game, x, y, selectedGraphic.generateTexture());
  this.state.fingers.add(this);

  this.cVars = {
    lineX: x,
    lineY: y,
    letter: letter,
    left: false,
    right: false
  };

  this.update = function(){
    if(this.game.keyManager.isHeld(letter)){
      if(this.game.keyManager.isPressed('left')){
        this.stepLeft(); 
      } else if(this.game.keyManager.isPressed('right')){
        this.stepRight(); 
      }
    }
    if(this.game.keyManager.isReleased("left") || this.game.keyManager.isReleased("right")){
      this.stepCenter()
    }
    if(this.game.keyManager.isReleased(this.cVars.letter)){
      this.stepCenter()
    }
  };

  this.stepRight = function(){
    this.cVars.left = false;
    this.cVars.right = true;
    this.x = this.cVars.lineX + 30;
  };

  this.stepLeft = function(){
    this.cVars.left = true;
    this.cVars.right = false;
    this.x = this.cVars.lineX - 30;
  };

  this.stepCenter = function(){
    this.cVars.left = false;
    this.cVars.right = false;
    this.x = this.cVars.lineX;
  };

  this.isRight = function(){
    return this.cVars.right;
  };

  this.isLeft = function(){
    return this.cVars.left;
  };
}

NSTC.Finger.prototype = Object.create(Phaser.Sprite.prototype);
NSTC.Finger.prototype.constructor = NSTC.Finger;
