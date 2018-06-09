function RobotMenu_2(ctx) {
  this.ctx = ctx;
  this.w = this.ctx.canvas.width;
  this.h = this.ctx.canvas.height;

  this.x = 0;
  this.y = 0;

  this.img = new Image();
  this.img.src = "./src/assets/spritesRobot_2/dab/DabDance_000.png";

  this.img.isReady = false;
  this.img.onload = function () {
    this.img.isReady = true;
  }.bind(this);

  this.img.frames = 3;
  this.img.frameIndex = 0;

  this.img.animateEvery = 8;
  this.drawCount = 0;

};

RobotMenu_2.prototype.isReady = function () {
  return this.img.isReady;
}

RobotMenu_2.prototype.draw = function () {
  if (this.isReady()) {
    this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    );
    this.drawCount++;
  }
};

RobotMenu_2.prototype.animate = function () {
  if (this.drawCount % this.img.animateEvery === 0) {
    var frame = this.img.frameIndex.toString().padStart(3, ['0']);
    this.img.src = "./src/assets/spritesRobot_2/dab/DabDance_" + frame + ".png";

    this.img.frameIndex++;

    if (this.img.frameIndex >= this.img.frames) {
      this.img.frameIndex = 0;
    }
    this.drawCount = 0;
  }
};