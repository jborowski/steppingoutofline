NSTC.Target = function(state, attachments){
  this.state = state;
  this.game = this.state.game;
  

  this.cVars = {
    positions: [],
    active: false,
    hit: false
  };
  this.attachments = attachments;

  this.inactiveGraphic = new Phaser.Graphics().beginFill(0xFF0000).drawRect(0,0,50,50);
  this.activeGraphic = new Phaser.Graphics().beginFill(0x00FF00).drawRect(0,0,50,50);
  this.hitGraphic = new Phaser.Graphics().beginFill(0x888888).drawRect(0,0,50,50);
  var firstLine = this.attachments[0].finger.line;
  var firstPosition = this.attachments[0].position
  Phaser.Sprite.call(this, this.game, firstLine.getPointAt(firstPosition).x, this.attachments[0].finger.y+50, this.inactiveGraphic.generateTexture());
  this.state.targets.add(this);
  this.anchor.setTo(0,0.5);


  this.cUpdate = function(){
  };
}

NSTC.Target.prototype = Object.create(Phaser.Sprite.prototype);
NSTC.Target.prototype.constructor = NSTC.Target;
