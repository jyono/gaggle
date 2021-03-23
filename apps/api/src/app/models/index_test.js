// const { Client } = require('pg')
// const client = new Client()
// client.connect()
// client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//   console.log(err ? err.stack : res.rows[0].message) // Hello World!
//   client.end()
// })

// const { Client } = require('pg')
// const client = new Client()

// async function helloWorld() {
//   await client.connect()
  
//   const res = await client.query('SELECT $1::text as message', ['Hello world!'])
//   console.log(res.rows[0].message) // Hello world!
//   await client.end()
// }

// helloWorld();

const pg = require('pg');

const pgConfig = {
    user: 'postgres',           // 数据库用户名
    database: 'test',       // 数据库
    password: 'postgres',       // 数据库密码
    host: 'localhost',        // 数据库所在IP
    port: '5432'                // 连接端口
};
const pool = new pg.Pool(pgConfig);

pool.connect(function(error, client, done) {
    let sqlStr = 'SELECT * FROM company';      // 查表的SQL语句
    client.query(sqlStr, [], function(err, response) {
        done();
        console.log(response)  		  // 根据SQL语句查出的数据
    })
})