NSTC.Line = function(state, y){
  this.state = state;
  this.game = this.state.game;
  var lineGraphic = this.game.add.bitmapData(this.game.width, this.game.height);
  lineGraphic.addToWorld();
  this.points = {
      'x': [ 50, 650 ],
      'y': [ y, y ]
  };
  var color = 'white';
  this.path = [];
  var x = 1 / this.game.width;
  for (var i = 0; i <= 1; i += x){
    var px = this.state.math.linearInterpolation(this.points.x, i);
    var py = this.state.math.linearInterpolation(this.points.y, i);
    lineGraphic.rect(px, py, 1, 1, 'rgba(255, 255, 255, 1)');
    this.path.push({x: px, y: py});
  }

  Phaser.Sprite.call(this, this.game, 0, 0, lineGraphic);
  this.state.lines.add(this);

  this.cVars = {
    finger: null
  };

  this.cUpdate = function(){
  };

  this.getPositionAt = function(percentPosition){
    return Math.floor(this.path.length * percentPosition);
  };

  this.getPointAt = function(percentPosition){
    return this.path[this.getPositionAt(percentPosition)];
  };
}

NSTC.Line.prototype = Object.create(Phaser.Sprite.prototype);
NSTC.Line.prototype.constructor = NSTC.Line;
