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
    user: 'postgres',           
    database: 'test',       
    password: 'postgres',       
    host: 'localhost',        
    port: '5432'              
};
const pool = new pg.Pool(pgConfig);

pool.connect(function(error, client, done) {
    let sqlStr = 'SELECT * FROM company';      
    client.query(sqlStr, [], function(err, response) {
        done();
        console.log(response)  		  
    })
})