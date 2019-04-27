var express = require('express')
var cors = require('cors')
var url = require('url');
var app = express();
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb"
});

app.use(cors())

app.get('/edit_student_profile/1', function (req, res, next) {
  var query_parse = url.parse(req.url, true);
  let information = query_parse.path.split("/");
  let user_id = information[2];
  let student_data = [], course_names = [], department_names = [];
  var sql = "SELECT stud_name, address, contact, mail FROM student WHERE user_id = ?";
  let data = [user_id];

  con.query(sql, data, function(err, result, fields) {
    if (err){
      res.json({"status" : 0, "data" : "Something went wrong"});
    } else {
      // res.json({"status" : 1, "data" : result});
      student_data = result;
      var sql = "SELECT course_id, course_name FROM courses";
      con.query(sql, function(err, result, fields) {
        if (err){
          res.json({"status" : 0, "data" : "Something went wrong"});
        } else {
          course_names = result;
          var sql = "SELECT dept_id, dept_name FROM department";
          con.query(sql, function(err, result, fields) {
            if (err){
              res.json({"status" : 0, "data" : "Something went wrong"});
            } else {
              department_names = result;
              res.json({"status" : 1, "student_data" : student_data, "course_names" : course_names, "department_names" : department_names});
            }
      });
        }
      });
    }
  });



  // res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.get('/view_student_profile/1', function (req, res, next) {
  var query_parse = url.parse(req.url, true);
  let information = query_parse.path.split("/");
  let user_id = information[2];

  var sql = "SELECT student.stud_name, student.address, student.contact, student.mail, department.dept_name, courses.course_name FROM student, courses, department WHERE student.user_id = ?";
  let data = [user_id];

  con.query(sql, data, function(err, result, fields) {
    if (err){
      res.json({"status" : 0, "data" : "Something went wrong"});
    } else {
      res.json({"status" : 1, "data" : result});
    }
  });


  // res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.get('/list_all_students', function (req, res, next) {
  var sql = "SELECT student.stud_name, student.curr_acad_yr, student.mail, user.active, courses.course_name FROM student, user, courses WHERE student.curr_course IN (SELECT courses.course_id from courses) AND student.user_id = user.user_id";

  con.query(sql, function(err, result, fields) {
    if (err){
      res.json({"status" : 0, "data" : "Something went wrong"});
    } else {
      res.json({"status" : 1, "data" : result});
    }
  });
})
  app.get('/project_details/1', function (req, res, next) {
  var sql = "SELECT project.proj_title,project.proj_desc,project.proj_sub_date,project.proj_domain,project.proj_technology,project.proj_status FROM student, user, project WHERE student.user_id = user.user_id";

  con.query(sql, function(err, result, fields) {
    if (err){
      res.json({"status" : 0, "data" : "Something went wrong"});
    } else {
      res.json({"status" : 1, "data" : result});
    }
  });


  // res.json({msg: 'This is CORS-enabled for all origins!'})
})
app.listen(8080, function () {
  // var host = server.address().address;
  // var port = server.address().port;
  console.log('CORS-enabled web server listening on port 8080')
})
