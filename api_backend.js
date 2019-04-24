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
    if (query_string.username && query_string.password && query_string.role) {
      insert_data(query_string.full_name, query_string.email, query_string.username,
        query_string.password, query_string.role,
        function(insert_id, message) {
          let display_message = '{"message" : "' + message +
            '", "status" : ' + insert_id +
            '}';
          res.end(display_message.toString());
        });
    } else {
      res.write("something wrong");
    }
  } else if (path == './login') {
    select_data(query_string.user, query_string.pass);
  } else if (path == './compose') {
    //insert mail details
    if (query_string.user_id) {
      insert_mail(query_string.user_id, query_string.email_to, query_string
        .email_cc, query_string.email_bcc, query_string.email_content,
        function(status, message) {
          let display_message = '{"message" : "' + message +
            '", "status" : "' + status + '"}';
          res.end(display_message.toString());
        });
    }
  } else {
    console.log("Invalid");
  }
}).listen(8080);

function return_query_status(status, message) {
  var output_message = '{"message" : "' + message + '", "status" : ' + status +
    '}';
  return output_message;
}

function insert_data(full_name, email, username, password, role, callback) {
  let sql = "INSERT INTO user(user_name, password, role) VALUES(?, ?, ?)";
  let data = [username, password, role];
  con.query(sql, data, function(err, result) {
    if (err) {
      callback(0, "Something went wrong");
    } else {
      if (role == "stud") {
        sql =
          "INSERT INTO student(user_id, stud_name, mail) VALUES (?, ?, ?)";
        data = [result.insertId.toString(), full_name, email];
      } else if (role == "guide") {
        sql =
          "INSERT INTO internal_guides(user_id, guide_name, mail) VALUES (?, ?, ?)";
        data = [result.insertId.toString(), full_name, email];
      } else if (role == "cood") {
        sql =
          "INSERT INTO dept_heads(user_id, head_name, mail) VALUES (?, ?, ?)";
        data = [result.insertId.toString(), full_name, email];
      }
      con.query(sql, data, function(err, result) {
        if (err) {
          callback(0, "Something went wrong");
        } else {
          callback(result.insertId.toString(), "Registration Success");
        }
      });
    }
  });
}

function insert_mail(user_id, email_to, email_cc, email_bcc, email_content,
  callback) {
  let sql = "";
  let data = [];
  con.query(sql, data,
    function(err, result, fields) {
      if (err) {
        // throw err;
        callback(0, "Something went wrong. Mail data not recorded")
      } else {
        callback(1, "Mail data recorded successfully")
      }
    });
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
