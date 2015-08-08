NSTC.KeyManager = function(game){
  // Key states: 0/Free, 1/Pressed, 2/Held, 3/Released
  this.keys = [
    { name: "enter", code: 13, state: 0},
    { name: "a", code: 65, state: 0},
    { name: "w", code: 87, state: 0},
    { name: "s", code: 83, state: 0},
    { name: "d", code: 68, state: 0},
  ];
  this.keysByName = {};
  this.keysByCode = {};
  for(var ii=0; ii < this.keys.length; ii+=1){
    this.keysByName[this.keys[ii].name] = this.keys[ii];
    this.keysByCode[this.keys[ii].code] = this.keys[ii];
  }
  this.game = game;
};
NSTC.KeyManager.prototype = {
  update: function(){
    for(var ii=0; ii < this.keys.length; ii+=1){
      var key = this.keys[ii];
      if( (key.state == 0 || key.state == 3) && this.game.input.keyboard.isDown(key.code)){
        key.state = 1;
      } else if(key.state == 1 && this.game.input.keyboard.isDown(key.code)){
        key.state = 2;
      } else if( (key.state == 2 || key.state == 1) && !this.game.input.keyboard.isDown(key.code)){
        key.state = 3;
      } else if(key.state == 3 && !this.game.input.keyboard.isDown(key.code)){
        key.state = 0;
      } 
    }
  },
  isFree: function(code){
    return this.keysByCode[code].state == 0;
  },
  isPressed: function(code){
    return this.keysByCode[code].state == 1;
  },
  isHeld: function(code){
    return this.keysByCode[code].state == 2;
  },
  isReleased: function(code){
    return this.keysByCode[code].state == 3;
  }
}
