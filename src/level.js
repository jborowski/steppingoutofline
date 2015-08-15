NSTC.Level = function(game){};
NSTC.Level.prototype = {
  init: function(levelData){
    this.definition = levelData;
  },
  create: function(){
    this.lines = this.game.add.group();
    this.targets = this.game.add.group();
    this.fingers = this.game.add.group();

    this.hand = {
      a: new NSTC.Finger(this, 'a', new NSTC.Line(this,250)),
      s: new NSTC.Finger(this, 's', new NSTC.Line(this,350)),
      d: new NSTC.Finger(this, 'd', new NSTC.Line(this,450))
    }
    
    this.buildTargets();

    this.game.add.text(50, 50, this.definition.name, { fill: '#FFF' });
    this.loopTimerText = this.game.add.text(50, 150, '', { fill: '#FFF' });

    this.music = this.game.add.sound('test_loop');
    this.music.loopFull();
    this.music.onLoop.add(this.resetTargets, this);

    this.score = 0;
    this.scoreDisplay = this.game.add.text(500, 50, "SCORE: "+this.score, { fill: '#FFF' });
  },
  update: function(){
    this.game.keyManager.update();
    this.loopTimerText.setText(String(this.music.currentTime)+"/"+this.music.duration);
    if(this.game.keyManager.isReleased('enter')){
      this.music.stop();
      this.state.start('StartMenu');
    }

    this.fingers.forEach(function(finger){
      finger.cUpdate();
    });
    this.targets.forEach(function(target){
      target.cUpdate();
    });
    this.fingers.forEach(function(finger){
      finger.cPostUpdate();
    });
    this.scoreDisplay.text = "SCORE: "+this.score;
  },
  buildTargets: function(){
    for(var ii=0; ii < this.definition.targets.length; ii+=1){
      var newTarget = this.definition.targets[ii];
      new NSTC.Target(this, newTarget.length, newTarget.attachments);
    }
  },
  resetTargets: function(){
    this.targets.callAll('destroy');
    this.buildTargets();
  }
}
