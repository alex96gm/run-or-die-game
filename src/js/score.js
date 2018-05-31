function Score(ctx) {
    this.ctx = ctx;

    this.x = this.ctx.canvas.width - 300;
    this.y = 50;

    this.score = 0;
  }
  
  Score.prototype.draw = function() {
    this.ctx.font = "40px blankaregular";
    this.ctx.fillStyle = "red";
    this.ctx.textAlign = "center";
    this.ctx.fillText('Score:  ' + Math.floor(this.score), this.x, this.y);
    this.score += 1;
  };