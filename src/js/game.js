function Game(canvasElement) {
  this.ctx = canvasElement.getContext("2d");

  this.intervalId = null;

  this.blocks = [
    new Blocks(this.ctx, 80, 420 , 400,'./src/assets/block-long.png'),
    new Blocks(this.ctx, 700, 420, 400,'./src/assets/block-long.png'),
    new Blocks(this.ctx, 550, 180 , 133,'./src/assets/block-small.png'),
    new Blocks(this.ctx, 800, 180 , 133,'./src/assets/block-small.png'),
    new Blocks(this.ctx, 1050, 180 , 133,'./src/assets/block-small.png'),
  ]

}

Game.prototype.start = function() {
  
  this.intervalId = setInterval(function() {
    this.clear();

    this.genarateBlocks();

    //this.moveAll();
  }.bind(this), 16);
};

Game.prototype.clear = function() {
  this.blocks.forEach(element => {
    element.clearCanvas();
  });
};

Game.prototype.genarateBlocks = function() {
 //if(16000 % 16){
    this.blocks.push(new Blocks(this.ctx));
  //}

  this.blocks.forEach(element => {
    element.draw();
    element.move();
  });
};

