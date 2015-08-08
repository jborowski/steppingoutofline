NSTC.StartMenu = function(game){};
NSTC.StartMenu.prototype = {
  options: [],
  create: function(){
    this.game.add.text(250, 50, "OUT_OF_LINE!", { fill: '#FFF' });
    this.menu = this.game.add.group();
    this.menu.position.x = 300;
    this.menu.position.y = 250;
    var optionTexts = ["Option 1", "Option 2", "Option 3"];
    var newOption;
    for(var ii=0; ii < optionTexts.length; ii+=1){
      newOption = this.game.add.group(this.menu);
      newOption.add(this.game.add.text(0,0, optionTexts[ii], { fill: '#FFF'}));
      newOption.position.y = ii * 30;
      this.options.push(newOption);
    }
  },
  update: function(){
    if(this.game.input.keyboard.isDown(13)){
      this.state.start('Level', true, false, {text: "A level from data!"});
    }
  }
}
