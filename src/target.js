NSTC.Target = function(state, length, attachments){
  this.state = state;
  this.game = this.state.game;
  
  this.cVars = {
    positions: [],
    hit: false,
    passed: 0,
    dead: false
  };
  this.attachments = attachments;

  this.openGraphic = new Phaser.Graphics().beginFill(0xBB0022).drawRect(0,0,length,50);
  this.deadGraphic = new Phaser.Graphics().beginFill(0x222222).drawRect(0,0,length,50);
  this.passGraphic = new Phaser.Graphics().beginFill(0xFFFFFF).drawRect(0,0,length,50);
  this.hitGraphic = new Phaser.Graphics().beginFill(0xFF3399).drawRect(0,0,length,50);
  var firstLine = this.attachments[0].finger.line;
  var firstPoint = firstLine.getPointAt(this.attachments[0].position);
  Phaser.Sprite.call(this, this.game, firstPoint.x, firstPoint.y+50, this.openGraphic.generateTexture());
  this.state.targets.add(this);
  this.anchor.setTo(0,0.5);
  this.box = new Phaser.Rectangle(firstPoint.x, firstPoint.y+40, length, 20);


  this.cUpdate = function(){
    for(var ii=0;ii<this.attachments.length;ii+=1){
      var attachment = this.attachments[ii];
      if(Phaser.Rectangle.containsPoint(this.box, attachment.finger)){
        attachment.finger.onTarget();
        this.cVars.hit = true;
        this.texture = this.hitGraphic.generateTexture();
      }
      if(!attachment.passed && this.box.right < attachment.finger.x){
        this.cVars.passed +=1;
        attachment.passed = true;
      }
    }
    if(!this.cVars.dead && this.cVars.passed >= this.attachments.length){
      this.cVars.dead = true;
      if(this.cVars.hit){
        this.texture = this.passGraphic.generateTexture();
      } else {
        this.state.score -= 100;
        this.texture = this.deadGraphic.generateTexture();
      }
    }
  };
}

NSTC.Target.prototype = Object.create(Phaser.Sprite.prototype);
NSTC.Target.prototype.constructor = NSTC.Target;
