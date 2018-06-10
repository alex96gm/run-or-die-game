window.onload = function () {
    var indexGame = new IndexGame();
    indexGame.setKeyBoardListeners();
    indexGame.setClickListeners();
    indexGame.backGrounds.start();
    indexGame.chooseCharacter.start();
    indexGame.menuSong.playSongMenu();
    indexGame.dataBase.Table();
    indexGame.dataBase.ClearDB();
};

function IndexGame (){
  this.menuSong = new MenuSong();
  this.selectPlayer = '';
  this.game = null;
  this.canvas = {
    canvasSky : document.getElementById("canvasbackgroundSky"),
    canvasFloor : document.getElementById("canvasbackgroundFloor"),
    canvasCityMiddle : document.getElementById("canvasbackgroundCity"),
    canvasMoon : document.getElementById("canvasbackgroundMoon"),
    canvasGame : document.getElementById("canvasGame"),
    canvasChooseCharacterRobot : document.getElementById("chooseRobot"),
    canvasChooseCharacterRobot_2 : document.getElementById("chooseRobot_2")
  };
  this.backGrounds = new BackGrounds(
    this.canvas.canvasFloor, 
    this.canvas.canvasSky, 
    this.canvas.canvasCityMiddle, 
    this.canvas.canvasMoon
  );
  this.chooseCharacter = new ChooseCharacter(this.canvas.canvasChooseCharacterRobot,this.canvas.canvasChooseCharacterRobot_2);
  this.dataBase = new DataBase();
  

  this.toggleIntro = true;
}

IndexGame.prototype.setKeyBoardListeners = function(){
  $(document).keydown(function (e) {
    switch (e.keyCode) {
      case 37:
        this.selectLeftChracter();
        break;
      case 39:
        this.selectRightcharacter();
        break;
        case 13:
          if(this.selectPlayer && this.toggleIntro){
            this.startGame();
            this.toggleIntro = false
          }
        break;
    }
  }.bind(this));
}

IndexGame.prototype.selectLeftChracter = function () {
  this.selectPlayer = 'C-2PO';

  $('.character-one').addClass('selected-player');
  $('.character-two').removeClass('selected-player');

  $('.selectedCharacterText').show();
  $('.selectedCharacterText').addClass('selectedRight');
  $('.selectedCharacterText').removeClass('selectedLeft');
};

IndexGame.prototype.selectRightcharacter = function() {
  this.selectPlayer = 'C-4PO';
  
  $('.character-two').addClass('selected-player');
  $('.character-one').removeClass('selected-player');

  $('.selectedCharacterText').show();
  $('.selectedCharacterText').addClass('selectedLeft');
  $('.selectedCharacterText').removeClass('selectedRight');
};

IndexGame.prototype.setClickListeners = function(){

  this.startGameClick();
  
  this.selectCharacter();

  this.highScoreToMenu();

  this.menuToHighScore();
  this.gameOverToHighScore();

  this.gameToMenu();
  this.gameOverToMenu();

  this.gameOverTryAgain();
}

IndexGame.prototype.startGameClick = function(){
  $(".start-game").on("click", function () {
    this.startGame();
  }.bind(this));
}

IndexGame.prototype.startGame = function(){
    if (this.selectPlayer) {
      $(".start-view").slideToggle(function () {
        $(".div-canvas-game").slideToggle()
      });

      this.game = new Game(
        this.canvas.canvasGame, 
        this.backGrounds, 
        this.selectPlayer, 
        this.dataBase,
        this.menuSong
      );

      this.game.start();
      this.menuSong.stopSongMenu();
    }

}

IndexGame.prototype.selectCharacter = function() { 

  $('.character-one').click(function (e) {
    this.selectLeftChracter();
  }.bind(this));

  $('.character-two').click(function (e) {
    this.selectRightcharacter();
  }.bind(this));
};

IndexGame.prototype.menuToHighScore = function(){
  $('.sim-button.button28').on("click", function () {
    $(".start-view").slideToggle(function () {
      $(".high-scores").slideToggle();
      this.dataBase.Select().then(
        function(data){
          this.setScoreTable(data)
        }.bind(this)
      );  
    }.bind(this));
  }.bind(this));
}


IndexGame.prototype.highScoreToMenu = function() {
  $('.go-to-menu-high-score.button28').on("click", function () {
    $(".high-scores").slideToggle(function () {
      $(".start-view").slideToggle();
      this.toggleIntro = true;
    }.bind(this));
  }.bind(this));
  
}

IndexGame.prototype.gameToMenu = function() {
  $('.go-to-menu-canvas.button28').on("click", function () {
    $(".div-canvas-game").slideToggle(function () {
      $(".start-view").slideToggle();
    });
    
    this.menuSong.playSongMenu();
    var scores = this.game.finish();

    this.dataBase.Insert(scores.player, scores.score , scores.bitcoin)
  }.bind(this));
}


IndexGame.prototype.gameOverToHighScore = function() {
  $('.sim-button-game-over').on("click", function () {
    $(".game-over-view").slideToggle(function () {
      $(".high-scores").slideToggle();
      this.dataBase.Select().then(
        function(data){
          this.setScoreTable(data)
        }.bind(this)
      );  
    }.bind(this));
  }.bind(this));
}

IndexGame.prototype.gameOverToMenu = function() {
  $('.go-to-menu').on("click", function () {
    $(".game-over-view").slideToggle(function () {
      $(".start-view").slideToggle();
      this.toggleIntro = true;
    }.bind(this));
  }.bind(this));
  
}

IndexGame.prototype.gameOverTryAgain = function() {
  $('.try-again').on("click", function () {
    $(".game-over-view").slideToggle(function () {
        $(".div-canvas-game").slideToggle();
        
      });
      this.menuSong.stopSongMenu();
      this.game = new Game(
        this.canvas.canvasGame, 
        this.backGrounds, 
        this.selectPlayer, 
        this.dataBase,
        this.menuSong
      );
      this.game.start();
  }.bind(this));
}

IndexGame.prototype.setScoreTable = function(scores) {
  if (scores) {
    $(".body").empty();
    for (let i = 0; i < scores.length; i++) {
      var $td0 = $("<div></div>").text(i + 1);
      var $td1 = $("<div></div>").text(scores[i].name);
      var $td2 = $("<div></div>").text(scores[i].date);
      var $td3 = $("<div></div>").text(scores[i].score);
      var $td4 = $("<div></div>").text(scores[i].bitcoins);
      var $div = $("<div></div>");

      var $scoreRow = $div.append($td0, $td1, $td2, $td3,$td4);
      $('.body').append($scoreRow)
      
    }
  }
}


