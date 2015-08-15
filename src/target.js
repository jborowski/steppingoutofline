NSTC.Target = function(state, attachments){
  this.state = state;
  this.game = this.state.game;
  
  this.cVars = {
    positions: [],
    active: false,
    hitBy: null
  };
  this.attachments = attachments;

  this.inactiveGraphic = new Phaser.Graphics().beginFill(0xFF0000).drawRect(0,0,50,50);
  this.activeGraphic = new Phaser.Graphics().beginFill(0x00FF00).drawRect(0,0,50,50);
  this.hitGraphic = new Phaser.Graphics().beginFill(0x888888).drawRect(0,0,50,50);
  var firstLine = this.attachments[0].finger.line;
  var firstPoint = firstLine.getPointAt(this.attachments[0].position);
  Phaser.Sprite.call(this, this.game, firstPoint.x, firstPoint.y+50, this.inactiveGraphic.generateTexture());
  this.state.targets.add(this);
  this.anchor.setTo(0,0.5);
  this.box = new Phaser.Rectangle(firstPoint.x, firstPoint.y+40, 50, 20);


  this.cUpdate = function(){
    for(var ii=0;ii<this.attachments.length;ii+=1){
      var attachment = this.attachments[ii];
      if(Phaser.Rectangle.containsPoint(this.box, attachment.finger)){
        attachment.finger.onTarget();
      }
    }
  };
}

NSTC.Target.prototype = Object.create(Phaser.Sprite.prototype);
NSTC.Target.prototype.constructor = NSTC.Target;
