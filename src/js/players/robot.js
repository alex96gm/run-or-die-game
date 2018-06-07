function Robot(ctx) {
    this.ctx = ctx;

    this.w = 170;
    this.h = 110;

    this.x = 100;

    this.ground = 420 - this.h;
    this.y = this.ground;
    this.vy = 3;

    this.g = 0.8;

    this.img = new Image();
    this.img.src = "./src/assets/spritesRobot/idle/idle_000.png";
    this.img.frames = 14;
    this.img.frameIndex = 0;

    this.img.animateEveryIdle = 5;
    this.drawCountIdle = 0;
    
    this.jumpCount = 0;
    this.isOnPlatform = false;

    this.isJumping = false;
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

    this.jumpHandler();
    this.checkGameOver();
};

Robot.prototype.jumpHandler = function() {
    this.y += this.vy;
    if (this.isJumping) {
        this.vy += this.g;
    }
}

Robot.prototype.checkColisions = function(blocks) {

    var collitions = blocks.filter(function(block) {
        return block.collide(this);
    }.bind(this));

    console.log(collitions);

    collitions.forEach(function(block) {
        if (block instanceof Blocks) {
            this.collideWithBlock(block);
        }
    }.bind(this));

    if (collitions.length === 0) {
        this.vy = 10;
    }

    // this.isOnPlatform = false;

    // blocks.forEach((block, i) => {
    //     if ((this.x + 100 <= block.x + block.w) && //right
    //     (this.x + this.w >= block.x) && //left
    //     (this.y + this.h <= block.y)) //top
    //     {
    //         this.isOnPlatform = true;
    //         this.ground = block.y - this.h;
    //     } else {
    //         this.isOnPlatform = false;
    //         //this.ground = this.ctx.canvas.height + 200
    //     }        
    // });
}

Robot.prototype.collideWithBlock = function(block) {
    if (this.y + this.h >= block.y && this.y + this.h <= block.y + 4 && this.x + this.w >= block.x && this.x <= block.x + block.w) {
        this.vy = 0;
        this.y = block.y - this.h;
        this.isJumping = false;
    } else if (this.y >= block.y + block.h) {
        this.y = block.y + block.h;
    }
}

Robot.prototype.jump = function () {
    if (!this.isJumping) {
        this.vy -= 100;
        this.isJumping = true;
    }
};


Robot.prototype.animate = function (stateGame) {
    if (this.drawCountIdle % this.img.animateEveryIdle === 0) {
        this.img.frameIndex++;

        switch (stateGame) {
            case 'gameStopped':
                this.idleAnimate();
                break;
            case 'gameMove':
                if (this.y === this.ground) {
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



