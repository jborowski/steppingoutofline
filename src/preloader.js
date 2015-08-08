if(!NSTC){NSTC={};}
NSTC.Preloader = function (game) {
  this.loadBackground = null;
  this.preloadBar = null;
  this.SAlogo = null;
  this.loadingText = null;
  this.ready = false;
};
NSTC.Preloader.prototype = {

  preload: function () {
    this.preloadBar = this.add.sprite(209, 356, 'loadBar');
    this.SAlogo = this.add.sprite(384, 156, 'SAGDlogo');
    this.SAlogo.anchor.setTo(0.5, 0.5);
    // this.loadingText = this.add.text(240, 450, 'now loading');

    this.load.setPreloadSprite(this.preloadBar);
  },
  create: function () {
    this.preloadBar.cropEnabled = false;
  },
  update: function () {
    if(this.ready == false) {
      this.ready = true;
      this.state.start('StartMenu');
    }
  }
};
