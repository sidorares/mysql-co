// get connection from pool and log result of 3 queries
//
// note that queries are executed in parallel, but serialised sequentially
// due to mysql sequential nature. You get result in ~2 sec

var mysql = require('..');

var co = require('co');
co(function *() {
  var pool = mysql.createPool({ user: 'root', database: 'test', password: ''});
  var db = yield pool.getConnection();
  console.log(
    yield [
      db.query("select sleep(1) as qqq"),
      db.query("select sleep(1) as qqq"),
      db.execute("select 1+?", [123.45])
    ]
  );
  db.end();
});
