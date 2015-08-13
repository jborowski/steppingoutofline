NSTC.Finger = function(state, letter, line){
  this.state = state;
  this.game = this.state.game;
  var selectedGraphic = new Phaser.Graphics().beginFill(0x0000FF).drawCircle(0,0,50,50);

  this.cVars = {
    letter: letter,
    left: false,
    right: false,
    position: 0
  };

  this.line = line;
  this.line.finger = this;

  Phaser.Sprite.call(this, this.game, this.line.path[0].x, this.line.path[0].y, selectedGraphic.generateTexture());
  this.anchor.setTo(0.5,0.5);
  this.state.fingers.add(this);

  this.cUpdate = function(){
    // Reset values from last update
    this.cVars.success = false;

    ///
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
    
    // Move along path
    if(this.cVars.left){
      this.x = this.line.path[this.cVars.position].x;
      this.y = this.line.path[this.cVars.position].y-50;
    } else if(this.cVars.right){
      this.x = this.line.path[this.cVars.position].x;
      this.y = this.line.path[this.cVars.position].y+50;
    } else {
      this.x = this.line.path[this.cVars.position].x;
      this.y = this.line.path[this.cVars.position].y;
    }

    this.cVars.position++;
    if (this.cVars.position >= this.line.path.length){
      this.cVars.position = 0;
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
  };

  this.stepCenter = function(){
    this.cVars.left = false;
    this.cVars.right = false;
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
