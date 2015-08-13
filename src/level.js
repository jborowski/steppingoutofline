NSTC.Level = function(game){};
NSTC.Level.prototype = {
  init: function(levelDefinition){
    this.definition = levelDefinition;
  },
  create: function(){
    this.targets = this.game.add.group();
    this.fingers = this.game.add.group();
    this.targets = this.game.add.group();
    this.lines = this.game.add.group();

    this.hand = {
      a: new NSTC.Finger(this, 250, 400, 'a'),
      s: new NSTC.Finger(this, 380, 400, 's'),
      d: new NSTC.Finger(this, 510, 400, 'd'),
    }

    new NSTC.Target(this, this.hand.a, this.hand.s, 2500, 315, 0);
    new NSTC.Target(this, this.hand.a, this.hand.s, 3500, 315, -80);
    new NSTC.Target(this, this.hand.a, this.hand.s, 4500, 315, -160);

    new NSTC.Line(this,0,0,50,50);

    this.game.add.text(50, 50, this.definition.text, { fill: '#FFF' });
    this.loopTimerText = this.game.add.text(50, 150, '', { fill: '#FFF' });

    this.music = this.game.add.sound('test_loop');
    this.music.loopFull();

    this.score = 0;
    this.scoreDisplay = this.game.add.text(500, 50, "SCORE: "+this.score, { fill: '#FFF' });
  },
  update: function(){
    this.game.keyManager.update();
    this.loopTimerText.setText(String(this.music.currentTime));
    this.targets.y = -100 + (this.music.currentTime/this.music.durationMS) * 800;
    if(this.game.keyManager.isReleased('enter')){
      this.state.start('StartMenu');
    }

    this.fingers.forEach(function(finger){
      finger.cUpdate();
    });
    this.targets.forEach(function(target){
      target.cUpdate();
    });
    this.fingers.forEach(function(finger){
      finger.updateScore();
    });
    this.scoreDisplay.text = "SCORE: "+this.score;
  },
}
