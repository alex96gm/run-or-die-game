function Robot(ctx, stateGame) {
    this.ctx = ctx;

    this.w = 170;
    this.h = 110;

    this.x = 100;
    this.ground = 420 - this.h;
    this.y = this.ground;

    this.vy = 0;
    this.v = 20;
    this.g = 1;

    this.img = new Image();
    this.img.src = "./src/assets/spritesRobot/idle/idle_000.png";
    this.img.frames = 14;
    this.img.frameIndex = 0;

    this.img.animateEveryIdle = 5;
    this.drawCountIdle = 0;
    this.jumpCount = 0;

};

Robot.prototype.draw = function () {
    this.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.w,
        this.h
    );

    this.drawCountIdle++;
  
    if(this.y > this.ground){
        this.y = this.ground;
    }

    this.robotJumpHandler();

    this.checkGameOver();
};

Robot.prototype.jump = function () {

    if(this.jumpCount === 2 && this.y >=   this.ground){
        this.jumpCount = 0;
        
    } 

    if(this.jumpCount < 2){
        if (this.isJumping()) {
            this.jumpCount++;            
            this.vy += this.v;            
        } else {
            this.vy += this.v;
            this.jumpCount++;
        } 
    } 
};


Robot.prototype.robotJumpHandler = function () {
    this.y -= this.vy;

    if (this.isJumping()) {
        this.vy -= this.g;
    } else {
        this.vy = 0;
    }
}

Robot.prototype.isJumping = function () {
    return this.y < this.ground;
};

Robot.prototype.animate = function (stateGame) {
    if (this.drawCountIdle % this.img.animateEveryIdle === 0) {
        this.img.frameIndex++;

        switch (stateGame) {
            case 'gameStopped':
                this.idleAnimate();
                break;
            case 'gameMove':
                if (!this.isJumping()) {
                    this.runAnimate();
                } else {
                    this.img.frameIndex = 0;
                    this.jumpAnimate();
                }
                break;
        }

        if (this.img.frameIndex >= this.img.frames) {
            this.img.frameIndex = 0;
        }
        this.drawCountIdle = 0;
    }
};

Robot.prototype.idleAnimate = function () {
    this.img.frames = 14;
    var frame = this.img.frameIndex.toString().padStart(3, ['0']);
    this.img.src = "./src/assets/spritesRobot/idle/idle_" + frame + ".png";
}

Robot.prototype.runAnimate = function () {
    this.img.frames = 19;
    var frame = this.img.frameIndex.toString().padStart(3, ['0']);
    this.img.src = "./src/assets/spritesRobot/running/running_" + frame + ".png";
}

Robot.prototype.jumpAnimate = function () {
    this.img.frames = 9;
    var frame = this.img.frameIndex.toString().padStart(3, ['0']);
    this.img.src = "./src/assets/spritesRobot/jump/jump_" + frame + ".png";
}

Robot.prototype.checkGameOver = function(){
    if(this.y < 0){
        return true;
    }
}



