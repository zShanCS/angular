import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable/*, BehaviorSubject*/ } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { Dish } from "../shared/dish";
import { baseURL } from "../shared/baseurl";
import { ProcessHttpMsgService } from "../services/process-httpmsg.service";
@Injectable({
  providedIn: 'root'
})
export class DishService {
  constructor(
    private http:HttpClient,
    private processHttpMsgService:ProcessHttpMsgService,
  ) 
  { }

  getDishes(): Observable<Dish[]>{
    return this.http.get<Dish[]>(baseURL+'dishes')
    .pipe(catchError(this.processHttpMsgService.handleError));
  } 
  
  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(baseURL+'dishes/'+id)
    .pipe(catchError(this.processHttpMsgService.handleError));
  } 
  putDish(dish:Dish):Observable<Dish>{
    const httpOptions = {
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.http.put<Dish>(baseURL+'dishes/'+dish.id , dish , httpOptions)
    .pipe(catchError(this.processHttpMsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
    .pipe(catchError(this.processHttpMsgService.handleError));
  }
  getDishIds():Observable<string[] | any>{
    return this.getDishes().pipe(map(dishes=>dishes.map(dish => dish.id)))
    .pipe(catchError(this.processHttpMsgService.handleError));
  }
}

