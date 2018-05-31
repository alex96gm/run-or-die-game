function BackGrounds(canvasElement, canvasSky, canvasCityMiddle, canvasMoon) {
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

  BackGrounds.prototype.start = function() {
    this.intervalId = setInterval(function() {
      this.clear();
  
      this.drawAll();
  
      this.moveAll();
    }.bind(this), 16);
  };
  
  BackGrounds.prototype.drawAll = function() {
    this.bg.draw();
    this.bgSky.draw();
    this.bgCity.draw();
    this.bgMoon.draw();
  };
  BackGrounds.prototype.stopAll = function() {
    clearInterval(this.intervalId);
    this.bg.stop();
    this.bgSky.stop();
    this.bgCity.stop();
    this.bgMoon.stop();
  };
  
  BackGrounds.prototype.moveAll = function() {
    this.bg.move();
    this.bgSky.move();
    this.bgCity.move();
    this.bgMoon.move();
  };

  BackGrounds.prototype.clear = function() {
    this.bg.clearCanvas();
    this.bgSky.clearCanvas();
    this.bgCity.clearCanvas();
    this.bgMoon.clearCanvas();
  };