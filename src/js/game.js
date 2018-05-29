function Game(canvasElement, canvasSky, canvasCityMiddle, canvasMoon) {
    this.ctx = canvasElement.getContext("2d");
    //Background Sky
    this.ctxSky = canvasSky.getContext("2d");
    //this.ctxSky.globalCompositeOperation = 'destination-over';

    //Background City
    this.ctxCity = canvasCityMiddle.getContext("2d");
    //this.ctxCity.globalCompositeOperation = 'destination-over';
    
    //Background Moon
    this.ctxMoon = canvasMoon.getContext("2d");
    //this.ctxMoon.globalCompositeOperation = 'destination-over';

    this.bg = new Background(this.ctx);
    this.bgSky = new BackgroundSky(this.ctxSky);
    this.bgCity = new BackgroundCity(this.ctxCity);
    this.bgMoon = new BackgroundMoon(this.ctxMoon);
  
    this.intervalId = null;
  
  }

  Game.prototype.start = function() {
    this.intervalId = setInterval(function() {
      this.clear();
  
      this.drawAll();
  
      this.moveAll();
    }.bind(this), 16);
  };
  
  Game.prototype.drawAll = function() {
    this.bg.draw();
    this.bgSky.draw();
    this.bgCity.draw();
    this.bgMoon.draw();
  };
  
  Game.prototype.moveAll = function() {
    this.bg.move();
    this.bgSky.move();
    this.bgCity.move();
    this.bgMoon.move();
  };

  Game.prototype.clear = function() {
    this.bg.clearCanvas();
    this.bgSky.clearCanvas();
    this.bgCity.clearCanvas();
    this.bgMoon.clearCanvas();
  };