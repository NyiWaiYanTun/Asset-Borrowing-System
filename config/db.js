const mysql = require('mysql2');
const con= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'asset_borrowing_system'
});
// exports the connection to be used from othe files;
module.exports= con;