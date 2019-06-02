var express = require('express')
var cors = require('cors')
var url = require('url');
var mysql = require('mysql');
var bodyParser = require('body-parser')
var formidable = require('formidable');
var stringSimilarity = require('string-similarity');
var fs = require('fs'),
    path = require('path'),
    _ = require('underscore');
var textract = require('textract');
const util = require('util');

var app = express();
app.use(cors());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}))

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "manisha_pms"
});

app.get('/edit_student_profile/:user_id', function(req, res, next) {
  let user_id = req.params.user_id;
  let student_data = [],
    course_names = [],
    department_names = [];
  var sql =
    "SELECT stud_name as name, address, contact, mail, curr_course, dept_id, curr_acad_yr FROM student WHERE user_id = ?";
  let data = [user_id];

  con.query(sql, data, function(err, result, fields) {
    if (err) {
      res.json({
        "status": 0,
        "data": "Something went wrong"
      });
    } else {
      if (result.length == 1) {
        student_data = result;
        var sql = "SELECT course_id, course_name FROM courses";
        con.query(sql, data, function(err, result, fields) {
          if (err) {
            res.json({
              "status": 0,
              "data": "Something went wrong"
            });
          } else {
            course_names = result;
            var sql = "SELECT dept_id, dept_name FROM department";
            con.query(sql, function(err, result, fields) {
              if (err) {
                res.json({
                  "status": 0,
                  "data": "Something went wrong"
                });
              } else {
                department_names = result;
                res.json({
                  "status": 1,
                  "student_data": student_data,
                  "course_names": course_names,
                  "department_names": department_names
                });
              }
            });
          }
        });
      } else {
        res.json({
          "status": 0,
          "data": "No data retrieved"
        });
      }
    }
  });
});

app.get('/edit_cood_profile/:user_id', function(req, res, next) {
  let user_id = req.params.user_id;
  let student_data = [],
    course_names = [],
    department_names = [];
  var sql =
    "SELECT head_name as name, address, contact, mail, course_id, dept_id FROM dept_heads WHERE user_id = ?";
  let data = [user_id];

  con.query(sql, data, function(err, result, fields) {
    if (err) {

      res.json({
        "status": 0,
        "data": "Something went wrong"
      });
    } else {
      if (result.length == 1) {
        student_data = result;
        var sql = "SELECT course_id, course_name FROM courses";
        con.query(sql, data, function(err, result, fields) {
          if (err) {
            res.json({
              "status": 0,
              "data": "Something went wrong"
            });
          } else {
            course_names = result;
            var sql = "SELECT dept_id, dept_name FROM department";
            con.query(sql, function(err, result, fields) {
              if (err) {
                res.json({
                  "status": 0,
                  "data": "Something went wrong"
                });
              } else {
                department_names = result;
                res.json({
                  "status": 1,
                  "student_data": student_data,
                  "course_names": course_names,
                  "department_names": department_names
                });
              }
            });
          }
        });
      } else {
        res.json({
          "status": 0,
          "data": "No data retrieved"
        });
      }
    }
  });
});

app.get('/edit_guide_profile/:user_id', function(req, res, next) {
  let user_id = req.params.user_id;
  let student_data = [],
    course_names = [],
    department_names = [];
  var sql =
    "SELECT guide_name as name, address, contact, mail, course_id, dept_id FROM internal_guides WHERE user_id = ?";
  let data = [user_id];

  con.query(sql, data, function(err, result, fields) {
    if (err) {

      //res.json({"status" : 0, "data" : "Something went wrong"});
    } else {
      if (result.length == 1) {
        student_data = result;
        var sql = "SELECT course_id, course_name FROM courses";
        con.query(sql, data, function(err, result, fields) {
          if (err) {
            res.json({
              "status": 0,
              "data": "Something went wrong"
            });
          } else {
            course_names = result;
            var sql = "SELECT dept_id, dept_name FROM department";
            con.query(sql, function(err, result, fields) {
              if (err) {
                res.json({
                  "status": 0,
                  "data": "Something went wrong"
                });
              } else {
                department_names = result;
                res.json({
                  "status": 1,
                  "student_data": student_data,
                  "course_names": course_names,
                  "department_names": department_names
                });
              }
            });
          }
        });
      } else {
        res.json({
          "status": 0,
          "data": "No data retrieved"
        });
      }
    }
  });
});

app.get('/view_student_profile/:user_id', function(req, res, next) {
  let user_id = req.params.user_id;

  var sql =
    "SELECT student.stud_name as name, student.address, student.contact, student.mail, student.curr_acad_yr, department.dept_name, courses.course_name FROM student, courses, department WHERE student.user_id = ?";
  let data = [user_id];

  con.query(sql, data, function(err, result, fields) {
    if (err) {
      res.json({
        "status": 0,
        "message": "Something went wrong",
        "error_message": err
      });
    } else {
      if (result.length == 1) {
        res.json({
          "status": 1,
          "data": result
        });
      } else {
        res.json({
          "status": 2,
          "error_message": "No data retrieved",
          "message": "No data retrieved"
        });
      }
    }
  });
})

app.get('/view_cood_profile/:user_id', function(req, res, next) {
  let user_id = req.params.user_id;

  var sql =
    "SELECT dept_heads.head_name as name, dept_heads.address, dept_heads.contact, dept_heads.mail, department.dept_name, courses.course_name FROM dept_heads, courses, department WHERE dept_heads.user_id = ?";
  let data = [user_id];

  con.query(sql, data, function(err, result, fields) {
    if (err) {
      res.json({
        "status": 0,
        "data": "Something went wrong"
      });
    } else {
      if (result.length == 1) {
        res.json({
          "status": 1,
          "data": result
        });
      } else {
        res.json({
          "status": 0,
          "data": "No data retrieved"
        });
      }
    }
  });
})

app.get('/view_guide_profile/:user_id', function(req, res, next) {
  let user_id = req.params.user_id;

  var sql =
    "SELECT internal_guides.guide_name as name, internal_guides.address, internal_guides.contact, internal_guides.mail, department.dept_name, courses.course_name FROM internal_guides, courses, department WHERE internal_guides.user_id = ?";
  let data = [user_id];

  con.query(sql, data, function(err, result, fields) {
    if (err) {

      res.json({
        "status": 0,
        "data": "Something went wrong"
      });
    } else {
      if (result.length == 1) {
        res.json({
          "status": 1,
          "data": result
        });
      } else {
        res.json({
          "status": 0,
          "data": "No data retrieved"
        });
      }
    }
  });
})

app.get('/list_all_students', function(req, res, next) {
  var sql =
    "SELECT student.stud_name, student.curr_acad_yr, student.mail, user.active, courses.course_name FROM student, user, courses WHERE student.curr_course IN (SELECT courses.course_id from courses) AND student.user_id = user.user_id";

  con.query(sql, function(err, result, fields) {
    if (err) {
      res.json({
        "status": 0,
        "data": "Something went wrong"
      });
    } else {
      if (result.length > 0) {
        res.json({
          "status": 1,
          "data": result
        });
      } else {
        res.json({
          "status": 0,
          "data": "No users present"
        });
      }
    }
  });
});

app.get('/project_details/:user_id', function(req, res, next) {
  let user_id = req.params.user_id;
  let sql =
    "SELECT count(*) as count FROM student WHERE student.user_id = ? AND student.guide_id='0' OR student.guide_id='0';"
  let data = [user_id];
  con.query(sql, data, function(err, result, fields) {

    if (err) {
      res.json({
        "status": 0,
        "data": "Something went wrong"
      });
    } else {
      if (result[0]["count"] == 0) {
        sql =
          "SELECT project.proj_id, project.proj_title, project.proj_desc, project.proj_sub_date, internal_guides.guide_name, project.proj_domain, project.proj_technology, project.proj_status FROM student, user, internal_guides, project WHERE project.user_id = ? AND user.user_id = ? AND student.user_id = ? AND student.guide_id = internal_guides.user_id AND project.project_visible = 'visible';"
        data = [user_id, user_id, user_id];
        con.query(sql, data, function(err, result, fields) {

          if (err) {
            res.json({
              "status": 0,
              "data": "Something went wrong"
            });
          } else {
            // console.log(result);
            if (result.length > 0) {
              res.json({
                "status": 1,
                "data": result
              });
            } else {
              res.json({
                "status": 0,
                "data": "No projects to show"
              });
            }
          }
        });
      } else {
        sql =
          "SELECT project.proj_id, project.proj_title, project.proj_desc, project.proj_sub_date, project.proj_domain, project.proj_technology, project.proj_status, domain.domain_name FROM student, user, project, domain WHERE project.user_id = ? AND user.user_id = ? AND student.user_id = ? AND project.project_visible = 'visible' AND domain.domain_id = project.proj_domain;"
        data = [user_id, user_id, user_id];
        con.query(sql, data, function(err, result, fields) {

          if (err) {
            res.json({
              "status": 0,
              "data": "Something went wrong"
            });
          } else {
            if (result.length > 0) {
              res.json({
                "status": 1,
                "data": result
              });
            } else {
              res.json({
                "status": 0,
                "data": "No projects to show"
              });
            }
          }
        });
      }
    }
  });
})

app.get('/all_guide_details', function(req, res, next) {
  let user_id = req.params.user_id;
  let sql = "SELECT user_id, guide_name FROM internal_guides;"
  con.query(sql, function(err, result, fields) {
    if (err) {
      res.json({
        "status": 0,
        "data": "Something went wrong"
      });
    } else {
      if (result.length > 0) {
        res.json({
          "status": 1,
          "data": result
        });
      } else {
        res.json({
          "status": 0,
          "data": "No guides to show"
        });
      }
    }
  });
})

app.get('/update_password/:user_id/:password', function(req, res, next) {
  let user_id = req.params.user_id;
  let password = req.params.password;
  let sql = "UPDATE user SET password = ? WHERE user_id =?;";
  data = [password, user_id];
  con.query(sql, data, function(err, result, fields) {
    if (err) {
      res.json({
        "status": 0,
        "data": "Something went wrong"
      });
    } else {
      res.json({
        "status": 1,
        "data": result
      });
    }
  });
})

app.get('/project_details_update/:user_id/:project_title/:project_domains/:project_technologies/:project_description',
  function(req, res, next) {
    let user_id = req.params.user_id;
    let project_title = req.params.project_title;
    let project_domains = req.params.project_domains;
    let project_technologies = req.params.project_technologies;
    let project_description = req.params.project_description;
    let project_domain_ids_list = [];
    let project_domains_list = project_domains.split(",");
    let index_count = 0;
    for (index = 0; index < project_domains_list.length; index++) {
      sql = "SELECT * FROM domain WHERE domain_name = ?";
      data = [project_domains_list[index].trim()];
      let domain_name = project_domains_list[index];
      con.query(sql, data, function(err, result, fields) {
        if (err) {
          res.json({
            "status": 0,
            "message": "Something went wrong"
          });
        } else {
          if (result.length == 0) {
            sql = "INSERT INTO domain(domain_name) VALUES(?)";
            data = [domain_name];
            con.query(sql, data, function(err, result, fields) {
              if (err) {
                res.json({
                  "status": 0,
                  "message": "Error 296: Something went wrong"
                });
              } else {
                project_domain_ids_list.push(result["insertId"]);
              }
            });
          } else {
            project_domain_ids_list.push(result[0]["domain_id"]);
          }

          if (project_domain_ids_list.length == 0) {
            res.json({
              "status": 0,
              "data": [],
              "message": "Error 299 : No domain names collected. Ftal error"
            });
          } else {
            index_count += 1;
            console.log(project_domain_ids_list);
            if (index_count == project_domains_list.length) {
              let sql =
                "UPDATE project SET proj_title = ?,  proj_domain = ?, proj_technology= ? ,proj_desc = ?  WHERE project.user_id = ?;"
              let data = [project_title, project_domain_ids_list.join(","),
                project_technologies, project_description, user_id
              ];
              con.query(sql, data, function(err, result, fields) {
                if (err) {
                  res.json({
                    "status": 0,
                    "data": "Something went wrong"
                  });
                } else {
                  sql = "SELECT * FROM project WHERE user_id = ?";
                  data = [user_id];
                  con.query(sql, data, function(err, result, fields) {
                    if (err) {
                      res.json({
                        "status": 0,
                        "data": "Something went wrong"
                      });
                    } else {
                      res.json({
                        "status": 1,
                        "data": result
                      });
                    }
                  });
                }
              });
            }
          }
        }
      });
    }



  });

app.get('/student_project_details/:user_id', function(req, res, next) {
  let user_id = req.params.user_id;
  let sql ="SELECT project.user_id,project.proj_id,project.proj_title, project.proj_desc, project.proj_sub_by, project.proj_sub_date, project.proj_domain, project.proj_technology,project.proj_status FROM project, student WHERE (project.proj_status = 'approved' OR project.proj_status = 'verified') AND student.guide_id = ? AND project.project_visible='visible'";
  let data = [user_id];
  con.query(sql, data, function(err, result, fields) {

    if (err) {
      console.log(err);
      res.json({
        "status": 0,
        "data": "Something went wrong"
      });
    } else {
      if (result.length > 0) {
        res.json({
          "status": 1,
          "data": result
        });
      } else {
        res.json({
          "status": 0,
          "data": "No projects to show"
        });
      }
    }
  });
})

app.get('/all_project_details', function(req, res, next) {
  // let user_id = req.params.user_id;
  let sql = "SELECT project.user_id, project.proj_id, concat(project.user_id, '-', project.proj_id) as unique_val, project.proj_title, project.proj_desc, project.proj_sub_by, project.proj_sub_date, project.proj_domain, project.proj_technology,project.proj_status,student.stud_name as name, domain.domain_name as domain FROM project,student,domain WHERE project.project_visible='visible' AND project.user_id=student.user_id AND domain.domain_id=project.proj_domain";
  con.query(sql, function(err, result, fields) {

    if (err) {
      console.log(err);
      res.json({
        "status": 0,
        "data": "Something went wrong"
      });
    } else {
      if (result.length > 0) {
        res.json({
          "status": 1,
          "data": result
        });
      } else {
        res.json({
          "status": 0,
          "data": "No projects to show"
        });
      }
    }
  });
})

app.get('/login/:username/:password', function(req, res, next) {
  let username = req.params.username;
  let password = req.params.password;
  // var passwordHash = require('./lib/password-hash');
  // var passwordHash = require('password-hash');
  // var hashedPassword = passwordHash.generate(password);
  // const bcrypt = require('bcrypt');
  // let hash = bcrypt.hashSync(password,10);
  // console.log(hash);

  var sql =
    "SELECT user_id, role, active, user_name  FROM user WHERE user_name = ? AND password = ?";
  let data = [username, password];

  con.query(sql, data, function(err, result, fields) {

    if (err) {
      res.json({
        "status": 0,
        "error_message": err,
        "message": "Unable to login. Something went wrong"
      });
    } else {
      if (result.length == 1) {
        let active = result[0].active;
        if (active == "1") {
          let user_id = result[0].user_id;
          let role = result[0].role;
          let username = result[0].user_name;
          res.json({
            "status": 1,
            "user_id": user_id,
            "role": role,
            "user_name": username,
            "message": "Redirecting ..."
          });
        } else {
          res.json({
            "status": 0,
            "message": "Email account is not active"
          });
        }
      } else {
        res.json({
          "status": 0,
          "message": "Invalid username/password",
          "error_message": "No records retrieved"
        });
      }
    }
  });
});

app.get(
  "/update_student_profile/:user_id/:full_name/:email/:contact/:address/:course/:department",
  function(req, res, next) {

    let user_id = req.params.user_id;
    let full_name = req.params.full_name;
    let email = req.params.email;
    let contact = req.params.contact;
    let course = req.params.course;
    let department = req.params.department;
    let address = req.params.address;
    let academic = req.params.academic;
    var sql =
      "UPDATE student SET stud_name = ?, address = ?, contact = ?, mail = ?, curr_course = ?, dept_id = ? WHERE user_id = ?";
    let data = [full_name.trim(), address.trim(), contact.trim(), email.trim(),
      course.trim(), department.trim(), user_id
    ];

    con.query(sql, data, function(err, result, fields) {

      if (err) {

        res.json({
          "status": 0,
          "data": "Something went wrong"
        });
      } else {
        // res.json({"status" : 1, "data" : "Student profile updated succesfully"});
        sql =
          "SELECT COUNT(curr_course) as count FROM student WHERE curr_course = ?";
        let data = [course.trim()];
        con.query(sql, data, function(err, result, fields) {
          if (err) {
            res.json({
              "status": 0,
              "data": "Something went wrong"
            });
          } else {
            sql =
              "UPDATE courses SET no_of_stud_enrol = ? WHERE course_id = ?";
            let data = [result[0]['count'], course.trim()];

            con.query(sql, data, function(err, result, fields) {
              if (err) {

                res.json({
                  "status": 0,
                  "data": "Something went wrong"
                });
              } else {
                res.json({
                  "status": 1,
                  "data": "Course count updated succesfully"
                });
              }
            });
          }
        });
      }
    });


  });

app.get(
  "/update_cood_profile/:user_id/:full_name/:email/:contact/:address/:course/:department",
  function(req, res, next) {

    let user_id = req.params.user_id;
    let full_name = req.params.full_name;
    let email = req.params.email;
    let contact = req.params.contact;
    let course = req.params.course;
    let department = req.params.department;
    let address = req.params.address;

    let sql =
      "UPDATE dept_heads SET head_name = ?, address = ?, contact = ?, mail = ?, course_id = ?, dept_id = ? WHERE user_id = ?";
    let data = [full_name.trim(), address.trim(), contact.trim(), email.trim(),
      course.trim(), department.trim(), user_id
    ];

    con.query(sql, data, function(err, result, fields) {
      if (err) {
        res.json({
          "status": 0,
          "data": "Something went wrong"
        });
      } else {
        res.json({
          "status": 1,
          "data": "Coordinator profile updated succesfully"
        });
      }
    });
  });

app.get("/update_guide_profile/:user_id/:full_name/:email/:contact/:address/:course/:department",
  function(req, res, next) {

    let user_id = req.params.user_id;
    let full_name = req.params.full_name;
    let email = req.params.email;
    let contact = req.params.contact;
    let course = req.params.course;
    let department = req.params.department;
    let address = req.params.address;

    let sql =
      "UPDATE internal_guides SET guide_name = ?, address = ?, contact = ?, mail = ?, course_id = ?, dept_id = ? WHERE user_id = ?";
    let data = [full_name.trim(), address.trim(), contact.trim(), email.trim(),
      course.trim(), department.trim(), user_id
    ];

    con.query(sql, data, function(err, result, fields) {
      if (err) {
        res.json({
          "status": 0,
          "data": "Something went wrong"
        });
      } else {
        res.json({
          "status": 1,
          "data": "Guide profile updated succesfully"
        });
      }
    });
  });
app.post("/project_details_update", function(req, res, next){
  let user_id = req.body.user_id;
  let project_title = req.body.project_title;
  let project_domains = req.body.project_domains;
  let project_technologies = req.body.project_technologies;
  let project_description = req.body.project_description;
  let _continue = req.body._continue;
  let proj_id = req.body.project_id;
  let project_domain_ids_list = [];
  let project_domains_list = project_domains.split(",");
  let index_count=0;
  const query = util.promisify(con.query).bind(con);
  console.log(proj_id);
  (async() => {
    for (index = 0; index < project_domains_list.length; index++) {
    let select_domain_sql = "SELECT * FROM domain WHERE domain_name = '" + project_domains_list[index].trim()+"'";
    let select_domain = await query(select_domain_sql);
    // console.log(select_domain);
    // console.log(select_domain.length);
    if (select_domain.length > 0) {
      project_domain_ids_list.push(select_domain[0]["domain_id"]);
    } else {
      let new_domain_sql = "INSERT INTO domain(domain_name) VALUES('" +
        project_domains_list[number] + "')";
      let new_domain = await query(new_domain_sql);

      project_domain_ids_list.push(new_domain["insertId"]);
    }
    index_count += 1;
    // console.log(project_domain_ids_list);
  }
          // console.log(index_count);
          // console.log(project_domains_list.length);
          if (index_count == project_domains_list.length) {
            let update_project_sql =
              "UPDATE project SET proj_title = '" + project_title + "',  proj_domain ='" + project_domain_ids_list.join(",") + "', proj_technology='" + project_technologies + "',proj_desc ='" + project_description +"' WHERE project.user_id =" + user_id + " AND project.proj_id = " + proj_id + ";"
              console.log(update_project_sql);
            let update_project = await query(update_project_sql);
            res.json({
              "status": 1,
              "message": "Project updated succesfully"
            })
          }
  //               sql = "SELECT * FROM project WHERE user_id = ?";
  //               data = [user_id];
  //               con.query(sql, data, function(err, result, fields) {
  //                 if (err) {
  //                   res.json({
  //                     "status": 0,
  //                     "data": "Something went wrong"
  //                   });
  //                 } else {
  //                   res.json({
  //                     "status": 1,
  //                     "data": result
  //                   });
  //                 }
  //               });
  //             }
  //           });
  //         }
  //       }
  //     }
  //   });
  // }
})()

})
app.post("/add_project_topic", function(req, res, next) {

  let user_id = req.body.user_id;
  let project_title = req.body.project_title;
  let project_domains = req.body.project_domains;
  let project_technologies = req.body.project_technologies;
  // let project_description = req.body.project_description;
  var project_description = "";
  let _continue = req.body._continue;
  // console.log(project_description);
  let project_domains_list = project_domains.split(",");
  let project_domain_ids_list = [];
  let similarity_percentage = 0;
  // node native promisify
  let recent_desc_file = "C:\\Users\\Jayashankar\\Documents\\Manisha\\endgame\\file_upload_node\\" + getMostRecentFileName();

  const query = util.promisify(con.query).bind(con);
  textract.fromFileWithPath(recent_desc_file, function( error, text ) {
    project_description = text;
      (async() => {

    let successful_student = "SELECT * FROM project WHERE user_id = '" +
      user_id + "' AND proj_status = 'verified'";
    let successful_student_execute = await query(successful_student);

// console.log(successful_student_execute);

    let select_similar_titles_sql =
      "SELECT * FROM project WHERE proj_title LIKE '%" + project_title +
      "%'";
    let select_similar_titles = await query(select_similar_titles_sql);

    let select_similar_tech_sql =
      "SELECT * FROM project WHERE proj_technology LIKE '%" +
      project_technologies + "%'";
    let select_similar_tech = await query(select_similar_tech_sql);

    for (number = 0; number < project_domains_list.length; number++) {
      let domain_sql = "SELECT * FROM domain WHERE domain_name LIKE '%" +
        project_domains_list[number] + "%'";
      let domain = await query(domain_sql);
      if (domain.length > 0) {
        project_domain_ids_list.push(domain[0]["domain_id"]);
      } else {
        let new_domain_sql = "INSERT INTO domain(domain_name) VALUES('" +
          project_domains_list[number] + "')";
        let new_domain = await query(new_domain_sql);

        project_domain_ids_list.push(new_domain["insertId"]);
      }
    }

    let similar_domain_select_sql =
      "SELECT * FROM domain WHERE domain_name LIKE '%" +
      project_domain_ids_list.join(",") + "%'"
    let similar_domain_select = await query(similar_domain_select_sql);

    let all_desc_sql =
      "SELECT proj_desc FROM project WHERE proj_status = 'verified'";
    let all_desc = await query(all_desc_sql);
    let all_desc_list = [];
    // console.log(all_desc.length);
    console.log(all_desc);
    for (number = 0; number < all_desc.length; number++) {
      // console.log(all_desc[number]["proj_desc"]);
      all_desc_list.push(all_desc[number]["proj_desc"]);
      // console.log(all_desc_list[number]);
      // console.log("loop"+number);
    }
    let similarity_percent = get_string_match_percentage(
      project_description, all_desc_list);
      // console.log(all_desc_list);
      console.log(similarity_percent);
      console.log(select_similar_titles.length);
      console.log(similar_domain_select.length);
      console.log(select_similar_tech.length);
    if (select_similar_titles.length <= 0 && similarity_percent < 30) {
      console.log("inside insert");
      let current_date = new Date();
      let date_time = current_date.getDate() + "/" + (current_date.getMonth() +
          1) + "/" + current_date.getFullYear() + " @ " + current_date.getHours() +
        ":" + current_date.getMinutes();
      let insert_project_sql =
        "INSERT INTO project(user_id, proj_title, proj_desc, proj_domain, proj_sub_date, proj_technology) VALUES('" +
        user_id + "', '" + project_title + "', '" + project_description +
        "', '" + project_domain_ids_list.join(",") + "' , '" + date_time +
        "', '" + project_technologies + "')"
        console.log(insert_project_sql);
      let insert_project = await query(insert_project_sql);
      res.json({
        "status": 1,
        "message": "Project added succesfully"
      })
    } else if (select_similar_titles.length > 0 && similar_domain_select.length >
      0 && select_similar_tech.length > 0 && similarity_percent > 30) {
          console.log("select_similar_titles.length > 0 && similar_domain_select.length >0 && select_similar_tech.length > 0 && similarity_percentage > 30");
      res.json({
        "status": 0,
        "message": similarity_percent +
          "% similar project already exist."
      })
    } else if (select_similar_titles.length == 0 && similar_domain_select
      .length == 0 && select_similar_tech.length == 0 &&
      similarity_percent > 30) {
        // console.log("select_similar_titles.length == 0 && similar_domain_select.length == 0 && select_similar_tech.length == 0 &&similarity_percentage > 30");
      res.json({
        "status": 0,
        "message": similarity_percent +
          "% similar description exist. You are not permitted to submit. Try something new."
      })
    } else if (select_similar_titles.length > 0 && similar_domain_select.length >
      0 && select_similar_tech.length > 0 && similarity_percent < 30) {
        console.log("select_similar_titles.length > 0 && similar_domain_select.length >0 && select_similar_tech.length > 0 && similarity_percentage < 30");
      res.json({
        "status": 0,
        "message": similarity_percent +
          "% similar project already exist with your title,domain and technology "
      })
    }else if (select_similar_titles.length > 0 && similar_domain_select.length ==
      0 && select_similar_tech.length == 0 && similarity_percent > 30) {
        // console.log("select_similar_titles.length > 0 && similar_domain_select.length >0 && select_similar_tech.length > 0 && similarity_percentage < 30");
      res.json({
        "status": 0,
        "message": similarity_percent +
          "% similar project already exist with your title and description "
      })
    }else if (select_similar_titles.length == 0 && similar_domain_select.length >= 0 && select_similar_tech.length >= 0 && similarity_percent > 30) {
        // console.log("select_similar_titles.length > 0 && similar_domain_select.length >0 && select_similar_tech.length > 0 && similarity_percentage < 30");
      res.json({
        "status": 0,
        "message": similarity_percent +
          "% similar project already exist with your title and description "
      })
    }
    // else if(select_similar_titles.length > 0 && similar_domain_select.length > 0 && select_similar_tech.length > 0 && similarity_percentage < 30) {
    //   res.json({"status" : 0, "message" : similarity_percentage + "% projects already exist."})
    // }
  })()
  });


  // console.log(req.body);
});


function get_string_match_percentage(input_string, list_of_strings) {
  max_similarity = 0;
  // console.log(list_of_strings[1]);
  for (i = 0; i < list_of_strings.length; i++) {
    var similarity = Math.round(stringSimilarity.compareTwoStrings(
      input_string,
      list_of_strings[i]) * 100);
      // console.log(similarity);
    if (similarity > max_similarity) {
      max_similarity = similarity;
    }
    // console.log("`" + input_string + "`, " +
    //   "`" + list_of_strings[i] + "`" + " have " + similarity +
    //   "% similarity");

  }
  // console.log(max_similarity);
  return(max_similarity);
}

function arr_diff(a1, a2) {

  var a = [],
    diff = [];

  for (var i = 0; i < a1.length; i++) {
    a[a1[i]] = true;
  }

  for (var i = 0; i < a2.length; i++) {
    if (a[a2[i]]) {
      delete a[a2[i]];
    } else {
      a[a2[i]] = true;
    }
  }

  for (var k in a) {
    diff.push(k);
  }

  return diff;
}


app.get("/insert_mail/:user_id/:mail_to/:subject/:content/:attachment",
  function(req, res, next) {

    let user_id = req.params.user_id;
    let mail_to = req.params.mail_to;
    let subject = req.params.subject;
    // let cc = req.params.cc;
    // let bcc = req.params.bcc;
    let content = req.params.content;
    let attachment = req.params.attachment;
    let current_date = new Date();
    let date_time = current_date.getDate() + "/" + (current_date.getMonth() +
        1) + "/" + current_date.getFullYear() + " @ " + current_date.getHours() +
      ":" + current_date.getMinutes();
    // console.log(mail_to);
    let sql = "SELECT role,user_id as id FROM user WHERE user_name = ?"
    let data = [mail_to];
    con.query(sql, data, function(err, result) {

      if (err) {
        console.log(result);
        // alert("This user i not registered.! Please check the mail id");
        // res.json({"status" : 0, "data" : "ERROR 699: Something went wrong "});
      } else {
        sql =
          "INSERT INTO mail(user_id, toaddr, sub, content, timestamp, attachment,role,id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?,?)";
        data = [user_id, mail_to, subject, content, date_time, attachment,
          result[0]['role'], result[0]['id']
        ];
        con.query(sql, data, function(err, result) {

          if (err) {

            res.json({
              "status": 0,
              "data": "ERROR 709: Something went wrong"
            });
          } else {
            res.json({
              "status": 1,
              "data": "Mail inserted  successfully"
            });
          }
        });
      }
    });


  });

app.get("/insert_user/:fullname/:email/:password/:role", function(req, res,
  next) {

  let full_name = req.params.fullname;
  let username = req.params.username;
  let password = req.params.password;
  let email = req.params.email;
  let role = req.params.role;
  let current_date = new Date();
  let next_year = current_date.getFullYear() + 1;
  let date_time = current_date.getFullYear() + "-" + next_year;
  let month = current_date.getMonth() + 1;
  // console.log(month);
  if (month >= 5 && month <= 12) {
    let sql = "INSERT INTO user(user_name, password, role) VALUES(?, ?, ?)";
    let data = [email, password, role];
    con.query(sql, data, function(err, result) {
      if (err) {
        res.json({
          "status": 0,
          "message": "Something went wrong. Unable to register user at the moment. Please"
        });
      } else {
        if (role == 'stud') {
          sql =
            "INSERT INTO student(user_id, stud_name, mail, curr_acad_yr) VALUES (?, ?, ?, ?)";
          data = [result.insertId.toString(), full_name, email,
            date_time
          ];
          con.query(sql, data, function(err, result) {
            if (err) {
              res.json({
                "status": 0,
                "message": "Something went wrong. Unable to register user at the moment. Please"
              });
            } else {
              res.json({
                "status": 1,
                "message": "User registered successfully"
              });
            }
          });
        } else if (role == 'cood') {
          sql =
            "INSERT INTO dept_heads(user_id, head_name, mail) VALUES (?, ?, ?)";
          data = [result.insertId.toString(), full_name, email];
          con.query(sql, data, function(err, result) {
            if (err) {
              res.json({
                "status": 0,
                "message": "Something went wrong. Unable to register user at the moment. Please"
              });
            } else {
              res.json({
                "status": 1,
                "message": "User registered successfully"
              });
            }
          });
        } else {
          sql =
            "INSERT INTO internal_guides(user_id, guide_name, mail) VALUES (?, ?, ?)";
          data = [result.insertId.toString(), full_name, email];
          con.query(sql, data, function(err, result) {
            if (err) {
              res.json({
                "status": 0,
                "message": "Something went wrong. Unable to register user at the moment. Please"
              });
            } else {
              res.json({
                "status": 1,
                "message": "User registered successfully"
              });
            }
          });
        }
      }
    });
  } else {
    res.json({
      "status": 0,
      "message": "Can't register as given time expired"
    });
  }
});

app.get("/fetch_mail/:user_id", function(req, res, next) {

  let user_id = req.params.user_id;

  let sql =
    "SELECT mail.*, student.stud_name as name FROM mail, student WHERE mail.user_id = ? AND student.user_id = ? AND mail_visible = '1'";
  let data = [user_id, user_id];
  con.query(sql, data, function(err, result) {
    if (err) {
      res.json({
        "status": 0,
        "data": "Something went wrong"
      });
    } else {
      if (result.length > 0) {
        res.json({
          "status": 1,
          "data": result,
          "mail_count": result.length
        });
      } else {
        res.json({
          "status": 0,
          "data": "Something went wrong"
        });
      }
    }
  });
});

app.get("/do_suggestion/:user_id/:student_id/:project_id/:suggestion", function(
  req, res, next) {

  let user_id = req.params.user_id;
  let proj_id = req.params.project_id;
  let stud_id = req.params.student_id;
  let suggestion = req.params.suggestion;
  let current_date = new Date();
  let date_time = current_date.getDate() + "/" + (current_date.getMonth() +
    1) + "/" + current_date.getFullYear();

  let sql =
    "INSERT INTO suggestions(guide_user_id, stud_user_id, proj_id, suggestion, date) VALUES (?, ?, ?, ?, ?)"
  let data = [user_id, stud_id, proj_id, suggestion, date_time];
  con.query(sql, data, function(err, result) {
    if (err) {
      res.json({
        "status": 0,
        "data": "Something went wrong"
      });
    } else {
      res.json({
        "status": 1,
        "data": "Suggestion inserted successfully"
      });
    }
  });
});

app.get("/select_suggestion/:user_id", function(req, res, next) {

  let user_id = req.params.user_id;
  // let proj_id = req.params.proj_id;
  // let stud_id = req.params.stud_id;
  var sql =
    "SELECT suggestions.proj_id,suggestions.suggestion, suggestions.date, project.proj_title from suggestions, student, project WHERE suggestions.proj_id = project.proj_id and project.proj_status = 'approved' AND suggestions.stud_user_id = student.user_id and student.user_id = ? ORDER BY date DESC";
  let data = [user_id];
  con.query(sql, data, function(err, result) {
    if (err) {
      res.json({
        "status": 0,
        "data": "Something went wrong"
      });
    } else {
      res.json({
        "status": 1,
        "data": result
      });
    }
  });
});

app.get("/inbox_mail/:user_id/:mail_role/:mail", function(req, res, next) {

  let user_id = req.params.user_id;
  let mail_role = req.params.mail_role;
  let mail = req.params.mail;

  // let to_user_email_id = req.params.mail;
  // let result_dictionary = [];
  if (mail_role == 'guide') {
    let sql =
      "SELECT mail.*, internal_guides.guide_name as name FROM mail, internal_guides WHERE mail.toaddr = ? AND mail.user_id=internal_guides.user_id AND mail.mail_visible = '1';";
    let data = [mail];
    con.query(sql, data, function(err, result) {
      if (err) {

        // res.json({"status" : 0, "data" : "ERROR 887:Something went wrong"});
      } else {
        res.json({
          "status": 1,
          "data": result
        });
      }
    });
  } else if (mail_role == 'cood') {
    sql =
      "SELECT mail.*, dept_heads.head_name as name FROM mail, dept_heads WHERE mail.toaddr = ? AND mail.user_id=dept_heads.user_id AND  mail.mail_visible='1';";
    data = [mail];

    con.query(sql, data, function(err, result) {
      if (err) {

        // res.json({"status" : 0, "data" : "ERROR 903: Something went wrong"});
      } else {
        res.json({
          "status": 1,
          "data": result
        });

      }
    });
  } else {
    sql =
      "SELECT mail.*, student.stud_name as name FROM mail, student WHERE mail.toaddr = ? AND mail.user_id=student.user_id AND  mail.mail_visible='1';";
    data = [mail];

    con.query(sql, data, function(err, result) {
      if (err) {
        res.json({
          "status": 0,
          "data": "ERROR 918:Something went wrong"
        });
      } else {
        res.json({
          "status": 1,
          "data": result
        });
      }
    });
  }
});

app.get("/sent_mail/:user_id/:role/:mail_role", function(req, res, next) {
  let user_id = req.params.user_id;
  let role = req.params.role;
  let mail_role = req.params.mail_role;

  if (mail_role == 'guide') {

    let sql =
      "SELECT mail.*, internal_guides.guide_name as name FROM mail, internal_guides WHERE mail.user_id = ? AND mail.toaddr = internal_guides.mail AND mail.mail_visible='1';";
    let data = [user_id];

    con.query(sql, data, function(err, result) {
      if (err) {
        res.json({
          "status": 0,
          "data": "ERROR 954:Something went wrong"
        });
      } else {
        res.json({
          "status": 1,
          "data": result
        });
      }
    });
  } else if (mail_role == 'cood') {
    sql =
      "SELECT mail.*, dept_heads.head_name as name FROM mail, dept_heads WHERE mail.user_id = ? AND mail.toaddr = dept_heads.mail AND mail.mail_visible='1';";
    data = [user_id];

    con.query(sql, data, function(err, result) {
      if (err) {
        res.json({
          "status": 0,
          "data": "ERROR 970:Something went wrong"
        });
      } else {
        res.json({
          "status": 1,
          "data": result
        });
      }
    });
  } else {
    sql =
      "SELECT mail.*, student.stud_name as name FROM mail, student WHERE mail.user_id = ? AND mail.toaddr = student.mail AND mail.mail_visible='1';";
    data = [user_id];
    con.query(sql, data, function(err, result) {
      if (err) {
        res.json({
          "status": 0,
          "data": "ERROR 985:Something went wrong"
        });
      } else {
        if (result.length > 0) {
          res.json({
            "status": 1,
            "data": result
          });
        } else {
          res.json({
            "status": 0,
            "data": "ERROR 990:Something went wrong"
          });
        }
      }
    });
  }
});

app.get("/move_mail/:mail_id", function(req, res, next) {

  let mail_id = req.params.mail_id;
  let sql = "UPDATE mail SET mail_visible= '0' WHERE mail_id = ?";
  let data = [mail_id];
  con.query(sql, data, function(err, result) {
    if (err) {
      res.json({
        "status": 0,
        "data": "Something went wrong"
      });
    } else {
      if (result.affectedRows == 1) {
        res.json({
          "status": 1,
          "data": "Data updated successfully"
        });
      } else {
        res.json({
          "status": 0,
          "data": "Something went wrong"
        });
      }
    }
  });
});

app.get("/trash_mail/:mail/:user_id/:role/:mail_role", function(req, res, next) {
  let mail = req.params.mail;
  let user_id = req.params.user_id;
  let role = req.params.role;
  let mail_role = req.params.mail_role;
  // let sql = "SELECT role,id FROM mail WHERE user_id = ?";
  // let data = [user_id];
  // con.query(sql, data, function(err, result) {
  //   if (err) {
  //
  //     res.json({"status" : 0, "data" : "ERROR 899: Something went wrong"});
  //   } else {
  if (mail_role == 'guide') {
    let sql =
      "SELECT mail.*, internal_guides.guide_name as name FROM mail, internal_guides WHERE (mail.mail_visible = '0' AND mail.user_id = internal_guides.user_id AND mail.toaddr =?) OR (mail.toaddr=internal_guides.mail AND mail.mail_visible = '0' AND mail.user_id=?);";

    let data = [mail, user_id];
    con.query(sql, data, function(err, result) {
      if (err) {
        res.json({
          "status": 0,
          "data": "ERROR 887:Something went wrong"
        });
      } else {
        res.json({
          "status": 1,
          "data": result
        });
      }
    });
  } else if (mail_role == 'cood') {
    sql =
      "SELECT mail.*, dept_heads.head_name as name FROM mail, dept_heads WHERE (mail.mail_visible = '0' AND mail.user_id = dept_heads.user_id AND mail.toaddr =?) OR (mail.toaddr=dept_heads.mail AND mail.mail_visible = '0' AND mail.user_id=?);";
    data = [mail, user_id];

    con.query(sql, data, function(err, result) {
      if (err) {
        res.json({
          "status": 0,
          "data": "ERROR 903: Something went wrong"
        });
      } else {
        res.json({
          "status": 1,
          "data": result
        });
      }
    });
  } else {
    sql =
      "SELECT mail.*, student.stud_name as name FROM mail, student WHERE (mail.mail_visible = '0' AND mail.user_id = student.user_id AND mail.toaddr =?) OR (mail.toaddr=student.mail AND mail.mail_visible = '0'  AND mail.user_id=?);";
    data = [mail, user_id];
    con.query(sql, data, function(err, result) {
      if (err) {
        res.json({
          "status": 0,
          "data": "ERROR 918:Something went wrong"
        });
      } else {
        res.json({
          "status": 1,
          "data": result
        });
      }
    });
  }


  // const r = Object.assign({}, result_dictionary[0], result_dictionary[1]);
  // res.json({"status" : 0, "data" : result_dictionary});
  // console.log(result_dictionary);

});

app.get("/single_project_details/:user_id", function(req, res, next) {
  let mail = req.params.mail;
  let user_id = req.params.user_id;
  let sql = "SELECT * FROM project WHERE proj_id = ?";
  let data = [user_id];
  let domain_names_list = [];
  let count = 0;
  let project_details = null;
  con.query(sql, data, function(err, result) {
      if (err) {
        res.json({
          "status": 0,
          "data": "Something went wrong"
        });
      } else {
        project_details = result;
        domain_id_values = result[0]["proj_domain"];
        domain_id_values_list = domain_id_values.split(",");
        for (number = 0; number < domain_id_values_list.length; number++) {
          sql = "SELECT * FROM domain WHERE domain_id = ?";
          data = [domain_id_values_list[number]];
          con.query(sql, data, function(err, result, fields) {
            if (err) {

              res.json({
                "status": 0,
                "message": "Error 867 : Something went wrong"
              });
            } else {
              count += 1;
              domain_names_list.push(result[0]["domain_name"]);
              if (count == domain_id_values_list.length) {
                project_details[0]["proj_domain"] = domain_names_list
                  .join(", ");
                res.json({
                  "status": 1,
                  "data": project_details
                });
              }
            }
          });
        }

      }
    }

  );
});

app.get('/allocate/:project_id/:user_id/:guide/:status', function(req, res,
  next) {
  let user_id = req.params.user_id;
  let guide = req.params.guide;
  let status = req.params.status;
  let project_id = req.params.project_id;

  // var passwordHash = require('./lib/password-hash');
  // var passwordHash = require('password-hash');
  // var hashedPassword = passwordHash.generate(password);
  // const bcrypt = require('bcrypt');
  // let hash = bcrypt.hashSync(password,10);
  // console.log(hash);

  var sql = "UPDATE project SET proj_status = ? WHERE proj_id = ?";
  let data = [status, project_id];

  con.query(sql, data, function(err, result, fields) {
    //
    if (err) {
      res.json({
        "status": 0,
        "message": "Something went wrong"
      });
    } else {
      sql = "UPDATE student SET guide_id = ? WHERE user_id = ?";
      data = [guide, user_id];
      con.query(sql, data, function(err, result, fields) {
        //
        if (err) {
          res.json({
            "status": 0,
            "message": "Something went wrong in student table"
          });
        } else {
          res.json({
            "status": 1,
            "message": "Updated in student table"
          });
        }
      });
    }
  });
});

// Return only base file name without dir
function getMostRecentFileName() {
  let dir = "C:\\Users\\Jayashankar\\Documents\\Manisha\\endgame\\file_upload_node";
    var files = fs.readdirSync(dir);

    // use underscore for max()
    return _.max(files, function (f) {
        var fullpath = path.join(dir, f);

        // ctime = creation time is used
        // replace with mtime for modification time
        return fs.statSync(fullpath).ctime;
    });
}

app.listen(8080, function() {
  // var host = server.address().address;
  // var port = server.address().port;

  console.log('CORS-enabled web server listening on port 8080')
})
