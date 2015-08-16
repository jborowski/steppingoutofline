NSTC.Level = function(game){};
NSTC.Level.prototype = {
  init: function(levelData){
    this.definition = levelData;
  },
  create: function(){
    this.world.setBounds(0,0, 3000, 3000);

    this.lines = this.game.add.group();
    this.targets = this.game.add.group();
    this.fingers = this.game.add.group();

    this.hand = {
      a: new NSTC.Finger(this, 'a', new NSTC.Line(this,250)),
      s: new NSTC.Finger(this, 's', new NSTC.Line(this,350)),
      d: new NSTC.Finger(this, 'd', new NSTC.Line(this,450))
    }
    
    this.titleText = this.game.add.text(50, 50, this.definition.name, { fill: '#FFF' });
    this.titleText.fixedToCamera = true;
    this.loopTimerText = this.game.add.text(50, 150, '', { fill: '#FFF' });
    this.loopTimerText.fixedToCamera = true;

    this.music = this.game.add.sound('test_loop');
    this.music.loopFull();
    this.music.onLoop.add(this.resetTargets, this);

    this.score = 0;
    this.scoreDisplay = this.game.add.text(500, 50, "SCORE: "+this.score, { fill: '#FFF' });
    this.scoreDisplay.fixedToCamera = true;
    this.missedTargets = 0;
    this.totalTargets = 0;

    this.buildTargets();

  },
  update: function(){
    this.game.keyManager.update();
    if(this.game.keyManager.isReleased('enter')){
      this.music.stop();
      this.state.start('Score', true, false, {name: this.definition.name, score: this.score, hit: this.totalTargets - this.missedTargets, missed: this.missedTargets, total: this.totalTargets});
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
    
    var averageFingerX = (this.hand.a.x + this.hand.s.x + this.hand.d.x) / 3;
    this.game.camera.setPosition(averageFingerX-100, this.game.camera.y);
    this.loopTimerText.setText(""+averageFingerX+"/"+this.game.camera.x);
  },
  buildTargets: function(){
    for(var ii=0; ii < this.definition.targets.length; ii+=1){
      var newTarget = this.definition.targets[ii];
      new NSTC.Target(this, newTarget.length, newTarget.attachments);
      this.totalTargets += 1;
    }
  },
  resetTargets: function(){
    this.targets.callAll('destroy');
    this.buildTargets();
  }
}
