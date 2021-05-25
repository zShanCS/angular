import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { baseURL } from '../shared/baseurl';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProcessHttpMsgService } from './process-httpmsg.service';
import { Feedback } from '../shared/feedback';
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
    private http: HttpClient,
    private processHttpMsgService: ProcessHttpMsgService
  ) { }

  submitFeedback(data: Feedback): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'dataType': 'application/json'
      })
    };
    return this.http.post<Feedback>(baseURL + 'feedback', data, options)
      .pipe(catchError(this.processHttpMsgService.handleError));
  }
}
