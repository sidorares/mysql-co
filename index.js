var mysql = require('mysql2');

function wrap (fn, ctx) {
  return function () {
    var args = [].slice.call(arguments);
    return function (done) {
      args.push(done);
      fn.apply(ctx, args);
    };
  };
}

var methods = [
  'query',
  'execute'
];

function wrapConnection(conn) {
  methods.forEach(function (name) {
    conn[name] = wrap(conn[name], conn);
  });
  return conn;
}

module.exports = {

  createConnection: function(opts) {
    return wrapConnection(mysql.createConnection(opts));
  },

  simplePool: function(opts) {
    var pool = mysql.createPool(opts);
    function wrapPooledFunc(func, sql, params) {
      return function(done) {
          pool.getConnection(function(err, connection) {
            if (err)
              return done(err);
            connection[func](sql, params, function(err, rows, fields, numStatements) {
              if (err)
                return done(err);
              connection.end();
              return done(null, rows, fields, numStatements);
            });
          });
      };
    }
    return {
      query: function(sql, params) {
        return wrapPooledFunc('query', sql, params);
      },
      execute: function(sql, params) {
        return wrapPooledFunc('execute', sql, params);
      },
      end: function() {
        pool.end();
      }
    };
  },

  createPool: function(opts) {
    var pool = mysql.createPool(opts);
    var getConn = pool.getConnection;
    var wrappedGetConnection = function() {
      return function(done) {
        getConn.call(pool, function(err, conn) {
          if (err) return done(err);
          return done(null, wrapConnection(conn));
        });
      };
    };
    pool.getConnection = wrappedGetConnection;
    return pool;
  }

};
