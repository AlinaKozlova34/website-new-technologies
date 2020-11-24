import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse  } from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable()
export class Interceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(catchError((err: HttpErrorResponse) => {
          let errorMessage = '';
        if (err instanceof HttpErrorResponse) {
          errorMessage = `Error ${err.status}: ${err.url} ${err.statusText}`;
          // Handle your 404 here
          console.log('An error occurred:', err)
          window.alert(errorMessage)

          return throwError(err);
        }
      }
      ))
  }

}
