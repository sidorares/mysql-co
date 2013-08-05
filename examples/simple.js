var mysql = require('..');

var co = require('co');
co(function *() {
  var db = mysql.createConnection({ user: 'root', database: 'test', password: ''});
  console.log( yield db.query("select 1+1 as qqq") );
  console.log( yield db.query("select 1+2 as qqq") );
  console.log( yield db.query("select 1+3 as qqq") );
  db.end();
});
