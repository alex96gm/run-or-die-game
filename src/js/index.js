window.onload = function () {
    var indexGame = new IndexGame();
    indexGame.setKeyBoardListeners();
    indexGame.setClickListeners();
    indexGame.backGrounds.start();
    indexGame.chooseCharacter.start();
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
    canvasChooseCharacterRobot : document.getElementById("chooseRobot")
  };
  this.backGrounds = new BackGrounds(
    this.canvas.canvasFloor, 
    this.canvas.canvasSky, 
    this.canvas.canvasCityMiddle, 
    this.canvas.canvasMoon
  );
  this.chooseCharacter = new ChooseCharacter(this.canvas.canvasChooseCharacterRobot);
  this.localStorageScore = new LocalStorageScore();
  
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
    }
  }.bind(this));
}

IndexGame.prototype.selectLeftChracter = function () {
  this.selectPlayer = 'robot';

  $('.character-one').addClass('selected-player');
  $('.character-two').removeClass('selected-player');

  $('.selectedCharacterText').show();
  $('.selectedCharacterText').addClass('selectedRight');
  $('.selectedCharacterText').removeClass('selectedLeft');
};

IndexGame.prototype.selectRightcharacter = function() {
  this.selectPlayer = 'human';
  
  $('.character-two').addClass('selected-player');
  $('.character-one').removeClass('selected-player');

  $('.selectedCharacterText').show();
  $('.selectedCharacterText').addClass('selectedLeft');
  $('.selectedCharacterText').removeClass('selectedRight');
};

IndexGame.prototype.setClickListeners = function(){

  this.startGame();
  
  this.selectCharacter();

  this.highScoreToMenu();

  this.menuToHighScore(this.localStorageScore);
  this.gameOverToHighScore(this.localStorageScore);

  this.gameToMenu(this.localStorageScore);
  this.gameOverToMenu();

  this.gameOverTryAgain();
}

IndexGame.prototype.startGame = function(){
  $(".start-game").on("click", function () {
    if (this.selectPlayer) {
      $(".start-view").slideToggle(function () {
        $(".div-canvas-game").slideToggle()
      });

      this.game = new Game(
        this.canvas.canvasGame, 
        this.backGrounds, 
        this.selectPlayer, 
        this.localStorageScore,
        this.menuSong
      );

      this.game.start();
      this.menuSong.stopSongMenu();
    }
  }.bind(this));
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
      this.setScoreTable(this.localStorageScore.getScore());
    }.bind(this));
  }.bind(this));
}


IndexGame.prototype.highScoreToMenu = function() {
  $('.go-to-menu-high-score.button28').on("click", function () {
    $(".high-scores").slideToggle(function () {
      $(".start-view").slideToggle();
    });
  });
}

IndexGame.prototype.gameToMenu = function() {
  $('.go-to-menu-canvas.button28').on("click", function () {
    $(".div-canvas-game").slideToggle(function () {
      $(".start-view").slideToggle();
    });
    
    this.menuSong.playSongMenu();
    var scores = this.game.finish();
    this.localStorageScore.setScore(scores.player, scores.score);
  }.bind(this));
}


IndexGame.prototype.gameOverToHighScore = function() {
  $('.sim-button-game-over').on("click", function () {
    $(".game-over-view").slideToggle(function () {
      $(".high-scores").slideToggle();
      this.setScoreTable(this.localStorageScore.getScore());
    }.bind(this));
  }.bind(this));
}

IndexGame.prototype.gameOverToMenu = function() {
  $('.go-to-menu').on("click", function () {
    $(".game-over-view").slideToggle(function () {
      $(".start-view").slideToggle();
    });
  });
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
        this.localStorageScore,
        this.menuSong
      );
      this.game.start();
  }.bind(this));
}

IndexGame.prototype.setScoreTable = function(scores) {
  if (scores) {
    $(".body").empty();
    scores.forEach((element, i) => {
      var $td0 = $("<div></div>").text(i + 1);
      var $td1 = $("<div></div>").text(element.player);
      var $td2 = $("<div></div>").text(element.date);
      var $td3 = $("<div></div>").text(element.score);
      var $div = $("<div></div>");

      var $scoreRow = $div.append($td0, $td1, $td2, $td3);
      $('.body').append($scoreRow)
    });
  }
}


