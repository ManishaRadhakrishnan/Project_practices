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
  var sql = "SELECT stud_name as name, address, contact, mail, curr_course, dept_id, curr_acad_yr FROM student WHERE user_id = ?";
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

app.get('/edit_cood_profile/:user_id', function (req, res, next) {
  let user_id = req.params.user_id;
  let student_data = [], course_names = [], department_names = [];
  var sql = "SELECT head_name as name, address, contact, mail, course_id, dept_id FROM dept_heads WHERE user_id = ?";
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

app.get('/edit_guide_profile/:user_id', function (req, res, next) {
  let user_id = req.params.user_id;
  let student_data = [], course_names = [], department_names = [];
  var sql = "SELECT guide_name as name, address, contact, mail, course_id, dept_id FROM internal_guides WHERE user_id = ?";
  let data = [user_id];

  con.query(sql, data, function(err, result, fields) {
    if (err){

      //res.json({"status" : 0, "data" : "Something went wrong"});
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

  var sql = "SELECT student.stud_name as name, student.address, student.contact, student.mail, student.curr_acad_yr, department.dept_name, courses.course_name FROM student, courses, department WHERE student.user_id = ?";
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

app.get('/view_cood_profile/:user_id', function (req, res, next) {
  let user_id = req.params.user_id;

  var sql = "SELECT dept_heads.head_name as name, dept_heads.address, dept_heads.contact, dept_heads.mail, department.dept_name, courses.course_name FROM dept_heads, courses, department WHERE dept_heads.user_id = ?";
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

app.get('/view_guide_profile/:user_id', function (req, res, next) {
  let user_id = req.params.user_id;

  var sql = "SELECT internal_guides.guide_name as name, internal_guides.address, internal_guides.contact, internal_guides.mail, department.dept_name, courses.course_name FROM internal_guides, courses, department WHERE internal_guides.user_id = ?";
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
      if (result.length > 0) {
        res.json({"status" : 1, "data" : result});
      }
      else {
        res.json({"status" : 0, "data" : "No users present"});
      }
    }
  });
});

app.get('/project_details/:user_id', function (req, res, next) {
  let user_id = req.params.user_id;
  let sql = "SELECT project.proj_id, project.proj_title, project.proj_desc, project.proj_sub_date, project.proj_domain, project.proj_technology, project.proj_status FROM student, user, project WHERE project.user_id = ? AND user.user_id = ? AND student.user_id = ? AND project.project_visible = 'visible';"
  let data = [user_id, user_id, user_id];
  con.query(sql, data, function(err, result, fields) {

    if (err){
      res.json({"status" : 0, "data" : "Something went wrong"});
    } else {
      if(result.length > 0){
        res.json({"status" : 1, "data" : result});
      }
      else {
        res.json({"status" : 0, "data" : "No projects to show"});
      }
    }
  });
})
//m
//project-update
app.get('/all_guide_details', function (req, res, next) {
  let user_id = req.params.user_id;
  let sql = "SELECT guide_id, guide_name FROM internal_guides;"
  con.query(sql, function(err, result, fields) {
    if (err){
      res.json({"status" : 0, "data" : "Something went wrong"});
    } else {
      if(result.length > 0){
        res.json({"status" : 1, "data" : result});
      }
      else {
        res.json({"status" : 0, "data" : "No guides to show"});
      }
    }
  });
})

app.get('/project_details_update/:user_id', function (req, res, next) {
  let user_id = req.params.user_id;
  let sql = "UPDATE project.proj_title, project.proj_desc, project.proj_domain, project.proj_technology,  FROM student, user, project WHERE project.user_id = ? AND user.user_id = ? AND student.user_id = ? AND project.project_visible = 'visible';"
  let data = [user_id, user_id, user_id];
  con.query(sql, data, function(err, result, fields) {

    if (err){
      res.json({"status" : 0, "data" : "Something went wrong"});
    } else {
      if(result.length > 0){
        res.json({"status" : 1, "data" : result});
      }
      else {
        res.json({"status" : 0, "data" : "No projects to show"});
      }
    }
  });
})

app.get('/student_project_details/:user_id', function(req,res,next){
  let user_id = req.params.user_id;
  let sql = "SELECT project.user_id,project.proj_id,project.proj_title, project.proj_desc, project.proj_sub_by, project.proj_sub_date, project.proj_domain, project.proj_technology,project.proj_status FROM project, student WHERE project.proj_status = 'approved' AND student.guide_id = ? AND project.project_visible='visible'"
  let data = [user_id];
  con.query(sql, data, function(err, result, fields) {

    if (err){
      res.json({"status" : 0, "data" : "Something went wrong"});
    } else {
      if(result.length > 0){
        res.json({"status" : 1, "data" : result});
      }
      else {
        res.json({"status" : 0, "data" : "No projects to show"});
      }
    }
  });
})

app.get('/all_project_details', function(req,res,next){
  // let user_id = req.params.user_id;
  let sql = "SELECT project.user_id,project.proj_id,project.proj_title, project.proj_desc, project.proj_sub_by, project.proj_sub_date, project.proj_domain, project.proj_technology,project.proj_status,student.stud_name as name, domain.domain_name as domain FROM project,student,domain WHERE project.project_visible='visible' AND project.user_id=student.user_id AND domain.domain_id=project.proj_domain"
  con.query(sql, function(err, result, fields) {

    if (err){
      res.json({"status" : 0, "data" : "Something went wrong"});
    } else {
      if(result.length > 0){
        res.json({"status" : 1, "data" : result});
      }
      else {
        res.json({"status" : 0, "data" : "No projects to show"});
      }
    }
  });
})

app.get('/login/:username/:password', function (req, res, next) {
  let username = req.params.username;
  let password = req.params.password;

    var sql = "SELECT user_id, role, active, user_name  FROM user WHERE user_name = ? AND password = ?";
    let data = [username, password];

    con.query(sql, data, function(err, result, fields) {
    if (err){
      res.json({"status" : 0, "message" : "Something went wrong"});
    } else {
      if(result.length == 1){
        let active = result[0].active;
        if(active == "1") {
          let user_id = result[0].user_id;
          let role = result[0].role;
          let username = result[0].user_name;
          res.json({"status" : 1, "user_id" : user_id, "role" : role, "user_name" : username});
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

app.get("/update_student_profile/:user_id/:full_name/:email/:contact/:address/:course/:department/:academic",function (req, res, next) {

  let user_id = req.params.user_id;
  let full_name = req.params.full_name;
  let email = req.params.email;
  let contact = req.params.contact;
  let course = req.params.course;
  let department = req.params.department;
  let address = req.params.address;
  let academic = req.params.academic;
  var sql = "UPDATE student SET stud_name = ?, address = ?, contact = ?, mail = ?, curr_course = ?, dept_id = ?, curr_acad_yr = ? WHERE user_id = ?";
  let data = [full_name.trim(), address.trim(), contact.trim(), email.trim(), course.trim(), department.trim(), academic.trim(), user_id];

  con.query(sql, data, function(err, result, fields) {

    if (err){
      console.log(err);
      res.json({"status" : 0, "data" : "Something went wrong"});
    } else {
      // res.json({"status" : 1, "data" : "Student profile updated succesfully"});
      sql = "SELECT COUNT(curr_course) as count FROM student WHERE curr_course = ?";
      let data =[course.trim()];
      con.query(sql, data, function(err, result, fields) {
        if (err){
          res.json({"status" : 0, "data" : "Something went wrong"});
        } else {
          sql = "UPDATE courses SET no_of_stud_enrol = ? WHERE course_id = ?";
          let data = [result[0]['count'], course.trim()];

          con.query(sql, data, function(err, result, fields) {
            if (err){
              console.log(err);
              res.json({"status" : 0, "data" : "Something went wrong"});
            } else {
              res.json({"status" : 1, "data" : "Course count updated succesfully"});
            }
          });
        }
      });
    }
  });


});

app.get("/update_cood_profile/:user_id/:full_name/:email/:contact/:address/:course/:department",function (req, res, next) {

  let user_id = req.params.user_id;
  let full_name = req.params.full_name;
  let email = req.params.email;
  let contact = req.params.contact;
  let course = req.params.course;
  let department = req.params.department;
  let address = req.params.address;

  let sql = "UPDATE dept_heads SET head_name = ?, address = ?, contact = ?, mail = ?, course_id = ?, dept_id = ? WHERE user_id = ?";
  let data = [full_name.trim(), address.trim(), contact.trim(), email.trim(), course.trim(), department.trim(), user_id];

  con.query(sql, data, function(err, result, fields) {
    if (err){
      res.json({"status" : 0, "data" : "Something went wrong"});
    } else {
      res.json({"status" : 1, "data" : "Coordinator profile updated succesfully"});
    }
  });
});

app.get("/update_guide_profile/:user_id/:full_name/:email/:contact/:address/:course/:department",function (req, res, next) {

  let user_id = req.params.user_id;
  let full_name = req.params.full_name;
  let email = req.params.email;
  let contact = req.params.contact;
  let course = req.params.course;
  let department = req.params.department;
  let address = req.params.address;

  let sql = "UPDATE internal_guides SET guide_name = ?, address = ?, contact = ?, mail = ?, course_id = ?, dept_id = ? WHERE user_id = ?";
  let data = [full_name.trim(), address.trim(), contact.trim(), email.trim(), course.trim(), department.trim(), user_id];

  con.query(sql, data, function(err, result, fields) {
    if (err){
      res.json({"status" : 0, "data" : "Something went wrong"});
    } else {
      res.json({"status" : 1, "data" : "Guide profile updated succesfully"});
    }
  });
});

app.get("/add_project_topic/:user_id/:project_title/:project_domains/:project_technologies/:project_description/:_continue",function (req, res, next) {

  let user_id = req.params.user_id;
  let project_title = req.params.project_title;
  let project_domains = req.params.project_domains;
  let project_technologies = req.params.project_technologies;
  let project_description = req.params.project_description;
  let _continue = req.params._continue;
  let project_domains_list = project_domains.split(",");

  let sql = "";
  let data = [];
  let domain_id_for_project_table = [];
  let count = 0;
  let count_again = 0;
  for(number=0;number < project_domains_list.length;number ++) {
    sql = "SELECT * FROM domain WHERE domain_name = ?";
    let domain = project_domains_list[number].trim();
    data = [domain];
    con.query(sql, data, function(err, result) {
    if (err)
    {
      res.json({"status" : 0, "data" : "Error 505 : Something went wrong"});
    } else
    {
      if(result.length == 0) {
        sql = "INSERT INTO domain(domain_name) VALUES (?)";
        data = [domain];

        con.query(sql, data, function(err, result, fields) {
          if (err){
            res.json({"status" : 0, "data" : "Error 514 : Something went wrong"});
          } else {
            if(_continue == "false") {
              domain_id_for_project_table.push(result["insertId"]);

            sql = "SELECT count(*) as count FROM project WHERE proj_title LIKE '%" + project_title + "%' AND '%" + project_technologies + "%'";
            console.log(sql);
            con.query(sql, function(err, result, fields) {
              if (err){
                console.log(err);
                res.json({"status" : 0, "data" : "Something went wrong"});
              } else {
                  if(result[0]["count"] == 0) {
                    count_again += 1
                    if(count_again == project_domains_list.length) {
                      sql = "INSERT INTO project(user_id, proj_title, proj_desc, proj_sub_date, proj_domain, proj_technology) VALUES(?, ?, ?, ?, ?, ?)";

                      let current_date = new Date();
                      let date_time = current_date.getDate() + "/"
                      + (current_date.getMonth() + 1)  + "/"
                      + current_date.getFullYear() + " @ "
                      + current_date.getHours() + ":"
                      + current_date.getMinutes();

                      let data = [user_id, project_title, project_description.trim(), date_time, domain_id_for_project_table.join(","), project_technologies];

                      con.query(sql, data, function(err, result, fields) {
                        if (err){
                          res.json({"status" : 0, "data" : "Something went wrong"});
                        } else {
                          res.json({"status" : 1, "data" : "Domain inserted. Project added", "unique" : true});
                        }
                      });

                    }
                  }
                  else {
                    res.json({"status" : 1, "data" : "Domain inserted. Project not added", "unique" : false, "number_of_similar_projects" : result});
                  }
              }
            });
          }
          else {
            if(_continue == "false") {
              count_again += 1
              if(count_again == project_domains_list.length) {
                sql = "INSERT INTO project(user_id, proj_title, proj_desc, proj_sub_date, proj_domain, proj_technology) VALUES(?, ?, ?, ?, ?, ?)";

                let current_date = new Date();
                let date_time = current_date.getDate() + "/"
                + (current_date.getMonth() + 1)  + "/"
                + current_date.getFullYear() + " @ "
                + current_date.getHours() + ":"
                + current_date.getMinutes();

                let data = [user_id, project_title, project_description.trim(), date_time, domain_id_for_project_table.join(","), project_technologies];

                con.query(sql, data, function(err, result, fields) {
                  if (err){
                    res.json({"status" : 0, "data" : "Something went wrong"});
                  } else {
                    res.json({"status" : 1, "data" : "Domain inserted. Project added", "unique" : true});
                  }
                });
              }
            }
          }
        }
      });
    }
      else {
        domain_id_for_project_table.push(result[0]["domain_id"]);
        count += 1;
        // console.log(count + " : " + project_domains_list.length);
        if(count == project_domains_list.length) {
          sql = "SELECT count(*) as count FROM project WHERE proj_title LIKE '%" + project_title + "%' AND proj_technology LIKE '%" + project_technologies + "%'";
          console.log(sql);
          con.query(sql, function(err, result, fields) {
            if (err){
              console.log(err);
              res.json({"status" : 0, "data" : "Error 558 : Something went wrong"});
            } else {
                if(result[0]["count"] == 0) {
                  sql = "INSERT INTO project(user_id, proj_title, proj_desc, proj_sub_date, proj_domain, proj_technology) VALUES(?, ?, ?, ?, ?, ?)";

                  let current_date = new Date();
                  let date_time = current_date.getDate() + "/"
                                + (current_date.getMonth() + 1)  + "/"
                                + current_date.getFullYear() + " @ "
                                + current_date.getHours() + ":"
                                + current_date.getMinutes();

                  let data = [user_id, project_title, project_description.trim(), date_time, domain_id_for_project_table.join(","), project_technologies];

                  con.query(sql, data, function(err, result, fields) {
                    if (err){
                      res.json({"status" : 0, "data" : "Error 574 : Something went wrong"});
                    } else {
                      res.json({"status" : 1, "data" : "Domain inserted. Project added", "unique" : true});
                    }
                  });
                }
                else {
                  res.json({"status" : 1, "data" : "Domain inserted. Project not added", "unique" : false,  "number_of_similar_projects" : result});
                }
            }
          });
        }
      }
    }
  });
  }

});

app.get("/insert_mail/:user_id/:mail_to/:subject/:cc/:bcc/:content/:attachment",function (req, res, next) {

  let user_id = req.params.user_id;
  let mail_to = req.params.mail_to;
  let subject = req.params.subject;
  let cc = req.params.cc;
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
  con.query(sql, data, function(err, result) {

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
  let current_date = new Date();
  let date_time = current_date.getFullYear() + "-" + current_date.getFullYear()+1;
  let month = current_date.getMonth();
  if(month >= 8 && month <=12){

    let sql = "INSERT INTO user(user_name, password, role) VALUES(?, ?, ?)";
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
          sql = "INSERT INTO student(user_id, stud_name, mail, curr_acad_yr) VALUES (?, ?, ?, ?)";
          data = [result.insertId.toString(), full_name, username, date_time];
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
          sql = "INSERT INTO dept_heads(user_id, head_name, mail) VALUES (?, ?, ?)";
          data = [result.insertId.toString(), full_name, username];
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
          sql = "INSERT INTO internal_guides(user_id, guide_name, mail) VALUES (?, ?, ?)";
          data = [result.insertId.toString(), full_name, username];
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
  }
  else{
      res.json({"status" : 0, "data" : "Can't register as given time expired"});
  }
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

app.get("/do_suggestion/:user_id/:student_id/:project_id/:suggestion",function (req, res, next) {

  let user_id = req.params.user_id;
  let proj_id = req.params.project_id;
  let stud_id = req.params.student_id;
  let suggestion = req.params.suggestion;
  let current_date = new Date();
  let date_time = current_date.getDate() + "/"
                + (current_date.getMonth() + 1)  + "/"
                + current_date.getFullYear();

  let sql = "INSERT INTO suggestions(guide_user_id, stud_user_id, proj_id, suggestion, date) VALUES (?, ?, ?, ?, ?)"
  let data = [user_id, stud_id,  proj_id, suggestion, date_time];
  con.query(sql, data, function(err, result) {
    if (err) {
      res.json({"status" : 0, "data" : "Something went wrong"});
    }else{
      res.json({"status" : 1, "data" : "Suggestion inserted successfully"});
    }
   }
 );
  });

app.get("/select_suggestion/:user_id",function (req, res, next) {

  let user_id = req.params.user_id;
  // let proj_id = req.params.proj_id;
  // let stud_id = req.params.stud_id;
  var sql = "SELECT suggestions.proj_id,suggestions.suggestion, suggestions.date, project.proj_title from suggestions, student, project WHERE suggestions.proj_id = project.proj_id and project.proj_status = 'approved' AND suggestions.stud_user_id = student.user_id and student.user_id = ? ORDER BY date DESC";

  let data = [user_id];
  con.query(sql, data, function(err, result) {
    if (err) {
      res.json({"status" : 0, "data" : "Something went wrong"});
    }else{
      res.json({"status" : 1, "data" : result});
    }
   }
 );
  });

app.get("/inbox_mail/:mail",function (req, res, next) {

    let user_id = req.params.user_id;
    let to_user_email_id = req.params.mail;
    let sql = "SELECT mail.*, student.stud_name as name FROM mail, student WHERE mail.toaddr = ? AND mail.user_id = student.user_id AND mail.mail_visible = '1'";
    let data = [to_user_email_id];
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
     });
    });

app.get("/sent_mail/:user_id",function (req, res, next) {

  let user_id = req.params.user_id;
  let sql = "SELECT *, student.stud_name as name FROM mail, student WHERE mail.user_id = ? AND student.user_id = ? AND mail.mail_visible= '1'";
  let data = [user_id, user_id];
  con.query(sql, data, function(err, result) {
    if (err) {
      res.json({"status" : 0, "data" : "Something went wrong"});
    } else {
      if (result.length > 0) {
        res.json({"status" : 1, "data": result, "mail_count" : result.length});
      }else {
        res.json({"status" : 0, "data" : "Something went wrong"});
      }
    }
  }
  );
});

app.get("/move_mail/:mail_id",function (req, res, next) {

  let mail_id = req.params.mail_id;
  let sql = "UPDATE mail SET mail_visible= '0' WHERE mail_id = ?";
  let data = [mail_id];
  con.query(sql, data, function(err, result) {
    if (err) {
      res.json({"status" : 0, "data" : "Something went wrong"});
    } else {
      if (result.affectedRows == 1) {
        res.json({"status" : 1, "data": "Data updated successfully"});
      }else {
        res.json({"status" : 0, "data" : "Something went wrong"});
      }
    }
  }
  );
});

app.get("/trash_mail/:mail/:user_id",function (req, res, next) {
  let mail = req.params.mail;
  let user_id = req.params.user_id;
  let sql = "SELECT *, student.stud_name as name FROM mail, student WHERE mail.mail_visible= '0' AND mail.user_id = ? AND student.user_id = ? OR mail.toaddr = ?";
  let data = [user_id,user_id,mail];
  con.query(sql, data, function(err, result) {
    if (err) {
      res.json({"status" : 0, "data" : "Something went wrong"});
    } else {
        res.json({"status" : 1, "data" : result});
      }
  }

  );
});

app.listen(8080, function () {
  // var host = server.address().address;
  // var port = server.address().port;
  console.log('CORS-enabled web server listening on port 8080')
})
