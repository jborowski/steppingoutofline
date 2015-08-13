NSTC.Line = function(state, x1, y1, x2, y2){
  this.state = state;
  this.game = this.state.game;
  var lineGraphic = this.game.add.bitmapData(this.game.width, this.game.height);
  lineGraphic.addToWorld();
  this.points = {
      'x': [ 128, 128, 256, 256, 512, 608 ],
      'y': [ 240, 180, 180, 240, 240, 240 ]
  };
  var color = 'white';

  var x = 1 / this.game.width;
  for (var i = 0; i <= 1; i += x){
    var px = this.state.math.linearInterpolation(this.points.x, i);
    var py = this.state.math.linearInterpolation(this.points.y, i);
    lineGraphic.rect(px, py, 1, 1, 'rgba(255, 255, 255, 1)');
  }

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
