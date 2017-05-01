## Deprecated. Starting from 1.0-rc3 node-mysql2 [includes promise api](https://github.com/sidorares/node-mysql2#promise-wrappers) an can be used direcly

[![Greenkeeper badge](https://badges.greenkeeper.io/sidorares/mysql-co.svg)](https://greenkeeper.io/)

# mysql-co

[mysql](https://github.com/sidorares/node-mysql2) wrappers for
[co](https://github.com/visionmedia/co).

Currently you have to pass the flag `--harmony-generators` to node and need at
least version `0.11.0`.

## Usage

```js
var mysql = require('mysql-co');

var co = require('co');
co(function *() {
  var db = mysql.createConnection({ user: 'root', database: 'test', password: ''});
  console.log( yield db.query("select 1+1 as qqq") );
  console.log( yield db.query("select 1+2 as qqq") );
  console.log( yield db.query("select 1+3 as qqq") );
  db.end();
});

```

## Installation

With [npm](https://npmjs.org) do:

```bash
npm install mysql-co
```

## License

(MIT)

Copyright (c) 2013 Andrey Sidorov &lt;sidorares@yandex.ru&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
