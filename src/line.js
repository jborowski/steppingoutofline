NSTC.Line = function(state, x1, y1, x2, y2){
  this.state = state;
  this.game = this.state.game;
  var lineGraphic = this.game.add.bitmapData(600,300);
  var color = 'white';
  lineGraphic.ctx.beginPath();
  lineGraphic.ctx.strokeStyle = color;
  lineGraphic.ctx.lineWidth = 4;
  lineGraphic.ctx.moveTo(x1, y1);
  lineGraphic.ctx.lineTo(x2 , y2);
  lineGraphic.ctx.stroke();

  Phaser.Sprite.call(this, this.game, x1, y1, lineGraphic);
  this.state.lines.add(this);

  this.cVars = {
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2,
    finger: null
  };

  this.cUpdate = function(){
  };
}

NSTC.Line.prototype = Object.create(Phaser.Sprite.prototype);
NSTC.Line.prototype.constructor = NSTC.Line;
