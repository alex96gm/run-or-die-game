
function LocalStorageScore(){ }


LocalStorageScore.prototype.getScore = function() {
    return JSON.parse(localStorage.getItem('highScores'));;
}

LocalStorageScore.prototype.setScore = function (player, score , bitcoin) {
    var highScores = [];
    var objToPush = { player: player, date: getDate(), score: score , bitcoin: bitcoin};
    var scoreObject = JSON.parse(localStorage.getItem('highScores'));

    if (scoreObject) {
        scoreObject.forEach(element => {
            highScores.push(element)
        });
        highScores.push(objToPush);
    } else {
        highScores.push(objToPush);
    }

    highScores = highScores.sort(function (item1, item2) {
        return item2.score - item1.score;
    });

    localStorage.setItem('highScores', JSON.stringify(highScores));
}

function getDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var hour = today.getHours();
    var min = today.getMinutes();
    var sec =today.getSeconds();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = dd + '/' + mm + '/' + yyyy /*+ ' ' + hour + ':'+ min + ':' + sec*/;
    return today;
}

