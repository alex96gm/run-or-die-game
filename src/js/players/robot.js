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
    this.isOnPlatform = false;
    this.isJump = false;
};
Robot.prototype.checkColisions = function (blocks) {

    this.isOnPlatform = false;

    blocks.forEach((block, i) => {
        if (
            (this.y <= block.y) &&
            (this.y + this.h <= block.y) &&
            (this.x + this.w - 100 >= block.x) &&
            (this.x + 100 <= block.x + block.w)) {
            //character in platform
            this.isOnPlatform = true
            this.isJump = false;
            
        }

    });

    
    
    if (this.isOnPlatform && this.jump) {
        this.vy = 0;
    }else{
        this.y -= this.vy;
        this.vy -= this.g;
    }
 
    
}

Robot.prototype.draw = function (blocks) {
    this.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.w,
        this.h
    );

    this.drawCountIdle++;
    
    //this.robotJumpHandler();

    this.checkColisions(blocks);

    this.checkGameOver();
};

Robot.prototype.jump = function () {

    // if(this.jumpCount === 2 && this.isOnPlatform){
    //     this.jumpCount = 0;       
    // } 
    //console.log(this.vy);
    // if(this.jumpCount < 2){
    //if (this.isOnPlatform) {
        //this.jumpCount++;
        this.vy += this.v;
        this.isJump = true;
   // }
    // else {
    //     this.vy += this.v;
    //     this.jumpCount++;
    // } 
    //} 
};

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
                if (this.isOnPlatform) {
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

Robot.prototype.checkGameOver = function () {
    if (this.y > this.ctx.canvas.height) {
        return true;
    }
}



