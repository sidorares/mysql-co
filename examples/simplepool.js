// each query result in it's own connection from pool
// all 3 sql statements executed in parallel in 3 different connections

var mysql = require('..');

var co = require('co');
co(function *() {
  var db = mysql.simplePool({ user: 'root', database: 'test', password: ''});
  console.log(
    yield [
      db.query("select sleep(1) as qqq"),
      db.query("select sleep(1) as qqq"),
      db.execute("select 1+?", [123.45])
    ]
  );
  db.end();
});
