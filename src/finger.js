NSTC.Finger = function(state, letter, line){
  this.state = state;
  this.game = this.state.game;
  this.idleGraphic = new Phaser.Graphics().beginFill(0x0000FF).drawCircle(0,0,50,50);
  this.hitGraphic = new Phaser.Graphics().beginFill(0x00FF44).drawCircle(0,0,50,50);

  this.cVars = {
    letter: letter,
    left: false,
    right: false,
    position: 0,
    onTarget: false
  };

  this.line = line;
  this.line.finger = this;

  Phaser.Sprite.call(this, this.game, this.line.path[0].x, this.line.path[0].y, this.idleGraphic.generateTexture());
  this.anchor.setTo(0.5,0.5);
  this.state.fingers.add(this);

  this.cUpdate = function(){
    // Reset values from last update
    this.cVars.onTarget = false;

    // Key Pressed
    if(this.game.keyManager.isHeld(letter)){
      if(this.game.keyManager.isHeld('left')){
        this.stepLeft(); 
      } else if(this.game.keyManager.isHeld('right')){
        this.stepRight(); 
      } else {
        this.stepCenter();
      }
    } else {
      this.stepCenter();
    }

    this.cVars.position = this.line.getPositionAt(this.state.music.currentTime/this.state.music.durationMS);

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
  };

  this.cPostUpdate = function(){
    if(this.cVars.left || this.cVars.right){
      if(this.cVars.onTarget){
        this.state.score += 1;
      } else {
        this.state.score -= 1;
      }
    }
    
    if(this.cVars.onTarget){
      this.texture = this.hitGraphic.generateTexture();
    } else {
      this.texture = this.idleGraphic.generateTexture();
    }
  };

  this.stepRight = function(){
    if(!this.cVars.right){
      this.cVars.left = false;
      this.cVars.right = true;
      this.x = this.cVars.lineX + 35;
    }
  };

  this.stepLeft = function(){
    if(!this.cVars.left){
      this.cVars.left = true;
      this.cVars.right = false;
    }
  };

  this.stepCenter = function(){
    if(this.cVars.left || this.cVars.right){
      this.cVars.left = false;
      this.cVars.right = false;
    }
  };

  this.isRight = function(){
    return this.cVars.right;
  };

  this.isLeft = function(){
    return this.cVars.left;
  };

  this.onTarget = function(){
    this.cVars.onTarget = true;
  };
}

NSTC.Finger.prototype = Object.create(Phaser.Sprite.prototype);
NSTC.Finger.prototype.constructor = NSTC.Finger;
