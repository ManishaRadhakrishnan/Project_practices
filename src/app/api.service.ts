import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

export interface Api {
  status: string;
  message: string;
}

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json", "Authorization": "c31z" })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  endpoint_url = "http://127.0.0.1:8080";
  constructor(private http: HttpClient) { }

    do_register(full_name: string, email: string, username: string, password: string, role: string)
    {
      let api_url = encodeURI(this.endpoint_url + "/insert_user/" + full_name + "/" + email + "/" + password + "/" + username + "/" + role);
      return this.http.get<Api>(api_url)
        .pipe(
        // retry(3), // retry a failed request up to 3 times
        catchError(this.handle_error) // then handle the error
      );
    }

    update_student_profile(user_id : string, full_name : string, email : string, contact : string, address : string, course : string, department : string)
    {
      let api_url = encodeURI(this.endpoint_url + "/update_student_profile/" + user_id + "/" + full_name + "/" + email + "/" + contact  + "/" + address + "/" + course + "/" + department);
      return this.http.get<Api>(api_url)
        .pipe(
        catchError(this.handle_error) // then handle the error
      );
    }

    insert_mail(user_id: string, email_to: string, subject: string, email_cc: string, email_bcc: string, email_content: string,attachment :string)
    {
      let api_url = encodeURI(this.endpoint_url + "/insert_mail/"+ user_id  + "/" + email_to + "/" + subject + "/" + email_cc + "/" + email_bcc + "/" + email_content + "/" + attachment);
      return this.http.get<Api>(api_url)
        .pipe(
        catchError(this.handle_error) // then handle the error
      );
    }

    do_add_project_topic(user_id: string, project_title: string, project_domains: string, project_technologies: string, project_description: string)
    {
      let api_url = encodeURI(this.endpoint_url + "/add_project_topic/" + user_id + "/" + project_title + "/"+ project_domains + "/" + project_technologies + "/" + project_description);
      return this.http.get<Api>(api_url)
        .pipe(
        catchError(this.handle_error) // then handle the error
      );
    }

    edit_student_profile(user_id: string): Observable<any> {
      let api_url = encodeURI(this.endpoint_url + "/edit_student_profile/" + user_id);
      return this.http.get(api_url, httpOptions).pipe(
        map(this.extract_data),
        catchError(this.handle_error)
      );
    }

    view_student_profile(user_id : string): Observable<any> {
      let api_url = encodeURI(this.endpoint_url + "/view_student_profile/" + user_id);
      return this.http.get(api_url, httpOptions).pipe(
        map(this.extract_data),
        catchError(this.handle_error)
      );
    }

    list_all_students(): Observable<any> {
      let api_url = encodeURI(this.endpoint_url + "/list_all_students");
      return this.http.get(api_url, httpOptions).pipe(
        map(this.extract_data),
        catchError(this.handle_error)
      );
    }

    project_details(user_id : string): Observable<any> {
      let api_url = encodeURI(this.endpoint_url + "/project_details/" + user_id);
      return this.http.get(api_url, httpOptions).pipe(
        map(this.extract_data),
        catchError(this.handle_error)
      );
    }

    login(username: string, password: string): Observable<any> {
      let api_url = encodeURI(this.endpoint_url + "/login/" + username + "/" + password);
      return this.http.get(api_url, httpOptions).pipe(
        map(this.extract_data),
        catchError(this.handle_error)
      );
    }

    fetch_mail(user_id: string): Observable<any> {
      let api_url = encodeURI(this.endpoint_url + "/fetch_mail/" + user_id);
      return this.http.get(api_url, httpOptions).pipe(
        map(this.extract_data),
        catchError(this.handle_error)
      );
    }
    // insert_mail(user_id: string,mail_to: string,subject: string,cc: string,bcc: string,content: string,attachment: string){

    // }
  private handle_error(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  private extract_data(res: Response) {
   let body = res;
   return body || {};
 }

  make_intentional_error() {
    return this.http.get('not/a/real/url')
      .pipe(
        catchError(this.handle_error)
      );
  }
}
