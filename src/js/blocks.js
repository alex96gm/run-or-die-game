function Blocks(ctx, x, y, w, url) {
  this.ctx = ctx;

  this.img = new Image();

  this.typesObject = [
    {
      w: 400,
      url: './src/assets/block-long.png'
    },
    {
      w: 266,
      url: './src/assets/block-middle.png'
    },
    {
      w: 133,
      url: './src/assets/block-small.png'
    }
  ]

  this.type = this.typesObject[Math.floor(Math.random() * this.typesObject.length)]

  this.blockYArray = [420, 180];

  this.img.src = url || this.type.url;

  this.x = x || this.ctx.canvas.width;
  this.y = y || this.blockYArray[Math.floor(Math.random() * this.blockYArray.length)];

  this.w = w || this.type.w;
  this.h = 32;

  this.vx = -2.5;
}

Blocks.prototype.draw = function () {
  this.ctx.drawImage(
    this.img,
    this.x,
    this.y,
    this.w,
    this.h
  );
};

Blocks.prototype.move = function() {
  this.x += this.vx;

  if(this.x <= -this.w) {
    //limpiar bloque cuando llegue al final de la pantalla
  }
};

Blocks.prototype.clearCanvas = function () {
  this.ctx.clearRect(
    0, 0, this.ctx.canvas.width, this.ctx.canvas.height
  );
};