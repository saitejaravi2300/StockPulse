const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'database-1.cjmggseyglla.ap-south-1.rds.amazonaws.com',
  user: 'admin',
  password: '*********',
  database: 'stockdb'
});

db.connect((err)=>{
  if(err){
    console.log(err);
  }else{
    console.log('MySQL Connected');
  }
});

module.exports = db;
