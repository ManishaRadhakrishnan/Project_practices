import { Component, OnInit } from '@angular/core';
import { Api, ApiService } from '../api.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { Observable }         from 'rxjs';
import { ActivatedRoute }     from '@angular/router';
import { map }                from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import * as $AB from 'jquery';
// import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
const UploadURL = 'http://localhost:3000/api/upload';
var reader = new FileReader();

@Component({
  selector: 'app-topic-sub',
  templateUrl: './topic-sub.component.html',
  styleUrls: ['./topic-sub.component.css']
})
export class TopicSubComponent implements OnInit {
  count : number;
  error: string;
  user_id : string;
  role: string;
  status : number;
  information:string[];
  button :boolean;
  unique:boolean;
  project_id : string;
  number_of_similar_projects : string[];
  message : string;
  verify : number;
  endpoint_url = "http://127.0.0.1:8080";
  // uploader: FileUploader = new FileUploader({url: UploadURL, itemAlias: 'sdyuihfkjn'});

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private api_service: ApiService) { }

  ngOnInit() {
    this.role = window.sessionStorage.getItem("role");
    // if(this.role == 'stud'){
      this.user_id = window.sessionStorage.getItem("user_id");
    // }
    if(this.role != 'stud') {
      this.router.navigate(["/login"]);
    }
    else {
      this.project_id = this.route.snapshot.paramMap.get("project_id");
      this.route.queryParamMap.subscribe(queryParams => {
        this.project_id = queryParams.get("project_id");
      });
      this.api_service
       .verified_project_details(this.user_id)
       .subscribe(
         data => {
           // this.information = data.data as string[];
           this.verify = data.verify as number;
           console.log(this.verify);
           if(this.verify==1){
             alert("Your topic is once verified. You cannot submit or edit topic");
           }else{
             // alert(this.project_id);
             if(this.project_id != null && this.verify == 0) {

             this.button = true;
             this.role = window.sessionStorage.getItem("role");
             if(this.role == "stud") {
               this.user_id = window.sessionStorage.getItem("user_id");
               this.api_service
                .single_project_details(this.project_id)
                .subscribe(
                  data => {
                    this.information = data.data as string[];
                    this.status = data.status as number;
                    console.log(data);
                  },
                  err => {
                    console.log(err);
                  }
                );
              }
             else {
                  this.router.navigate(["/login"]);
                }
           }
           }
         },
         err => {
           console.log(err);
         }
       );
      // if(this.status == 1){
      // }else{

        if(this.project_id != null) {

        this.button = true;
        this.role = window.sessionStorage.getItem("role");
        if(this.role == "stud") {
          this.user_id = window.sessionStorage.getItem("user_id");
          this.api_service
           .single_project_details(this.project_id)
           .subscribe(
             data => {
               this.information = data.data as string[];
               this.status = data.status as number;
               console.log(data);
             },
             err => {
               console.log(err);
             }
           );
         }
        else {
             this.router.navigate(["/login"]);
           }
      }
      // }
    }

    // this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    // this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    //      console.log('FileUpload:uploaded:', item, status, response);
    //      if(status == true){
    //       alert('File uploaded successfully');
    //      }
    //  };
  }

  do_submit_topic(project_title: string, project_domains: string, project_technologies: string,  _continue: string) {
      let api_url = encodeURI("http://127.0.0.1:8080/add_project_topic");
      // let project_description = $("#file_upload_iframe").contentWindow;
      // console.log(project_description);
      this.user_id = window.sessionStorage.getItem("user_id");
      this.http.post(api_url, {"user_id" : this.user_id, "project_title" : project_title, "project_domains" : project_domains, "project_technologies" : project_technologies, " _continue": _continue})
      .subscribe(
          data  => {
          console.log("POST Request is successful ", data);
          // this.status = data.status as number;
          // this.message = data.message as string;
          },
          error  => {

          console.log("Error", error);

          }

          );
  }

  do_edit_topic() {

  }

  do_topic_save(project_title : string, project_domains : string, project_technologies : string, _continue: string) {
  let api_url = encodeURI("http://127.0.0.1:8080/project_details_update");

  this.user_id = window.sessionStorage.getItem("user_id");
  this.http.post(api_url, {"user_id" : this.user_id, "project_id" : this.project_id, "project_title" : project_title, "project_domains" : project_domains, "project_technologies" : project_technologies, " _continue": _continue})
  .subscribe(
      data  => {
      console.log("POST Request is successful ", data);
      // this.status = data.status as number;
      // this.message = data.message as string;
      },
      error  => {

      console.log("Error", error);

      }

      );
}

  public onChange(event, output) {
    let file = event.target.files[0];
    // let x = new ArrayBuffer(2048);
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
    // markdownfileReader.result
    // x = fileReader.result
    output.innerHTML = fileReader.result
    }
    fileReader.readAsText(file);
  }

  editable_desc() {
    $("#desc_row").attr("contenteditable", "true");
    $("#desc_row").attr("border", "1");
  }
}
