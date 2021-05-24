import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable,of} from 'rxjs';
import { map,catchError } from "rxjs/operators";
import { Promotion } from '../shared/promotion';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpMsgService } from '../services/process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(
    private http:HttpClient,
    private processHttpMsgService:ProcessHttpMsgService
  ) { }
  
  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL+'promotions')
    .pipe(catchError(this.processHttpMsgService.handleError));
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL+'promotions/'+id)
    .pipe(catchError(this.processHttpMsgService.handleError));

  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]>(baseURL+'promotions?featured=true').pipe(map(promotions=>promotions[0]))
    .pipe(catchError(this.processHttpMsgService.handleError));
  }
}
