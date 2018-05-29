function BackgroundCity(ctx) {
  this.ctx = ctx;

  this.img = new Image();
  this.img.src = "./../assets/loopCity2.png";

  this.x = 0;
  this.y = 0;

  this.w = 3061;
  this.h = this.ctx.canvas.height;

  this.vx = -1.8;
}

BackgroundCity.prototype.draw = function() {
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

BackgroundCity.prototype.move = function() {
  this.x += this.vx;

  if(this.x <= -this.w) {
    this.x = 0;
  }
};

BackgroundCity.prototype.clearCanvas = function() {
  this.ctx.clearRect(
    0, 0, this.ctx.canvas.width, this.ctx.canvas.height
  );
};