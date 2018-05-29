function Game(canvasElement) {
    this.ctx = canvasElement.getContext("2d");
  
    this.bg = new Background(this.ctx);
  
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
  };
  
  Game.prototype.moveAll = function() {
    this.bg.move();
  };

  Game.prototype.clear = function() {
    this.ctx.clearRect(
      0, 0, this.ctx.canvas.width, this.ctx.canvas.height
    );
  };