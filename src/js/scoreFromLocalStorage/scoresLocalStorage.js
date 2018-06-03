
function getScore() {

    var highScoresJson = localStorage.getItem('highScores');
    var highScores = JSON.parse(highScoresJson);
    return highScores;
}

function setScore( player , score){

    var objToPush = { player: player, date: getDate(), score:score};

    var highScoresJson = localStorage.getItem('highScores');
    var highScores = JSON.parse(highScoresJson);

    highScores.push(objToPush);
    
    localStorage.setItem('highScores', JSON.stringify(highScores));

}

function getDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    
    if(dd<10) {
        dd = '0'+dd
    } 
    
    if(mm<10) {
        mm = '0'+mm
    } 
    
    today = dd + '/' + mm + '/' + yyyy;
    return today;
}

