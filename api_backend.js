var mysql = require('mysql');
var http = require('http');
var url = require('url');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "manisha_pms"
});
//http://localhost:8080/login?user=value&pass=value || http://localhost:8080/login?user=value&pass=value
http.createServer(function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  var query_parse = url.parse(req.url, true);
  var path = "." + query_parse.pathname;
  var query_string = query_parse.query;

  if (path == './register') {
    if (query_string.username && query_string.password) {
      insert_data(query_string.full_name, query_string.email, query_string.username, query_string.password, function(insert_id, message) {
        let display_message = '{"message" : "' + message +
          '", "status" : ' + insert_id +
          '}';
        res.end(display_message.toString());
      });
    } else {
      res.write("something wrong");
    }
  } else if (path == './login') {
    select_data(qdata.user, qdata.pass);
  } else {
    console.log("Invalid");
  }
}).listen(8080);

function return_query_status(status, message) {
  var output_message = '{"message" : "' + message + '", "status" : ' + status +
    '}';
  return output_message;
}

function insert_data(full_name, email, username, password, callback) {
  let sql = "INSERT INTO user(user_name, password) VALUES(?, ?)";
  let data = [username, password];
  con.query(sql, data, function(err, result)
  {
    if (err)
    {
      callback(0, "Something went wrong");
    } else
    {
      sql = "INSERT INTO student(user_id, stud_name, mail) VALUES (?, ?, ?)";
      data = [result.insertId.toString(), full_name, email];
      con.query(sql, data, function(err, result)
      {
        if (err)
        {
          callback(0, "Something went wrong");
        }
        else
        {
          callback(result.insertId.toString(), "Registration Success");
        }
      });
    }
  }
);
}

function select_data(user, pass) {
  var sql = "SELECT user_id FROM login WHERE user_name = ? AND password = ?";
  let data = [user, pass];
  con.query(sql, data,
    function(err, result, fields) {
      if (err) throw err;
      if (result.length == '1')
        console.log("Successful login!!");
      else
        console.log("Register");
    });
}
