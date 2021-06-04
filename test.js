// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'Kapil26@101995',
//   database : 'db'
// });
 
// connection.connect();
 
// connection.query('SELECT * FROM Plan;', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results);
// });
 
// connection.end();

// console.log(`${new Date().getMonth()}-${new Date().getDate()}`);
// console.group(new Date().toISOString().split('T')[0] + " "+new Date().toISOString().split('T')[1].split('.')[0])

// console.log((new Date("2021-05-24") - new Date("2021-05-24"))/(1000 * 60 * 60 * 24));

console.log(new Date(new Date("2021-05-20").getTime() + 12*24*60*60*1000));
// var currentDate = new Date();
// to add 4 days to current date
// currentDate.addDays(4);