var express = require('express')
var cors = require('cors')
var url = require('url');
var mysql = require('mysql');

var app = express();
app.use(cors());
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "manisha_pms"
});

app.get('/edit_student_profile/:user_id', function (req, res, next) {
  let user_id = req.params.user_id;
  let student_data = [], course_names = [], department_names = [];
  var sql = "SELECT stud_name, address, contact, mail, curr_course, dept_id FROM student WHERE user_id = ?";
  let data = [user_id];

  con.query(sql, data, function(err, result, fields) {
    if (err){
      res.json({"status" : 0, "data" : "Something went wrong"});
    } else {
      if(result.length == 1){
        student_data = result;
        var sql = "SELECT course_id, course_name FROM courses";
        con.query(sql, data, function(err, result, fields) {
          if (err){
            res.json({"status" : 0, "data" : "Something went wrong"});
          }
          else {
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
      else {
        res.json({"status" : 0, "data" : "No data retrieved"});
      }
    }
  });
});

app.get('/view_student_profile/:user_id', function (req, res, next) {
  let user_id = req.params.user_id;

  var sql = "SELECT student.stud_name, student.address, student.contact, student.mail, department.dept_name, courses.course_name FROM student, courses, department WHERE student.user_id = ?";
  let data = [user_id];

  con.query(sql, data, function(err, result, fields) {
    if (err){
      res.json({"status" : 0, "data" : "Something went wrong"});
    } else {
      if(result.length == 1){
        res.json({"status" : 1, "data" : result});
      } else {
        res.json({"status" : 0, "data" : "No data retrieved"});
      }
    }
  });
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
});

app.get('/project_details/1', function (req, res, next) {
  // let user
  var sql = "SELECT project.proj_title, project.proj_desc, project.proj_sub_date, project.proj_domain, project.proj_technology, project.proj_status FROM student, user, project WHERE project.user_id = 1 AND user.user_id = 1 AND student.user_id = 1 AND project.project_visible = 'visible';"

  con.query(sql, function(err, result, fields) {
    if (err){
      res.json({"status" : 0, "data" : "Something went wrong"});
    } else {
      res.json({"status" : 1, "data" : result});
    }
  });
})

app.get('/login/:username/:password', function (req, res, next) {
  let username = req.params.username;
  let password = req.params.password;

  var sql = "SELECT user_id, role, active FROM user WHERE user_name = ? AND password = ?";
  let data = [username, password];

  con.query(sql, data, function(err, result, fields) {
    if (err){
      res.json({"status" : 0, "message" : "Something went wrong"});
    } else {
      console.log(result);
      if(result.length == 1){
        let active = result[0].active;
        if(active == "1") {
          res.json({"status" : 1, "data" : result});
        }
        else {
          res.json({"status" : 0, "message" : "User is not currenty active"});
        }
      } else {
        res.json({"status" : 0, "data" : "No data retrieved"});
      }
    }
  });
});

app.get("/update_student_profile/:user_id/:full_name/:email/:contact/:address/:course/:department",function (req, res, next) {

  let user_id = req.params.user_id;
  let full_name = req.params.full_name;
  let email = req.params.email;
  let contact = req.params.contact;
  let course = req.params.course;
  let department = req.params.department;

  let sql = "UPDATE student SET stud_name = ?, address = ?, contact = ?, mail = ?, curr_course = ?, dept_id = ? WHERE user_id = ?";
  let data = [full_name.trim(), address.trim(), contact.trim(), email.trim(), course.trim(), department.trim(), user_id];

  con.query(sql, data, function(err, result, fields) {
    if (err){
      res.json({"status" : 0, "data" : "Something went wrong"});
    } else {
      res.json({"status" : 1, "data" : "Student profile updated succesfully"});
    }
  });
});

app.get("/add_project_topic/:user_id/:project_title/:project_domains/:project_technologies/:project_description",function (req, res, next) {

  let user_id = req.params.user_id;
  let project_title = req.params.project_title;
  let project_domains = req.params.project_domains;
  let project_technologies = req.params.project_technologies;
  let project_description = req.params.project_description;

  let sql = "INSERT INTO project(user_id, proj_title, proj_desc, proj_sub_date, proj_domain, proj_technology) VALUES(?, ?, ?, ?, ?, ?)";

  let current_date = new Date();
  let date_time = current_date.getDate() + "/"
                + (current_date.getMonth() + 1)  + "/"
                + current_date.getFullYear() + " @ "
                + current_date.getHours() + ":"
                + current_date.getMinutes();

  let data = [user_id, project_title, project_description.trim(), date_time, project_domains, project_technologies];

  con.query(sql, data, function(err, result, fields) {
    if (err){
      res.json({"status" : 0, "data" : "Something went wrong"});
    } else {
      res.json({"status" : 1, "data" : "Project added succesfully"});
    }
  });
});

app.get("/insert_mail/:user_id/:mail_to/:subject/:cc/:bcc/:content/:attachment",function (req, res, next) {

  let user_id = req.params.user_id;
  let mail_to = req.params.mail_to;
  let subject = req.params.subject;
  let cc= req.params.cc;
  let bcc = req.params.bcc;
  let content = req.params.content;
  let attachment = req.params.attachment;
  let current_date = new Date();
  let date_time = current_date.getDate() + "/"
                + (current_date.getMonth() + 1)  + "/"
                + current_date.getFullYear() + " @ "
                + current_date.getHours() + ":"
                + current_date.getMinutes();

  let sql = "INSERT INTO mail(user_id, toaddr, sub, cc, bcc, content, timestamp, attachment) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
  let data = [user_id, mail_to, subject, cc, bcc, content, date_time, attachment];
  con.query(sql, data, function(err, result)
  {
    if (err)
    {
      res.json({"status" : 0, "data" : "Something went wrong"});
    } else
    {
      res.json({"status" : 1, "data" : "Mail send sccessfully"});
    }
  }
);
});

app.get("/insert_user/:fullname/:username/:password/:email/:role",function (req, res, next) {

  let full_name = req.params.fullname;
  let username = req.params.username;
  let password= req.params.password;
  let email = req.params.email;
  let role= req.params.role;
   let sql = "INSERT INTO user(username, password, role) VALUES(?, ?, ?)";
  let data = [username, password, role];
  con.query(sql, data, function(err, result)
  {
    if (err)
    {
      res.json({"status" : 0, "data" : "Something went wrong"});
    } else
    {
      if(role == 'stud')
      {
        sql = "INSERT INTO student(user_id, stud_name, mail) VALUES (?, ?, ?)";
        data = [result.insertId.toString(), full_name, email];
        con.query(sql, data, function(err, result)
        {
         if (err)
          {
            res.json({"status" : 0, "data" : "Something went wrong"});
          }
          else
          {
             res.json({"status" : 1, "data" : "User inserted sccessfully"});
          }
        });
       }
       else if(role == 'cood')
       {
          sql = "INSERT INTO dept_head(user_id, head_name, mail) VALUES (?, ?, ?)";
          data = [result.insertId.toString(), full_name, email];
          con.query(sql, data, function(err, result)
          {
            if (err)
            {
               res.json({"status" : 0, "data" : "Something went wrong"});
            }
            else
            {
               res.json({"status" : 1, "data" : "User inserted sccessfully"});
            }
          });
       }
       else
       {
         sql = "INSERT INTO internal_guide(user_id, guide_name, mail) VALUES (?, ?, ?)";
          data = [result.insertId.toString(), full_name, email];
          con.query(sql, data, function(err, result)
          {
            if (err)
            {
               res.json({"status" : 0, "data" : "Something went wrong"});
            }
            else
            {
               res.json({"status" : 1, "data" : "User inserted sccessfully"});
            }
          });
       }
       }
      }
);
});

app.get("/fetch_mail/:user_id",function (req, res, next) {

  let user_id = req.params.user_id;

  let sql = "SELECT mail.*, student.stud_name as name FROM mail, student WHERE mail.user_id = ? AND student.user_id = ? AND mail_visible = '1'";
  let data = [user_id, user_id];
  con.query(sql, data, function(err, result) {
    if (err) {
      res.json({"status" : 0, "data" : "Something went wrong"});
    } else {
      if (result.length > 0) {
        res.json({"status" : 1, "data": result, "mail_count" : result.length});
      }
      else {
        res.json({"status" : 0, "data" : "Something went wrong"});
      }
     }
   }
 );
  });

app.listen(8080, function () {
  // var host = server.address().address;
  // var port = server.address().port;
  console.log('CORS-enabled web server listening on port 8080')
})
