function DataBase() { };

DataBase.prototype.CreateDB = function () {

    var nombrecorto = 'ROD-DB';
    var version = '1.0';
    var nombrebase = 'RunOrDieDB';
    var size = 50 * 1024 * 1024;

    var db = openDatabase(nombrecorto, version, nombrebase, size);
   
    return db;
};

DataBase.prototype.Table = function () {

    var dataBase = this.CreateDB();
    // var createTable = 'CREATE TABLE IF NOT EXISTS Scores(id integer primary key,name text, date text, score text, bitcoins text';
    var createTable = 'CREATE TABLE IF NOT EXISTS Scores(name text, date text, score text, bitcoins text)';

    dataBase.transaction(function (tx) {
        tx.executeSql(createTable);
    });

    
};

DataBase.prototype.Select = function (sqlSelect) {
    var dataBase = this.CreateDB();
    var sqlSelect = 'SELECT * FROM Scores order by score desc';

    return new Promise((resolve, reject) => {
        dataBase.transaction(function (tx) {
            tx.executeSql(sqlSelect, [],function (tx, results) {        
                resolve(results.rows);
            }.bind(this));
        }.bind(this));
    });
}

DataBase.prototype.Insert = function (player, score, bitcoin) {
    var dataBase = this.CreateDB();
    var date = this.getDate();
    var sqlInsert = 'INSERT INTO Scores (name, date, score, bitcoins) VALUES(?,?,?,?)';
    console.log(player, score, bitcoin);
    dataBase.transaction(function (tx) {
        tx.executeSql(sqlInsert, [player, date, score, bitcoin]);
    });
};

DataBase.prototype.ClearDB = function (fila){
    var dataBase = this.CreateDB();
    sqlDelete = 'DELETE FROM Scores';
    dataBase.transaction(function(tx){       
        tx.executeSql(sqlDelete, [fila]);      
    });
};


DataBase.prototype.getDate = function () {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var hour = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = dd + '/' + mm + '/' + yyyy /*+ ' ' + hour + ':'+ min + ':' + sec*/;
    return today;
}