NSTC.StartMenu = function(game){};
NSTC.StartMenu.prototype = {
  options: [],
  selectedOptionId: 0,
  create: function(){
    this.game.add.text(250, 50, "OUT_OF_LINE!", { fill: '#FFF' });
    this.menu = this.game.add.group();
    this.menu.position.x = 300;
    this.menu.position.y = 250;
    var optionTexts = ["Option 1", "Option 2", "Option 3"];
    var newOption;
    var selectedGraphic = new Phaser.Graphics().beginFill(0x0000FF).drawRect(0,0,300,30);
    for(var ii=0; ii < optionTexts.length; ii+=1){
      newOption = this.game.add.group(this.menu);
      newOption.outline = this.game.add.sprite(-20,0, selectedGraphic.generateTexture());
      newOption.outline.visible = false;
      newOption.add(newOption.outline);
      newOption.text = this.game.add.text(0,0, optionTexts[ii], { fill: '#FFF'});
      newOption.add(newOption.text);
      newOption.position.y = ii * 30;
      this.options.push(newOption);
    }
    this.select(this.getSelectedOption());
  },
  nextOption: function(){
    this.unselect(this.getSelectedOption());
    this.selectedOptionId += 1;
    if(this.selectedOptionId >= this.options.length){
      this.selectedOptionId = 0;
    }
    this.select(this.getSelectedOption());
  },
  previousOption: function(){
    this.unselect(this.getSelectedOption());
    this.selectedOptionId -= 1;
    if(this.selectedOptionId < 0){
      this.selectedOptionId = this.options.length - 1;
    }
    this.select(this.getSelectedOption());
  },
  getSelectedOption: function(){
    return this.options[this.selectedOptionId];
  },
  unselect: function(option){
    option.outline.visible = false;
  },
  select: function(option){
    option.outline.visible = true;
  },
  update: function(){
    if(this.game.input.keyboard.isDown(13)){
      this.state.start('Level', true, false, {text: "A level from data!"});
    } else if(this.game.input.keyboard.isDown(83)){
      this.nextOption();
    } else if(this.game.input.keyboard.isDown(87)){
      this.previousOption();
    }
  }
}
