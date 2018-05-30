window.onload = function() {
    var canvasSky = document.getElementById("canvasbackgroundSky");
    var canvasFloor = document.getElementById("canvasbackgroundFloor");
    var canvasCityMiddle = document.getElementById("canvasbackgroundCity");
    var canvasMoon = document.getElementById("canvasbackgroundMoon");
    var canvasGame = document.getElementById("canvasGame");

    var selectPlayer = ''; 

    new BackGrounds(canvasFloor, canvasSky, canvasCityMiddle, canvasMoon).start();

    $(".start-view").hide();
    new Game(canvasGame).start();
    //new BackGrounds(canvasFloor, canvasSky, canvasCityMiddle, canvasMoon).start();



    $( ".start-game-button button" ).on( "click", function() {
      if(selectPlayer){   
        
      }
    });


    $(".character-one-button").on( "click", function() {
      selectPlayer = 'robot';
      $('.character-one').addClass('selected-player');
      $('.character-two').removeClass('selected-player');
    });
    
    $(".character-two-button").on( "click", function() {
      selectPlayer = 'human';
      $('.character-two').addClass('selected-player');
      $('.character-one').removeClass('selected-player');
    });



  };