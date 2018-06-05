function RobotMenu(ctx) {
    this.ctx = ctx;
    this.w = this.ctx.canvas.width;
    this.h = this.ctx.canvas.height;

    this.x = 0;
    this.y = 0;

    this.img = new Image();
    this.img.src = "./src/assets/spritesRobot/walk/walk_000.png";
    this.img.frames = 21;
    this.img.frameIndex = 0;

    this.img.animateEvery = 2;
    this.drawCount = 0;

};

RobotMenu.prototype.draw = function () {
    this.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.w,
        this.h
    );
    this.drawCount++;
};

RobotMenu.prototype.animate = function () {
    if (this.drawCount % this.img.animateEvery === 0) {  
        var frame = this.img.frameIndex.toString().padStart(3, ['0']);
        this.img.src = "./src/assets/spritesRobot/walk/walk_" + frame + ".png";

        this.img.frameIndex++;

        if (this.img.frameIndex > this.img.frames) {
            this.img.frameIndex = 0;
        }      
        this.drawCount = 0;
    }
};

//   RobotMenu.prototype.stop = function() {

//   }
