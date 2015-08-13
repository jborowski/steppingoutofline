NSTC.Finger = function(state, letter, line){
  this.state = state;
  this.game = this.state.game;
  var selectedGraphic = new Phaser.Graphics().beginFill(0x0000FF).drawCircle(0,0,50,50);
  Phaser.Sprite.call(this, this.game, line.cVars.x1, line.cVars.y1, selectedGraphic.generateTexture());
  this.state.fingers.add(this);

  this.cVars = {
    line: line,
    lineX: line.cVars.x1,
    lineY: line.cVars.y1,
    letter: letter,
    left: false,
    right: false
  };

  this.cUpdate = function(){
    // Reset values from last update
    this.cVars.success = false;

    if(this.game.keyManager.isHeld(letter)){
      if(this.game.keyManager.isPressed('left')){
        this.stepLeft(); 
      } else if(this.game.keyManager.isPressed('right')){
        this.stepRight(); 
      }
    }
    if(this.game.keyManager.isReleased("left") || this.game.keyManager.isReleased("right")){
      this.stepCenter();
    }
    if(this.game.keyManager.isReleased(this.cVars.letter)){
      this.stepCenter();
    }
  };

  this.stepRight = function(){
    this.cVars.left = false;
    this.cVars.right = true;
    this.x = this.cVars.lineX + 35;
  };

  this.stepLeft = function(){
    this.cVars.left = true;
    this.cVars.right = false;
    this.x = this.cVars.lineX - 35;
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

  this.updateScore = function(){
    if(this.cVars.left || this.cVars.right){
      if(this.cVars.success){
        this.state.score += 3;
      } else {
        this.state.score -= 1;
      }
    }
  };

  this.succeed = function(){
    this.cVars.success = true;
  };
}

NSTC.Finger.prototype = Object.create(Phaser.Sprite.prototype);
NSTC.Finger.prototype.constructor = NSTC.Finger;
