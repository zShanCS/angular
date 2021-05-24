import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable,of} from 'rxjs';
import { map,catchError } from "rxjs/operators";
import { Leader } from "../shared/leader";
import { baseURL } from "../shared/baseurl";
import { ProcessHttpMsgService } from "../services/process-httpmsg.service";
@Injectable({
  providedIn: 'root'
}) 
export class LeaderService {
  constructor(
    private http:HttpClient,
    private processHttpMsgService:ProcessHttpMsgService
  ) { }

  getLeaders():Observable<Leader[]>{
    return this.http.get<Leader[]>(baseURL+'leadership')
    .pipe(catchError(this.processHttpMsgService.handleError));
  }

  getLeader(id:string):Observable<Leader>{
    return this.http.get<Leader>(baseURL+'leadership/'+id)
    .pipe(catchError(this.processHttpMsgService.handleError));
;
  } 
  getFeaturedLeader():Observable<Leader>{
    return this.http.get<Leader[]>(baseURL+'leadership?featured=true').pipe(map(leaders=>leaders[0]))
    .pipe(catchError(this.processHttpMsgService.handleError));
  }
}
