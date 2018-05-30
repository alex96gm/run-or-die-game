function BackgroundMoon(ctx) {
    this.ctx = ctx;
  
    this.img = new Image();
    this.img.src = "./src/assets/skyloop.png";
  
    this.x = 0;
    this.y = 0;
  
    this.w = this.ctx.canvas.width;
    this.h = this.ctx.canvas.height;
  
    this.vx = -1;
  }
  
  BackgroundMoon.prototype.draw = function() {
    this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    );
  
    this.ctx.drawImage(
      this.img,
      this.x + this.w,
      this.y,
      this.w,
      this.h
    );
  };
  
  BackgroundMoon.prototype.move = function() {
    this.x += this.vx;
  
    if(this.x <= -this.w) {
      this.x = 0;
    }
  };

  BackgroundMoon.prototype.clearCanvas = function() {
    this.ctx.clearRect(
      0, 0, this.ctx.canvas.width, this.ctx.canvas.height
    );
  };