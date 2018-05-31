window.onload = function() {
    var canvasSky = document.getElementById("canvasbackgroundSky");
    var canvasFloor = document.getElementById("canvasbackgroundFloor");
    var canvasCityMiddle = document.getElementById("canvasbackgroundCity");
    var canvasMoon = document.getElementById("canvasbackgroundMoon");
    var canvasGame = document.getElementById("canvasGame");
    var backGrounds = new BackGrounds(canvasFloor, canvasSky, canvasCityMiddle, canvasMoon)
    var selectPlayer = ''; 

    //new BackGrounds(canvasFloor, canvasSky, canvasCityMiddle, canvasMoon).start();

    
    //
    backGrounds.start();

    $( ".start-game" ).on( "click", function() {
      //if(selectPlayer){   
        $(".start-view").hide();
        new Game(canvasGame , backGrounds).start();
     // }
    });

    onKeyPress();
    onClickButtons();
  };


function onKeyPress(){
    $(document).keydown(function (e) {
      switch(e.keyCode) {
        case 37:
          selectLeftChracter();
          break;
        case 39:
        console.log("danjkdbakj")
          selectRighthracter();
          break;
      }
    });
};

function selectLeftChracter(){
  //$(".character-one-button").on( "click", function() {
    selectPlayer = 'robot';
    $('.character-one').addClass('selected-player');
    $('.character-two').removeClass('selected-player');
 // });
};

function selectRighthracter(){
  //$(".character-two-button").on( "click", function() {
    selectPlayer = 'human';
    $('.character-two').addClass('selected-player');
    $('.character-one').removeClass('selected-player');
 // });
};

function onClickButtons(){
  selectCharacter();
};

function selectCharacter(){
  $('.character-one').click(function (e) {
    selectLeftChracter();
  });

  $('.character-two').click(function (e) {
    selectRighthracter();
  });
};




  