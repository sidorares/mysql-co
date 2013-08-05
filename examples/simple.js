var mysql = require('..');

var co = require('co');
co(function *() {
  var db = mysql.createConnection({ user: 'root', database: 'test', password: ''});
  console.log( yield db.query("select sleep1+1 as qqq") );
  console.log( yield db.query("select sleep1+2 as qqq") );
  console.log( yield db.query("select sleep1+3 as qqq") );
  db.end();
});
