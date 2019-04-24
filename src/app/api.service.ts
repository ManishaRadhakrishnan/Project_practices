import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Api {
  status: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  endpoint_url = "http://127.0.0.1:8080";

  constructor(private http: HttpClient) { }

    do_register(full_name: string, email: string, username: string, password: string, role: string)
    {
      let api_url = encodeURI(this.endpoint_url + "/register?full_name=" + full_name + "&email=" + email + "&password=" + password + "&username=" + username + "&role=" + role);
      return this.http.get<Api>(api_url)
        .pipe(
        // retry(3), // retry a failed request up to 3 times
        catchError(this.handle_error) // then handle the error
      );
    }

    do_update(full_name, email, contact, address, course, department)
    {
      let api_url = encodeURI(this.endpoint_url + "");
      return this.http.get<Api>(api_url)
        .pipe(
        catchError(this.handle_error) // then handle the error
      );
    }

    insert_mail(email_to: string, email_cc: string, email_bcc: string, email_content: string)
    {
      let api_url = encodeURI(this.endpoint_url + "");
      return this.http.get<Api>(api_url)
        .pipe(
        catchError(this.handle_error) // then handle the error
      );
    }

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


  make_intentional_error() {
    return this.http.get('not/a/real/url')
      .pipe(
        catchError(this.handle_error)
      );
  }
}
