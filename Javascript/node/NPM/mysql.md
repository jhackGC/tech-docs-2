# package

npm i -S mysql2

# Troubleshooting
While using a MySQL server community 8.X

    Error: Client does not support authentication protocol requested by server; consider upgrading
    MySQL client


run this on my sql server

alter user 'USER'@'localhost' identified with mysql_native_password by 'PASSWORD'

e.g.

alter user 'root'@'localhost' identified with mysql_native_password by 'j89((_Hack90'


# connection and


// mysql connection
const connection = mysql.createConnection(config.MYSQL_LOCAL);
connection.connect( (err) =>{
    if (err) throw err;
    console.time('mysql');
    console.info('Connected to MYSQL');
});

// test it

function testMySQL(connection){
    const sql = 'select * from trx';
    connection.query(sql, [], (err, results, fields)=>{
        if (err) throw err;
        console.info(results.map(row=> row.id));
        console.timeEnd('mysql');
        connection.end();
        console.info('Connection to MYSQL closed');
    });
}

testMySQL(connection);
